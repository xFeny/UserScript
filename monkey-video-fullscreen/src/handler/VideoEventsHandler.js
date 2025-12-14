/**
 * 视频监听事件逻辑处理
 */
export default {
  videoEvents: ["loadedmetadata", "loadeddata", "timeupdate", "playing"],
  setupVideoListeners(video) {
    const handleEvent = (event) => this[event.type](video ?? event.target);
    this.videoEvents.forEach((type) => (video ?? document).addEventListener(type, handleEvent, true));
  },
  setupShadowVideoListeners() {
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (!video || video.hasAttribute("received")) return;
      this.setupVideoListeners(video), video.setAttribute("received", true);
      if (!this.player) this.setCurrentVideo(video);
    });
  },
  loadedmetadata(video) {
    this.autoWebFullscreen(video);
  },
  loadeddata(video) {
    this?.initVideoProps(video);
  },
  timeupdate(video) {
    if (isNaN(video.duration)) return;
    if (!this.player) this.playing(video);
    this.autoWebFullscreen(video);
    this?.resumeRateKeepDisplay();
  },
  playing(video) {
    this.setCurrentVideo(video);
    this?.applyCachedPlayRate(video);
  },
};
