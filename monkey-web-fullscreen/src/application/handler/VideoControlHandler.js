import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频控制相关逻辑处理
 */
export default {
  isEnded() {
    if (!this.player) return false;
    return Math.floor(this.player.currentTime) === Math.floor(this.player.duration);
  },
  isDynamicDuration(video) {
    if (!video?.__duration) return (video.__duration = video.duration) || false;
    return Math.floor(video.duration) > Math.floor(video.__duration);
  },
  initVideoProps(video) {
    video.volume = 1;
    video.hasToast = false;
    video.hasWebFull = false;
    video.__duration = video.duration;
  },
  togglePlayPause: (video) => (Site.isDouyu() ? Tools.triggerClick(video) : video?.paused ? video?.play() : video?.pause()),
  tryAutoPlay: (video) => video?.paused && (Site.isDouyu() ? Tools.triggerClick(video) : video?.play()),
  checkUsable() {
    if (!this.player || this.isDisablePlaybackRate()) return false;
    if (this.isBackgroundVideo(this.player) || this.isEnded()) return false;
    if (this.isLive() || this.isDynamicDuration(this.player)) return false;
    if (!Tools.validDuration(this.player)) return false;
    return true;
  },
  setPlaybackRate(playRate, show = true) {
    if (!this.checkUsable()) return;

    window.videoEnhance.setPlaybackRate(this.player, playRate);
    if (show) this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
    Storage.CACHED_PLAY_RATE.set(this.player.playbackRate);
  },
  adjustPlaybackRate(step = Storage.PLAY_RATE_STEP.get()) {
    if (!this.player) return;

    const playRate = Math.max(Storage.PLAY_RATE_STEP.get(), Number(this.player.playbackRate) + step);
    this.setPlaybackRate(Math.min(Consts.MAX_PLAY_RATE, playRate));
  },
  resetToDefaultPlayRate() {
    if (this.isDisablePlaybackRate()) return;

    this.setPlaybackRate(Consts.DEF_PLAY_RATE, false);
    this.showToast("已恢复正常倍速播放");
  },
  applyCachedPlayRate(video) {
    if (this.isDisablePlaybackRate()) return;

    const playRate = Storage.CACHED_PLAY_RATE.get();
    // Tools.log(`当前播放倍速为：${video.playbackRate}，记忆倍速为：${playRate}`);
    if (Consts.DEF_PLAY_RATE === playRate || Number(video.playbackRate) === playRate) return;
    this.setPlaybackRate(playRate, !video.hasToast);
    video.hasToast = true;
  },
  adjustPlayProgress(second = Storage.SKIP_INTERVAL.get()) {
    if (!this.player || !Tools.validDuration(this.player) || (second > 0 && this.player.isEnded)) return;

    const currentTime = Math.min(Number(this.player.currentTime) + second, this.player.duration);
    this.setCurrentTime(currentTime);
  },
  cachePlayTime(video) {
    if (this.isDynamicDuration(video) || video.duration < 120) return;
    if (Number(video.currentTime) < Storage.SKIP_INTERVAL.get()) return;
    if (!this.topWin || this.isLive() || !Tools.validDuration(video)) return;

    if (Storage.DISABLE_MEMORY_TIME.get() || this.isEnded()) return this.clearCachedTime(video);
    if (video.duration - video.currentTime <= Storage.ZERO_KEY_SKIP_INTERVAL.get()) return this.clearCachedTime(video);

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
      el.style.setProperty("transform", `translateY(${-5 - el.offsetHeight}px)`);
    });
  },
  clearCachedTime(video) {
    Storage.PLAY_TIME.del(this.getCacheTimeKey(video));
  },
  getCacheTimeKey(video) {
    return `${this.topWin.urlHash}_${Math.floor(video.duration)}`;
  },
  clearMultiVideoCacheTime() {
    Promise.resolve().then(() => {
      if (!Tools.isMultiVideo()) return;
      const pattern = `${Storage.PLAY_TIME.name}${this.topWin.urlHash}`;
      const keys = Object.keys(Storage.PLAY_TIME.fuzzyGet(pattern));
      if (keys.length > 1) Storage.PLAY_TIME.fuzzyDel(pattern);
    });
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
    this.setVideoTsr("--mirror", tsr.isMirrored ? -1 : 1);
  },
  rotateVideo() {
    if (!this.player) return;

    const tsr = this.player.tsr;
    tsr.rotation = (tsr.rotation + 90) % 360;
    const { videoWidth, videoHeight } = this.player;
    const isVertical = [90, 270].includes(tsr.rotation);
    const scale = isVertical ? videoHeight / videoWidth : 1;
    this.setVideoTsr("--scale", scale).setVideoTsr("--rotate", `${tsr.rotation}deg`);
  },
  zoomVideo(isDown) {
    if (!this.player || this.isDisableZoom()) return;

    const tsr = this.player.tsr;
    const zoom = tsr.zoom + (isDown ? -Consts.ZOOM_STEP : Consts.ZOOM_STEP);
    if (zoom < Consts.MIN_ZOOM || zoom > Consts.MAX_ZOOM) return;

    tsr.zoom = zoom;
    this.setVideoTsr("--zoom", zoom / 100);
    this.showToast(`缩放：${zoom}%`, Consts.ONE_SEC);
  },
  moveVideoPosition(direction) {
    if (!this.player || this.isDisableZoom()) return;

    const tsr = this.player.tsr;
    const { x, y, desc } = {
      ALT_UP: { y: -Consts.MOVE_STEP, desc: "垂直移动" },
      ALT_DOWN: { y: Consts.MOVE_STEP, desc: "垂直移动" },
      ALT_LEFT: { x: -Consts.MOVE_STEP, desc: "水平移动" },
      ALT_RIGHT: { x: Consts.MOVE_STEP, desc: "水平移动" },
    }[direction];

    ((tx = 0, ty = 0) => ((tsr.moveX += tx), (tsr.moveY += ty)))(x, y);
    this.setVideoTsr("--moveX", `${tsr.moveX}px`).setVideoTsr("--moveY", `${tsr.moveY}px`);
    this.showToast(`${desc}：${x ? tsr.moveX : tsr.moveY}px`, Consts.ONE_SEC);
  },
  resetVideoTransform() {
    if (!this.player || this.isDisableZoom()) return;

    this.setVideoTsr("--zoom", 1)
      .setVideoTsr("--moveX", 0)
      .setVideoTsr("--moveY", 0)
      .setVideoTsr("--scale", 1)
      .setVideoTsr("--mirror", 1)
      .setVideoTsr("--rotate", "0deg");
    window.videoEnhance.resetTsr(this.player);
  },
  captureScreenshot() {
    if (!this.player || this.isDisableScreenshot()) return;

    this.player.setAttribute("crossorigin", "anonymous");
    const canvas = document.createElement("canvas");
    canvas.height = this.player.videoHeight;
    canvas.width = this.player.videoWidth;
    const ctx = canvas.getContext("2d");

    try {
      ctx.drawImage(this.player, 0, 0, canvas.width, canvas.height);
      GM_download(canvas.toDataURL("image/png"), `视频截图_${Date.now()}.png`);
    } catch (e) {
      canvas.style.setProperty("max-width", "98vw");
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
  showToast(content, duration = Consts.ONE_SEC * 3, isRemove = true) {
    return new Promise((resolve) => {
      const el = document.createElement("div");
      el.setAttribute("class", "monkey-toast");
      if (isRemove) Tools.query(".monkey-toast")?.remove();
      content instanceof Element ? el.appendChild(content) : (el.innerHTML = content);

      (this.findControlBarContainer() ?? this.findVideoParentContainer(null, 2)).prepend(el), resolve(el);
      setTimeout(() => ((el.style.opacity = 0), setTimeout(() => el.remove(), Consts.ONE_SEC / 3)), duration);
    });
  },
  formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [...(h ? [h] : []), m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
  },
  setVideoTsr(name, value) {
    Tools.addCls(this.player, "__tsr");

    try {
      // 默认 transform 样式
      this.player.__trans = this.player.__trans ?? getComputedStyle(this.player)?.getPropertyValue("transform");
      this.player?.style?.setProperty("--deftsr", this.player.__trans);
    } catch (e) {
      console.debug(e);
    }

    // transform 变换值
    this.player?.style?.setProperty(name, value);
    return this;
  },
};
