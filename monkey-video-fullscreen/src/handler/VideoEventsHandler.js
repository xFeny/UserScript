import Tools from "../common/Tools";

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
      Tools.microTask(() => this.createEdgeClickElement(video));
      if (!this.player) this.setCurrentVideo(video);
    });
  },
  loadedmetadata(video) {
    this.autoWebFullscreen(video);
    if (!this.player) this.playing(video);
  },
  loadeddata(video) {
    this.initVideoProps(video);
  },
  timeupdate(video) {
    if (isNaN(video.duration)) return;
    if (!this.player) this.playing(video);
    this.autoWebFullscreen(video);
  },
  playing(video) {
    this.setCurrentVideo(video);
  },
  initVideoProps(video) {
    delete video.__isWide;
    Tools.resetLimit("autoWide");
    if (!Tools.isAttached(this.player)) delete this.player;
  },
};
