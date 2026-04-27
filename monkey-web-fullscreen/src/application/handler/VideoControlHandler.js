import Tools from "../common/Tools";
import Store from "../common/Store";
import Consts from "../common/Consts";
import VideoEnhancer from "../VideoEnhancer";

/**
 * 视频控制相关逻辑处理
 * 如：倍速、快进、缩放、移动等
 */
export default {
  playToggle: (v) => v?.[v.paused ? "play" : "pause"](),
  remainTime: (v) => Math.floor(App.getRealDuration(v)) - Math.floor(v.currentTime),
  isLive() {
    if (!this.player) return false;
    return this.player.duration === Infinity || this.isDynamicDur(this.player);
  },
  isMultiVideo() {
    if (this._multiV || Tools.isThrottle("isMulti", Consts.TWO_SEC * 5)) return this._multiV;
    const validVideo = (v) => !this.isMutedLoop(v) && v.offsetWidth > 300 && !isNaN(v.duration);
    return (this._multiV = Tools.querys("video").filter(validVideo).length > 1);
  },
  isDynamicDur(video) {
    if (video.vx_isDynamic || video.currentTime > video.__duration) return true;

    // 记录默认时长，用于判断是否为动态时长
    const { duration, __duration } = video;
    if (!__duration) video.__duration = duration;
    if (__duration > 120 && __duration < 432e2) return false; // 时长在2分钟~12小时之间，判定为固定时长（非动态）

    const isDynamic = Math.floor(duration) > Math.floor(__duration);
    if (isDynamic) video.vx_isDynamic = true; // 为true，后续不再重新计算

    return isDynamic;
  },
  initVideoProps(video) {
    if (!Tools.isAttached(this.player)) this.player = null;
    Object.keys(video).forEach((k) => k.startsWith("vx_") && delete video[k]);

    // 设置默认一些值
    video.__duration = video.duration;
    video.tsr = { ...Consts.DEF_TSR };

    // 重置次数限制
    Tools.resetLimit("autoWFs");
  },
  applySettings(video) {
    this.setupClockForPlayer();
    if (Tools.isExecuted("vx_apply", this.player)) return;

    // ====== 应用缓存数据 ======
    this.applyCachedRate();
    this.applyCachedTime(video);
  },
  // ====================⇓⇓⇓ 调节播放倍速相关逻辑 ⇓⇓⇓====================
  setPlaybackRate(rate) {
    if (!rate || !this.player || this.isLive() || this.unUsedRate() || +this.player.playbackRate === +rate) return;

    // 设置倍速
    VideoEnhancer.setPlaybackRate(this.player, rate);
    this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
    if (!Store.FORGET_RATE.get()) Store.CACHED_RATE.set(this.player.playbackRate);
  },
  adjustPlayRate: (step = 0.25) => App.player && App.setPlaybackRate(Tools.clamp(+App.player.playbackRate + step, 0.1, 16)),
  applyCachedRate: () => (Store.FORGET_RATE.get() ? App.delCachedRate() : App.setPlaybackRate(Store.CACHED_RATE.get())),
  delCachedRate: () => Store.CACHED_RATE.del(),
  // ====================⇑⇑⇑ 调节播放倍速相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 调节播放进度相关逻辑 ⇓⇓⇓====================
  skipPlayback(second = 0, bypass = false) {
    if (!this.player || this.isLive() || (!bypass && !this.isOverrideKey())) return;
    this.setCurrentTime(Tools.clamp(+this.player.currentTime + second, 0, this.player.duration));
    this.showToast(`快${second > 0 ? "进" : "退"} ${Math.abs(second)} 秒`, Consts.ONE_SEC);
  },
  cachePlayTime(video) {
    if (video !== this.player || !this.topWin || video.duration < 150 || this.isLive() || this.isMultiVideo()) return;
    if (Tools.isThrottle("cacheTime", Consts.ONE_SEC) || +video.currentTime < Store.SKIP_INTERVAL.get()) return;
    Store.V_TIME.set(+video.currentTime - 1, this.getUniqueKey(video), Store.STORAGE_DAYS.get());
  },
  applyCachedTime(video) {
    const time = Store.V_TIME.get(this.getUniqueKey(video)); // 缓存的播放时间
    if (!this.topWin || this.isLive() || this.isMultiVideo() || time <= +video.currentTime) return;
    this.customToast("上次观看至", this.secToTime(this.setCurrentTime(time)), "处，已为您续播", Consts.TWO_SEC * 2, false);
  },
  setCurrentTime: (ct) => ct && (App.player.currentTime = Math.max(0, ct)),
  clearCachedTime: (v) => App.topWin && Store.V_TIME.del(App.getUniqueKey(v)),
  getUniqueKey(video, { duration, __duration } = video) {
    if (video.vx_tkey) return video.vx_tkey;

    const currNumber = this.getCurrentEpisodeNumber();
    const baseKey = `${this.topWin.urlHash}_${Math.floor(__duration || duration)}`;

    return (video.vx_tkey = currNumber ? `${baseKey}_${currNumber}` : baseKey);
  },
  secToTime(sec) {
    const [h, m, s] = [~~(sec / 3600), ~~((sec % 3600) / 60), ~~(sec % 60)];
    return (h ? [h, m, s] : [m, s]).map((v) => String(v).padStart(2, "0")).join(":");
  },
  // ====================⇑⇑⇑ 调节播放进度相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 视频画面变换相关逻辑 ⇓⇓⇓====================
  horizFlip() {
    if (!this.player) return;

    const { tsr } = this.player;
    this.setTsr("--mirror", (tsr.mirror = -tsr.mirror));
  },
  rotateVideo() {
    if (!this.player) return;

    const { tsr } = this.player;
    tsr.rotate = (tsr.rotate + 90) % 360;
    const { videoWidth: w, videoHeight: h } = this.player;
    const scale = [90, 270].includes(tsr.rotate) ? h / w : 1;
    this.setTsr("--scale", scale).setTsr("--rotate", `${tsr.rotate}deg`);
  },
  zoomVideo(dir = 1) {
    if (!this.player) return;

    const { tsr } = this.player;
    const step = Store.ZOOM_PERCENT.get();
    const zoom = Tools.clamp(tsr.zoom + dir * step, 30, 300);

    tsr.zoom = zoom;
    this.setTsr("--zoom", zoom / 100);
    this.showToast(`缩放: ${zoom}%`, Consts.ONE_SEC);
  },
  moveVideo(dir) {
    if (!this.player) return;

    const { tsr } = this.player;
    const s = Store.MOVE_DIST.get();
    const dMap = { UP: [0, -s, "上"], DOWN: [0, s, "下"], LEFT: [-s, 0, "左"], RIGHT: [s, 0, "右"] };
    let [x, y, desc] = dMap[dir];
    x *= tsr.mirror; // 镜像后的移动方向

    // 旋转后的移动方向
    [x, y] = { 90: [y, -x], 180: [-x, -y], 270: [-y, x] }[tsr.rotate] || [x, y];

    // 赋值
    ((tsr.mvX += x), (tsr.mvY += y));
    this.setTsr("--mvX", `${tsr.mvX}px`).setTsr("--mvY", `${tsr.mvY}px`);
    this.showToast(`${desc}移: ${x ? tsr.mvX : tsr.mvY}px`, Consts.ONE_SEC);
  },
  resetTsr() {
    if (!this.player) return;

    const styles = ["--zoom", "--mvX", "--mvY", "--scale", "--mirror", "--rotate", "--deftsr"];
    styles.forEach((n) => Tools.setStyle(this.player, n));
    this.player.tsr = { ...Consts.DEF_TSR };
    Tools.delCls(this.player, "__tsr");
    delete this.player.vx_tsr;
  },
  setTsr(name, value) {
    try {
      Tools.addCls(this.player, "__tsr");
      this.player.vx_tsr ??= getComputedStyle(this.player).transform;
      Tools.setStyle(this.player, "--deftsr", this.player.vx_tsr);
      Tools.setStyle(this.player, name, value);
    } catch (e) {
      console.error(e);
    }
    return this;
  },
  // ====================⇑⇑⇑ 视频画面变换相关逻辑 ⇑⇑⇑====================

  muteVideo() {
    if (!this.player) return;

    // 判断当前是否为静音状态（同时检查 muted 和 volume）
    const isMuted = this.player.muted || !this.player.volume;
    Object.assign(this.player, { muted: !isMuted, volume: +isMuted });
    this.showToast(isMuted ? "🔊 取消静音" : "🔇 已静音", Consts.ONE_SEC);
  },
  async screenshot() {
    if (!this.player) return;

    this.player.setAttribute("crossorigin", "anonymous");
    const { videoWidth: width, videoHeight: height } = this.player;
    const canvas = Tools.newEle("canvas", { width, height });
    const ctx = canvas.getContext("2d");

    try {
      ctx.drawImage(this.player, 0, 0, width, height);
      const url = URL.createObjectURL(await new Promise((resolve) => canvas.toBlob(resolve, "image/png")));
      GM_download({ url, name: `视频截图_${Date.now()}.png`, onload: () => URL.revokeObjectURL(url) });
    } catch (e) {
      Tools.setStyle(canvas, "max-width", "97vw");
      const popup = window.open(Consts.EMPTY, "_blank", "width=1000,height=570,top=130,left=270");
      popup.document.title = "鼠标右键选择「图片另存为」";
      popup.document.body.appendChild(canvas);
      console.error(e);
    }
  },
  freezeFrame(dir = 1) {
    if (!this.player) return;
    !this.player.paused && this.player.pause();
    this.player.currentTime += dir / 24;
  },
  autoNextEnabled: () => App.showToast(`已${Store.NEXT_AUTO.toggle() ? "启" : "禁"}用 自动切换下集`),
  /**
   * 效果：<span>正在以<span class="cText">1.15x</span>倍速播放</span>
   */
  customToast(start, text, end, dealy, isRemove) {
    const span = Tools.newEle("span");
    span.append(start, Tools.newEle("span", { textContent: text, className: "cText" }), end);
    this.showToast(span, dealy, isRemove);
  },
  showToast(content, dealy = Consts.THREE_SEC, isRemove = true) {
    if (isRemove) Tools.query(".monkey-toast")?.remove();
    const el = Tools.newEle("div", { className: "monkey-toast" });
    content instanceof Element ? el.appendChild(content) : (el.textContent = content);

    setTimeout(() => (Tools.addCls(el, "out"), setTimeout(() => el.remove(), 250)), dealy);
    this.findVideoContainer(null, 2, false).appendChild(el);
  },
};
