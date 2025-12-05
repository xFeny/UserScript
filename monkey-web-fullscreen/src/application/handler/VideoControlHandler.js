import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频控制相关逻辑处理
 * 如：倍速、快进、缩放、移动等
 */
export default {
  isEnded() {
    if (!this.player) return false;
    if (this.player.ended) return true;
    const { duration, currentTime } = this.player;
    if (isNaN(duration) || duration <= 0) return false;
    return duration - currentTime <= 0.1;
  },
  isLive() {
    if (!this.videoInfo && !this.player) return false;
    return this.videoInfo.isLive || this.player?.duration === Infinity || this.isDynamicDuration(this.player);
  },
  isDynamicDuration(video) {
    if (!video) return false;
    if (video.currentTime > video.__duration || video.__isDynamic) return true;
    if (video.currentTime > 5 || Tools.isOverLimit("isDynamic", 10)) return false;

    // 记录默认时长，用于判断是否为动态时长
    if (!video.__duration) video.__duration = video.duration;
    const { duration, __duration, currentTime, seekable } = video;
    const isDynamic = Math.floor(duration) > Math.floor(__duration);

    // 距离直播点﹤8秒（会误判短视频）
    const isNearLive = duration < 10 && seekable.length && seekable.end(0) - currentTime < 8;
    const result = isDynamic || isNearLive;
    if (result) video.__isDynamic = true; // 为true，后续不再重新计算
    return result;
  },
  initVideoProps(video) {
    delete video.hasWebFull;
    delete video.__isDynamic;
    delete video.cacheTimeKey;
    delete video.hasTriedAutoNext;
    delete video.hasApplyCachedRate;
    delete video.hasInitPlaySettings;
    delete this.hasAppliedCachedTime;

    video.__duration = video.duration;
    video.tsr = { ...Consts.DEFAULT_TSR };
    if (!Storage.DISABLE_DEF_MAX_VOLUME.get()) video.volume = 1;

    Tools.resetLimitCounter("autoWebFull");
    this.removeRateKeepDisplay(video);
    this.removeProgressElement();
  },
  initPlaySettings(video) {
    if (!this.player) return;
    video.hasInitPlaySettings = true;
    this.applyCachedPlayRate(video);
    this.playbackRateKeepDisplay();
    this.applyCachedTime(video);
    this.setupPlayerClock();
    this.setBiliQuality();
  },
  deleteCachedPlayRate: () => Storage.CACHED_PLAY_RATE.del(),
  getRemainingTime: (video) => Math.floor(video.duration) - Math.floor(video.currentTime),
  togglePlayPause: (video) => (Site.isDouyu() ? Tools.triggerClick(video) : video?.paused ? video?.play() : video?.pause()),
  tryAutoPlay: (video) => video?.paused && (Site.isDouyu() ? Tools.triggerClick(video) : video?.play()),
  setPlaybackRate(playRate, show = true) {
    if (!this.player || isNaN(this.player.duration) || this.isDisablePlaybackRate()) return;
    if (this.isLive() || this.isEnded() || this.isBackgroundVideo(this.player)) return;
    if (!playRate || Number(this.player.playbackRate) === playRate) return;

    // 设置倍速
    window.videoEnhance.setPlaybackRate(this.player, playRate);
    if (show) this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
    this.playbackRateKeepDisplay(); // 倍速始终显示

    if (!Storage.DISABLE_MEMORY_SPEED.get()) Storage.CACHED_PLAY_RATE.set(this.player.playbackRate);
    return Promise.resolve();
  },
  adjustPlaybackRate(step = Storage.PLAY_RATE_STEP.get()) {
    if (!this.player) return;

    const playRate = Math.max(Consts.MIN_PLAY_RATE, Number(this.player.playbackRate) + step);
    this.setPlaybackRate(Math.min(Consts.MAX_PLAY_RATE, playRate));
  },
  applyCachedPlayRate(video) {
    if (video.hasApplyCachedRate) return;
    if (Storage.DISABLE_MEMORY_SPEED.get()) return this.deleteCachedPlayRate();

    const playRate = Storage.CACHED_PLAY_RATE.get();
    if (Consts.DEF_PLAY_RATE === playRate || Number(video.playbackRate) === playRate) return;
    this.setPlaybackRate(playRate, !video.hasApplyCachedRate)?.then(() => (video.hasApplyCachedRate = true));
  },
  skipPlayback(second = Storage.SKIP_INTERVAL.get()) {
    if (!this.player || this.isLive() || this.isEnded()) return;
    this.setCurrentTime(Math.min(Number(this.player.currentTime) + second, this.player.duration));
  },
  cachePlayTime(video) {
    if (Tools.isFrequent("cacheTime", Consts.ONE_SEC, true)) return; // 节流
    if (!this.topWin || this.isLive() || video.paused || video.duration < 120 || video.urlHash) return;
    if (Number(video.currentTime) < Storage.SKIP_INTERVAL.get()) return; //播放时间太短

    // 禁用记忆、播放结束、距离结束10秒，清除记忆缓存
    if (Storage.DISABLE_MEMORY_TIME.get() || this.isEnded()) return this.clearCachedTime(video);
    if (this.getRemainingTime(video) <= 10) return this.clearCachedTime(video);

    Storage.PLAY_TIME.set(this.getCacheTimeKey(video), Number(video.currentTime) - 1, Storage.STORAGE_DAYS.get());
    this.clearMultiVideoCacheTime(); // 清除页面内多视频的播放进度存储，如：抖音网页版
  },
  applyCachedTime(video) {
    if (Storage.DISABLE_MEMORY_TIME.get()) return this.clearCachedTime(video);
    if (this.hasAppliedCachedTime || !this.topWin || this.isLive()) return;

    // 从存储中获取该视频的缓存播放时间
    const time = Storage.PLAY_TIME.get(this.getCacheTimeKey(video));
    if (time <= Number(video.currentTime)) return (this.hasAppliedCachedTime = true);

    this.setCurrentTime(time);
    this.hasAppliedCachedTime = true;
    this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", Consts.ONE_SEC * 3.5, false).then((el) => {
      Tools.setStyle(el, "transform", `translateY(${-5 - el.offsetHeight}px)`);
    });
  },
  clearCachedTime(video) {
    Storage.PLAY_TIME.del(this.getCacheTimeKey(video));
  },
  getCacheTimeKey(video, { src, duration, __duration } = video) {
    if (video.cacheTimeKey) return video.cacheTimeKey;

    const srcHash = src && !src.startsWith("blob:") ? Tools.hashCode(new URL(src).pathname) : Consts.EMPTY;
    const baseKey = `${this.topWin.urlHash}_${Math.floor(__duration || duration)}`;
    const cacheTimeKey = srcHash ? `${srcHash}_${baseKey}` : baseKey;
    video.cacheTimeKey = cacheTimeKey;

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
    this.player.volume = Number(isMuted);
    this.showToast(isMuted ? "🔊 取消静音" : "🔇 已静音", Consts.ONE_SEC);
  },
  togglePictureInPicture() {
    if (this.player) document.pictureInPictureElement ? document.exitPictureInPicture() : this.player?.requestPictureInPicture();
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
    if (!this.player || this.isDisableZoom()) return;

    const tsr = this.player.tsr;
    const step = Storage.ZOOM_PERCENT.get();
    const zoom = tsr.zoom + (isDown ? -step : step);
    if (zoom < Consts.MIN_ZOOM || zoom > Consts.MAX_ZOOM) return;

    tsr.zoom = zoom;
    this.setTsr("--zoom", zoom / 100);
    this.showToast(`缩放：${zoom}%`, Consts.ONE_SEC);
  },
  moveVideoPosition(direction) {
    if (!this.player || this.isDisableZoom()) return;

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
    if (!this.player || this.isDisableZoom()) return;

    this.setTsr("--zoom").setTsr("--moveX").setTsr("--moveY").setTsr("--scale").setTsr("--mirror").setTsr("--rotate");
    this.player.tsr = { ...Consts.DEFAULT_TSR };
  },
  async captureScreenshot() {
    if (!this.player || this.isDisableScreenshot()) return;

    this.player.setAttribute("crossorigin", "anonymous");
    const canvas = document.createElement("canvas");
    canvas.height = this.player.videoHeight;
    canvas.width = this.player.videoWidth;
    const ctx = canvas.getContext("2d");

    try {
      ctx.drawImage(this.player, 0, 0, canvas.width, canvas.height);
      const url = URL.createObjectURL(await new Promise((resolve) => canvas.toBlob(resolve, "image/png")));
      GM_download({ url, name: `视频截图_${Date.now()}.png`, onload: () => URL.revokeObjectURL(url) });
    } catch (e) {
      Tools.setStyle(canvas, "max-width", "98vw");
      const popup = window.open(Consts.EMPTY, "_blank", "width=1000,height=570,top=130,left=270");
      popup.document.title = "鼠标右键选择「图片另存为」";
      popup.document.body.appendChild(canvas);
      console.debug(e);
    }
  },
  freezeVideoFrame(isPrev) {
    if (!this.player) return;
    !this.player.paused && this.player.pause();
    this.player.currentTime += (isPrev ? -1 : 1) / 24;
  },
  toggleNativeControls() {
    if (!this.player) return;
    this.player.controls = !this.player.controls;
  },
  customToast(startText, colorText, endText, duration, isRemove) {
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(startText));
    const child = span.cloneNode(true);
    child.textContent = colorText;
    child.setAttribute("style", "margin:0 3px!important;color:#FF5F00!important;");
    span.appendChild(child);
    span.appendChild(document.createTextNode(endText));
    return this.showToast(span, duration, isRemove);
  },
  showToast(content, duration = Consts.THREE_SEC, isRemove = true) {
    return new Promise((resolve) => {
      const el = document.createElement("div");
      el.setAttribute("class", "monkey-toast");
      if (isRemove) Tools.query(".monkey-toast")?.remove();
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
      console.debug(e);
    }

    // transform 变换值
    Tools.setStyle(this.player, name, value);
    return this;
  },
  toggleAutoNextEnabled() {
    const status = !Storage.ENABLE_AUTO_NEXT_EPISODE.get();
    Storage.ENABLE_AUTO_NEXT_EPISODE.set(status);
    this.showToast(`已${status ? "启" : "禁"}用自动切换下集`);
  },
};
