import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import VideoEnhancer from "../VideoEnhancer";

/**
 * 视频控制相关逻辑处理
 * 如：倍速、快进、缩放、移动等
 */
export default {
  isLive() {
    if (!this.player) return false;
    return this.player.duration === Infinity || this.isDynamicDur(this.player);
  },
  isDynamicDur(video) {
    if (video._mfs_isDynamic || video.currentTime > video.__duration) return true;

    // 记录默认时长，用于判断是否为动态时长
    const { duration, __duration } = video;
    if (!__duration) video.__duration = duration;
    if (__duration > 120 && __duration < 432e2) return false; // 时长在2分钟~12小时之间，判定为固定时长（非动态）

    const isDynamic = Math.floor(duration) > Math.floor(__duration);
    if (isDynamic) video._mfs_isDynamic = true; // 为true，后续不再重新计算

    return isDynamic;
  },
  initVideoProps(video) {
    if (!Tools.isAttached(this.player)) this.player = null;
    Object.keys(video).forEach((k) => k.startsWith("_mfs_") && delete video[k]);

    // 设置默认一些值
    video.__duration = video.duration;
    video.tsr = { ...Consts.DEF_TSR };

    // 重置次数限制
    Tools.resetLimit("autoWide");
  },
  applySettings(video) {
    this.setupClockForPlayer();
    if (this.isExecuted("_mfs_apply", this.player)) return;

    // ====== 应用缓存数据 ======
    this.applyCachedRate();
    this.applyCachedTime(video);
  },
  remainTime: (v) => Math.floor(App.getRealDuration(v)) - Math.floor(v.currentTime),
  playToggle: (v) => (Site.isDouyu() ? v?.click() : v?.[v?.paused ? "play" : "pause"]()),
  playV: (v) => v?.paused && (Site.isDouyu() ? v?.click() : v?.play()),

  // ====================⇓⇓⇓ 调节播放倍速相关逻辑 ⇓⇓⇓====================
  setPlaybackRate(rate) {
    if (!rate || !this.player || this.isLive() || this.isDisRate() || +this.player.playbackRate === +rate) return;

    // 设置倍速
    VideoEnhancer.setPlaybackRate(this.player, rate);
    this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
    if (!Storage.NOT_CACHE_SPEED.get()) Storage.CACHED_SPEED.set(this.player.playbackRate);
  },
  adjustPlayRate(step = 0.25) {
    const rate = Math.max(0.1, +this.player.playbackRate + step);
    this.setPlaybackRate(Math.min(16, rate));
  },
  applyCachedRate: () => (Storage.NOT_CACHE_SPEED.get() ? App.delCachedRate() : App.setPlaybackRate(Storage.CACHED_SPEED.get())),
  delCachedRate: () => Storage.CACHED_SPEED.del(),
  // ====================⇑⇑⇑ 调节播放倍速相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 调节播放进度相关逻辑 ⇓⇓⇓====================
  skipPlayback(second = 0) {
    if (!this.player || this.isLive() || !this.isOverrideKey()) return;
    this.setCurrentTime(Math.min(+this.player.currentTime + second, this.player.duration));
    this.showToast(`快${second > 0 ? "进" : "退"} ${Math.abs(second)} 秒`, Consts.ONE_SEC);
  },
  cachePlayTime(video) {
    if (video !== this.player || !this.topWin || video.duration < 120 || this.isLive()) return;
    if (Tools.isThrottle("cacheTime", Consts.ONE_SEC) || +video.currentTime < Storage.SKIP_INTERVAL.get()) return;

    // 距离结束10秒，清除记忆缓存
    if (this.remainTime(video) <= 10) return this.clearCachedTime(video);

    Storage.PLAY_TIME.set(+video.currentTime - 1, this.getUniqueKey(video), Storage.STORAGE_DAYS.get());
    if (Tools.isMultiV()) this.ensureUniqueCacheTime(); // 清除页面内多视频的播放进度存储，如：抖音网页版
  },
  applyCachedTime(video) {
    if (!this.topWin || this.isLive() || Tools.querys("video").length > 2) return;

    // 缓存的播放时间
    const time = Storage.PLAY_TIME.get(this.getUniqueKey(video));
    if (time <= +video.currentTime) return;

    this.setCurrentTime(time);
    this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", Consts.ONE_SEC * 3.5, false).then((el) => {
      if (Tools.query(".monkey-toast")) Tools.setStyle(el, "transform", `translateY(${-5 - el.offsetHeight}px)`);
    });
  },
  setCurrentTime: (ct) => ct && (App.player.currentTime = Math.max(0, ct)),
  clearCachedTime: (v) => App.topWin && Storage.PLAY_TIME.del(App.getUniqueKey(v)),
  getUniqueKey(video, { duration, __duration } = video) {
    if (video._mfs_cacheTKey) return video._mfs_cacheTKey;

    const currNumber = this.getCurrentEpisodeNumber();
    const baseKey = `${this.topWin.urlHash}_${Math.floor(__duration || duration)}`;
    const cacheKey = currNumber ? `${baseKey}_${currNumber}` : baseKey;
    video._mfs_cacheTKey = cacheKey;

    return cacheKey;
  },
  ensureUniqueCacheTime() {
    const pattern = `${Storage.PLAY_TIME.name}${this.topWin.urlHash}`;
    const keys = Object.keys(Storage.PLAY_TIME.fuzzyGet(pattern));
    if (keys.length > 1) Storage.PLAY_TIME.fuzzyDel(pattern);
  },
  formatTime(sec) {
    if (isNaN(sec)) return "00:00";

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
    const step = Storage.ZOOM_PERCENT.get();
    const zoom = Math.max(25, Math.min(500, tsr.zoom + dir * step));

    tsr.zoom = zoom;
    this.setTsr("--zoom", zoom / 100);
    this.showToast(`缩放: ${zoom}%`, Consts.ONE_SEC);
  },
  moveVideo(key) {
    if (!this.player) return;

    const { tsr } = this.player;
    const s = Storage.MOVING_DISTANCE.get();
    const dMap = { ALT_UP: [0, -s, "上"], ALT_DOWN: [0, s, "下"], ALT_LEFT: [-s, 0, "左"], ALT_RIGHT: [s, 0, "右"] };
    let [x, y, desc] = dMap[key];
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
    delete this.player._mfs_tsr;
  },
  setTsr(name, value) {
    try {
      Tools.addCls(this.player, "__tsr");
      this.player._mfs_tsr ??= getComputedStyle(this.player).transform;
      Tools.setStyle(this.player, "--deftsr", this.player._mfs_tsr);
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
  autoNextEnabled() {
    const status = Storage.IS_AUTO_NEXT.set(!Storage.IS_AUTO_NEXT.get());
    this.showToast(`已${status ? "启" : "禁"}用 自动切换下集`);
  },
  customToast(start, text, end, dealy, isRemove) {
    // 最终呈现：<span>正在以<span class="cText">1.15x</span>倍速播放</span>
    const span = document.createElement("span");
    const child = Tools.newEle("span", { textContent: text, className: "cText" });
    span.append(document.createTextNode(start), child, document.createTextNode(end));
    return this.showToast(span, dealy, isRemove);
  },
  showToast(content, dealy = Consts.THREE_SEC, isRemove = true) {
    return new Promise((resolve) => {
      if (isRemove) Tools.query(".monkey-toast")?.remove();
      const el = Tools.newEle("div", { className: "monkey-toast" });
      content instanceof Element ? el.appendChild(content) : (el.textContent = content);

      (this.findVideoContainer(null, 2, false).appendChild(el), resolve(el));
      setTimeout(() => ((el.style.opacity = 0), setTimeout(() => el.remove(), Consts.HALF_SEC)), dealy);
    });
  },
};
