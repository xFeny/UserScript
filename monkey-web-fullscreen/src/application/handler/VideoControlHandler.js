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
    return this.videoInfo.isLive || this.player?.duration > 864e3 || this.isDynamicDuration(this.player);
  },
  isDynamicDuration(video) {
    if (!video) return false;
    if (video.__isDynamic) return true;
    if (Tools.isOverLimit("isDynamic", 20)) return false;

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
    delete video.hasTriedAutoNext;
    delete video.hasApplyCachedRate;
    video.__duration = video.duration;
    Tools.resetLimitCounter("autoWebFull");
    if (!Storage.DISABLE_DEF_MAX_VOLUME.get()) video.volume = 1;
    this.removeVideoProgress();
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
    if (Storage.DISABLE_MEMORY_SPEED.get()) return Promise.resolve(); // 禁用记忆

    Storage.CACHED_PLAY_RATE.set(this.player.playbackRate);
    return Promise.resolve();
  },
  adjustPlaybackRate(step = Storage.PLAY_RATE_STEP.get()) {
    if (!this.player) return;

    const playRate = Math.max(Consts.MIN_PLAY_RATE, Number(this.player.playbackRate) + step);
    this.setPlaybackRate(Math.min(Consts.MAX_PLAY_RATE, playRate));
  },
  resetToDefaultPlayRate() {
    this.setPlaybackRate(Consts.DEF_PLAY_RATE, false)?.then(() => this.showToast("已恢复正常倍速播放"));
  },
  applyCachedPlayRate(video) {
    if (video.hasApplyCachedRate) return;
    if (Storage.DISABLE_MEMORY_SPEED.get()) return this.deleteCachedPlayRate();

    const playRate = Storage.CACHED_PLAY_RATE.get();
    if (Consts.DEF_PLAY_RATE === playRate || Number(video.playbackRate) === playRate) return;
    this.setPlaybackRate(playRate, !video.hasApplyCachedRate)?.then(() => (video.hasApplyCachedRate = true));
  },
  adjustPlayProgress(second = Storage.SKIP_INTERVAL.get()) {
    if (!this.player || this.isLive() || this.isEnded()) return;

    // 跳过指定秒数
    const currentTime = Math.min(Number(this.player.currentTime) + second, this.player.duration);
    this.setCurrentTime(currentTime);
  },
  cachePlayTime(video) {
    if (Tools.isFrequent("cacheTime", Consts.ONE_SEC, true)) return; // 节流
    if (!this.topWin || video.paused || video.duration < 120 || this.isLive()) return;
    if (Number(video.currentTime) < Storage.SKIP_INTERVAL.get()) return; //播放时间太短

    // 禁用记忆、播放结束、距离结束30秒，清除记忆缓存
    if (Storage.DISABLE_MEMORY_TIME.get() || this.isEnded()) return this.clearCachedTime(video);
    if (this.getRemainingTime(video) <= 30) return this.clearCachedTime(video);

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
    const step = Storage.ZOOM_PERCENT.get();
    const zoom = tsr.zoom + (isDown ? -step : step);
    if (zoom < Consts.MIN_ZOOM || zoom > Consts.MAX_ZOOM) return;

    tsr.zoom = zoom;
    this.setVideoTsr("--zoom", zoom / 100);
    this.showToast(`缩放：${zoom}%`, Consts.ONE_SEC);
  },
  moveVideoPosition(direction) {
    if (!this.player || this.isDisableZoom()) return;

    const tsr = this.player.tsr;
    const step = Storage.MOVING_DISTANCE.get();
    const { x, y, desc } = {
      ALT_UP: { y: -step, desc: "垂直移动" },
      ALT_DOWN: { y: step, desc: "垂直移动" },
      ALT_LEFT: { x: -step, desc: "水平移动" },
      ALT_RIGHT: { x: step, desc: "水平移动" },
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
  videoProgress(video) {
    const shouldDestroy = this.shouldDestroyTimeEl();
    if (shouldDestroy || this.isLive()) return this.removeVideoProgress();

    // 确保只创建一个元素
    if (!this.progressElement) {
      const color = Storage.CLOCK_COLOR.get();
      this.progressElement = document.createElement("div");
      this.progressElement.classList.add("__time-progress");
      if (color) this.progressElement.style.setProperty("color", color);
      video.parentNode.prepend(this.progressElement);
    }

    const percent = ((video.currentTime / video.duration) * 100).toFixed(1);
    const timeLeft = this.formatTime(video.duration - video.currentTime);
    this.progressElement.innerHTML = `${timeLeft} / ${percent}<b>%</b>`;
  },
  removeVideoProgress() {
    this.progressElement?.remove();
    this.progressElement = null;
  },
};
