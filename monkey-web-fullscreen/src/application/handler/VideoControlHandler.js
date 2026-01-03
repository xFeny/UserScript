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
    if (!this.videoInfo || !this.player) return false;
    return this.videoInfo.isLive || this.player?.duration === Infinity || this.isDynamicDur(this.player);
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
    if (!Tools.isAttached(this.player)) delete this.player;
    Object.keys(video).forEach((k) => k.startsWith("_mfs_") && delete video[k]);

    // 设置默认一些值
    video.__duration = video.duration;
    video.tsr = { ...Consts.DEF_TSR };

    // 重置次数限制
    Tools.resetLimit("rateKeep", "autoWide");

    // 移除相关的自定义元素
    this.removeRateKeepDisplay(video);
    this.removeProgressElement();
  },
  initVideoPlay(video) {
    if (video._mfs_hasInited) return;
    video._mfs_hasInited = true;

    // ====== 应用缓存数据 ======
    this.applyCachedPlayRate();
    this.applyCachedTime(video);

    this.playbackRateKeepDisplay();
    this.setupPlayerClock();
    this.setBiliQuality();
  },
  delCachedPlayRate: () => Storage.CACHED_SPEED.del(),
  remainTime: (video) => Math.floor(video.duration) - Math.floor(video.currentTime),
  playToggle: (video) => (Site.isDouyu() ? video?.click() : video?.[video?.paused ? "play" : "pause"]()),
  tryPlay: (video) => video?.paused && (Site.isDouyu() ? video?.click() : video?.play()),
  setPlaybackRate(playRate, show = true) {
    if (!playRate || !this.player || this.isLive() || this.isDisRate() || +this.player.playbackRate === +playRate) return;

    // 设置倍速
    VideoEnhancer.setPlaybackRate(this.player, playRate);
    if (show) this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
    this.playbackRateKeepDisplay(); // 倍速始终显示

    if (!Storage.NOT_CACHE_SPEED.get()) Storage.CACHED_SPEED.set(this.player.playbackRate);
    return Promise.resolve();
  },
  adjustPlaybackRate(step = Storage.SPEED_STEP.get()) {
    const playRate = Math.max(Consts.MIN_SPEED, +this.player.playbackRate + step);
    this.setPlaybackRate(Math.min(Consts.MAX_SPEED, playRate));
  },
  applyCachedPlayRate() {
    Storage.NOT_CACHE_SPEED.get() ? this.delCachedPlayRate() : this.setPlaybackRate(Storage.CACHED_SPEED.get());
  },
  skipPlayback(second = Storage.SKIP_INTERVAL.get()) {
    if (!this.player || this.isLive() || this.player.ended) return;
    this.setCurrentTime(Math.min(+this.player.currentTime + second, this.player.duration));
  },
  cachePlayTime(video) {
    if (video !== this.player || !this.topWin || video.duration < 120 || this.isLive()) return;
    if (Tools.isThrottle("cacheTime", Consts.ONE_SEC) || +video.currentTime < Storage.SKIP_INTERVAL.get()) return;

    // 禁用记忆、距离结束10秒，清除记忆缓存
    if (Storage.NOT_CACHE_TIME.get() || this.remainTime(video) <= 10) return this.clearCachedTime(video);

    Storage.PLAY_TIME.set(+video.currentTime - 1, this.getCacheTimeKey(video), Storage.STORAGE_DAYS.get());
    this.clearMultiVideoCacheTime(); // 清除页面内多视频的播放进度存储，如：抖音网页版
  },
  applyCachedTime(video) {
    if (Storage.NOT_CACHE_TIME.get()) return this.clearCachedTime(video);
    if (video._mfs_hasApplyCTime || !this.topWin || this.isLive()) return;

    // 从存储中获取该视频的缓存播放时间
    const time = Storage.PLAY_TIME.get(this.getCacheTimeKey(video));
    if (time <= +video.currentTime) return (video._mfs_hasApplyCTime = true);

    this.setCurrentTime(time);
    video._mfs_hasApplyCTime = true;
    this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", Consts.ONE_SEC * 3.5, false).then((el) => {
      if (video.playbackRate === Consts.DEF_SPEED) return;
      Tools.setStyle(el, "transform", `translateY(${-5 - el.offsetHeight}px)`);
    });
  },
  clearCachedTime(video) {
    if (this.topWin) Storage.PLAY_TIME.del(this.getCacheTimeKey(video));
  },
  getCacheTimeKey(video, { duration, __duration } = video) {
    if (video._mfs_cacheTKey) return video._mfs_cacheTKey;

    const currNumber = this.getCurrentEpisodeNumber();
    const baseKey = `${this.topWin.urlHash}_${Math.floor(__duration || duration)}`;
    const cacheTimeKey = currNumber ? `${baseKey}_${currNumber}` : baseKey;
    video._mfs_cacheTKey = cacheTimeKey;

    return cacheTimeKey;
  },
  async clearMultiVideoCacheTime() {
    if (!Tools.isMultiVideo()) return;
    const pattern = `${Storage.PLAY_TIME.name}${this.topWin.urlHash}`;
    const keys = Object.keys(Storage.PLAY_TIME.fuzzyGet(pattern));
    if (keys.length > 1) Storage.PLAY_TIME.fuzzyDel(pattern);
  },
  setCurrentTime(currentTime) {
    if (currentTime) this.player.currentTime = Math.max(0, currentTime);
  },
  toggleMute() {
    if (!this.player) return;

    // 判断当前是否为静音状态（同时检查 muted 和 volume）
    const isMuted = this.player.muted || !this.player.volume;
    this.player.muted = !isMuted;
    this.player.volume = +isMuted;
    this.showToast(isMuted ? "🔊 取消静音" : "🔇 已静音", Consts.ONE_SEC);
  },
  toggleMirrorFlip() {
    if (!this.player) return;

    const tsr = this.player.tsr;
    tsr.isMirrored = !tsr.isMirrored;
    this.setTsr("--mirror", tsr.isMirrored ? -1 : 1);
  },
  rotateVideo() {
    if (!this.player) return;

    const tsr = this.player.tsr;
    tsr.rotation = (tsr.rotation + 90) % 360;
    const { videoWidth, videoHeight } = this.player;
    const isVertical = [90, 270].includes(tsr.rotation);
    const scale = isVertical ? videoHeight / videoWidth : 1;
    this.setTsr("--scale", scale).setTsr("--rotate", `${tsr.rotation}deg`);
  },
  zoomVideo(isDown) {
    if (!this.player || this.isDisZoom()) return;

    const tsr = this.player.tsr;
    const step = Storage.ZOOM_PERCENT.get();
    const zoom = tsr.zoom + (isDown ? -step : step);
    if (zoom < Consts.MIN_ZOOM || zoom > Consts.MAX_ZOOM) return;

    tsr.zoom = zoom;
    this.setTsr("--zoom", zoom / 100);
    this.showToast(`缩放：${zoom}%`, Consts.ONE_SEC);
  },
  moveVideoPosition(direction) {
    if (!this.player || this.isDisZoom()) return;

    const tsr = this.player.tsr;
    const step = Storage.MOVING_DISTANCE.get();
    const dirs = {
      ALT_UP: { x: 0, y: -step, desc: "向上移动" },
      ALT_DOWN: { x: 0, y: step, desc: "向下移动" },
      ALT_LEFT: { y: 0, x: -step, desc: "向左移动" },
      ALT_RIGHT: { y: 0, x: step, desc: "向右移动" },
    };
    let { x, y, x: _x, desc } = dirs[direction];

    // 修正翻转后的移动方向
    if (tsr.isMirrored) (x = -x), (_x = x);
    // 修正旋转后的移动方向
    ({ 90: () => ((x = y), (y = -_x)), 180: () => ((x = -x), (y = -y)), 270: () => ((x = -y), (y = _x)) })[tsr.rotation]?.();

    // 赋值
    (tsr.moveX += x), (tsr.moveY += y);
    this.setTsr("--moveX", `${tsr.moveX}px`).setTsr("--moveY", `${tsr.moveY}px`);
    this.showToast(`${desc}：${x ? tsr.moveX : tsr.moveY}px`, Consts.ONE_SEC);
  },
  resetVideoTransform() {
    if (!this.player || this.isDisZoom()) return;

    this.setTsr("--zoom").setTsr("--moveX").setTsr("--moveY").setTsr("--scale").setTsr("--mirror").setTsr("--rotate");
    this.player.tsr = { ...Consts.DEF_TSR };
  },
  async captureScreenshot() {
    if (!this.player || Storage.DISABLE_SCREENSHOT.get()) return;

    const { videoWidth, videoHeight } = this.player;
    this.player.setAttribute("crossorigin", "anonymous");
    const canvas = Tools.createElement("canvas", { width: videoWidth, height: videoHeight });
    const ctx = canvas.getContext("2d");

    try {
      ctx.drawImage(this.player, 0, 0, canvas.width, canvas.height);
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
  freezeVideoFrame(isPrev) {
    if (!this.player) return;
    !this.player.paused && this.player.pause();
    this.player.currentTime += (isPrev ? -1 : 1) / 24;
  },
  customToast(startText, colorText, endText, duration, isRemove) {
    // 最终呈现：<span>正在以<span class="cText">1.15x</span>倍速播放</span>
    const span = document.createElement("span");
    const child = Tools.createElement("span", { textContent: colorText, className: "cText" });
    span.append(document.createTextNode(startText), child, document.createTextNode(endText));
    return this.showToast(span, duration, isRemove);
  },
  showToast(content, duration = Consts.THREE_SEC, isRemove = true) {
    return new Promise((resolve) => {
      if (isRemove) Tools.query(".monkey-toast")?.remove();
      const el = Tools.createElement("div", { className: "monkey-toast" });
      content instanceof Element ? el.appendChild(content) : (el.innerHTML = content);

      (this.findControlBarContainer() ?? this.findVideoParentContainer(null, 2, false)).prepend(el), resolve(el);
      setTimeout(() => ((el.style.opacity = 0), setTimeout(() => el.remove(), Consts.HALF_SEC)), duration);
    });
  },
  formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [...(h ? [h] : []), m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
  },
  setTsr(name, value) {
    Tools.addCls(this.player, "__tsr");

    try {
      // 默认 transform 样式
      this.player.__trans = this.player.__trans ?? getComputedStyle(this.player)?.getPropertyValue("transform");
      Tools.setStyle(this.player, "--deftsr", this.player.__trans);
    } catch (e) {
      console.error(e);
    }

    // transform 变换值
    Tools.setStyle(this.player, name, value);
    return this;
  },
  toggleAutoNextEnabled() {
    const status = !Storage.IS_AUTO_NEXT.get();
    Storage.IS_AUTO_NEXT.set(status);
    this.showToast(`已${status ? "启" : "禁"}用自动切换下集`);
  },
};
