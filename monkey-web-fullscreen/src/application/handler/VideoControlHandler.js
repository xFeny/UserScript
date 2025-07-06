import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频控制相关逻辑处理
 */
export default {
  isEnded() {
    return Math.floor(this.player.currentTime) === Math.floor(this.player.duration);
  },
  isDynamicDuration(video) {
    if (!video?.__duration) return false;
    return Math.floor(video.duration) > Math.floor(video.__duration);
  },
  initVideoProperties(video) {
    video.volume = 1;
    video.hasToast = false;
    video.hasWebFull = false;
    video.__duration = video.duration;
  },
  playOrPause: (video) => (Site.isDouyu() ? Tools.triggerClick(video) : video?.paused ? video?.play() : video?.pause()),
  tryplay: (video) => video?.paused && (Site.isDouyu() ? Tools.triggerClick(video) : video?.play()),
  checkUsable() {
    if (!this.player || this.isDisablePlaybackRate()) return false;
    if (this.isBackgroundVideo(this.player) || this.isEnded()) return false;
    if (this.isLive() || this.isDynamicDuration(this.player)) return false;
    if (!Tools.validDuration(this.player)) return false;
    return true;
  },
  setPlaybackRate(playRate, show = true) {
    if (!this.checkUsable()) return;
    window.EnhancerVideo.setPlaybackRate(this.player, playRate);
    if (show) this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
    Storage.CACHED_PLAY_RATE.set(this.player.playbackRate);
  },
  adjustPlaybackRate(step = Storage.PLAY_RATE_STEP.get()) {
    if (!this.player) return;
    const playRate = Math.max(Storage.PLAY_RATE_STEP.get(), Number(this.player.playbackRate) + step);
    this.setPlaybackRate(Math.min(Consts.MAX_PLAY_RATE, playRate));
  },
  defaultPlaybackRate() {
    if (this.isDisablePlaybackRate()) return;
    this.setPlaybackRate(Consts.DEF_PLAY_RATE, false);
    this.showToast("已恢复正常倍速播放");
  },
  useCachePlaybackRate(video) {
    if (this.isDisablePlaybackRate()) return;
    const playRate = Storage.CACHED_PLAY_RATE.get();
    // Tools.log(`当前播放倍速为：${video.playbackRate}，记忆倍速为：${playRate}`);
    if (Consts.DEF_PLAY_RATE === playRate || Number(video.playbackRate) === playRate) return;
    this.setPlaybackRate(playRate, !video.hasToast);
    video.hasToast = true;
  },
  adjustVideoTime(second = Storage.SKIP_INTERVAL.get()) {
    if (!this.player || !Tools.validDuration(this.player) || (second > 0 && this.player.isEnded)) return;
    const currentTime = Math.min(Number(this.player.currentTime) + second, this.player.duration);
    this.setCurrentTime(currentTime);
  },
  cachePlayTime(video) {
    if (this.isDynamicDuration(video) || video.duration < 120) return;
    if (Number(video.currentTime) < Storage.SKIP_INTERVAL.get()) return;
    if (!this.topInfo || this.isLive() || !Tools.validDuration(video)) return;
    if (Storage.DISABLE_MEMORY_TIME.get() || this.isEnded() || this.isMultVideo()) return this.delPlayTime();
    Storage.PLAY_TIME.set(this.topInfo.hash, Number(video.currentTime) - 1, 7);
  },
  useCachePlayTime(video) {
    if (this.hasUsedPlayTime || !this.topInfo || this.isLive()) return;
    const time = Storage.PLAY_TIME.get(this.topInfo.hash);
    if (time <= Number(video.currentTime)) return (this.hasUsedPlayTime = true);
    this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", Consts.ONE_SEC * 3.5, false).then((el) => {
      el.style.setProperty("transform", `translateY(${-5 - el.offsetHeight}px)`);
    });
    this.hasUsedPlayTime = true;
    this.setCurrentTime(time);
  },
  delPlayTime: () => Storage.PLAY_TIME.del(window?.topInfo?.hash),
  setCurrentTime(currentTime) {
    if (currentTime) this.player.currentTime = Math.max(0, currentTime);
  },
  videoMuted() {
    if (!this.player) return;
    this.player.muted = !this.player.muted;
    const tips = this.player.muted ? "🔇 已静音" : "🔊 取消静音";
    this.showToast(tips, Consts.ONE_SEC);
  },
  togglePictureInPicture() {
    if (!this.player) return;
    document.pictureInPictureElement ? document.exitPictureInPicture() : this.player?.requestPictureInPicture();
  },
  videoMirror() {
    if (!this.player) return;
    this.isMirrored = !this.isMirrored;
    this.setVideoTsr("--mirror", this.isMirrored ? -1 : 1);
  },
  rotation: 0,
  videoRotate() {
    if (!this.player) return;
    this.rotation = (this.rotation + 90) % 360;
    const { videoWidth, videoHeight } = this.player;
    const isVertical = [90, 270].includes(this.rotation);
    const scale = isVertical ? videoHeight / videoWidth : 1;
    this.setVideoTsr("--scale", scale).setVideoTsr("--rotate", `${this.rotation}deg`);
    // 测试视频：https://www.bilibili.com/video/BV1DT5AzLEMb、https://www.bilibili.com/video/BV13Y9FYfEVu
  },
  currentZoom: Consts.DEF_ZOOM,
  zoomVideo(isDown) {
    if (!this.player || this.isDisableZoom()) return;
    const zoom = this.currentZoom + (isDown ? -Consts.ZOOM_STEP : Consts.ZOOM_STEP);
    if (zoom < Consts.MIN_ZOOM || zoom > Consts.MAX_ZOOM) return;

    this.currentZoom = zoom;
    this.setVideoTsr("--zoom", zoom / 100);
    this.showToast(`缩放：${zoom}%`, Consts.ONE_SEC);
  },
  moveX: 0,
  moveY: 0,
  moveVideo(direction) {
    if (!this.player || this.isDisableZoom()) return;

    const moveX = this.moveX;
    const { x, y, desc } = {
      ALT_ARROWUP: { y: -Consts.MOVE_STEP, desc: "向上移动" },
      ALT_ARROWDOWN: { y: Consts.MOVE_STEP, desc: "向下移动" },
      ALT_ARROWLEFT: { x: -Consts.MOVE_STEP, desc: "向左移动" },
      ALT_ARROWRIGHT: { x: Consts.MOVE_STEP, desc: "向右移动" },
    }[direction];

    this.moveX += x ?? 0;
    this.moveY += y ?? 0;
    this.setVideoTsr("--moveX", `${this.moveX}px`).setVideoTsr("--moveY", `${this.moveY}px`);
    this.showToast(`${desc}：${moveX === this.moveX ? this.moveY : this.moveX}px`, Consts.ONE_SEC);
  },
  videoScreenshot() {
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
  showToast(content, duration = Consts.ONE_SEC * 3, isRemove = true) {
    return new Promise((resolve) => {
      const el = document.createElement("div");
      el.setAttribute("part", "monkey-toast");
      if (isRemove) Tools.query('[part="monkey-toast"]')?.remove();
      content instanceof Element ? el.appendChild(content) : (el.innerHTML = content);

      const videoWrap = this.getVideoWrapper();
      const target = videoWrap?.matches("video") ? videoWrap?.parentElement : videoWrap;
      target?.appendChild(el);

      setTimeout(() => ((el.style.opacity = 0), setTimeout(() => el.remove(), Consts.ONE_SEC / 3)), duration);
      resolve(el);
    });
  },
  formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [...(h ? [h] : []), m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
  },
  isMultVideo() {
    const playerSrc = this.videoInfo?.src;
    const videos = Tools.querys("video").filter((video) => video.currentSrc !== playerSrc && !isNaN(video.duration));
    return videos.length > 1;
  },
  setVideoTsr(name, value) {
    const cls = "__tsr";
    Tools.addCls(this.player, cls);
    Tools.setPart(this.player, cls);

    try {
      // 默认 transform 样式
      this.player.__trans = this.player.__trans ?? getComputedStyle(this.player)?.getPropertyValue("transform");
      this.player?.style?.setProperty("--deftsr", this.player.__trans);
    } catch (e) {}

    // transform 变换值
    this.player?.style?.setProperty(name, value);
    return this;
  },
};
