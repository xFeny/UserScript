import Tools from "../common/Tools";
import Storage from "../common/Storage";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoEvents: ["loadedmetadata", "loadeddata", "timeupdate", "canplay", "playing", "pause", "ended"],
  setupVideoListeners(video) {
    const handleEvent = (event) => {
      const target = video ?? event.target;
      if (video || target.matches("video, fake-video")) this[event.type](target);
    };

    this.videoEvents.forEach((type) => (video ?? document).addEventListener(type, handleEvent, true));
  },
  setupShadowVideoListeners() {
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (!video || video.hasAttribute("received")) return;
      this.setupVideoListeners(video), video.setAttribute("received", true);
      Tools.microTask(() => this.createEdgeClickElement(video));
    });
  },
  // ====================⇓⇓⇓ 视频监听事件相关逻辑 ⇓⇓⇓====================
  loadedmetadata(video) {
    if (video.matches("fake-video")) this.loadeddata(video);
    if (!this.player) this.setCurrentVideo(video);
    this.autoWebFullscreen(video);
    this.hideLoadingElement();
  },
  loadeddata(video) {
    this.initVideoProps(video);
  },
  timeupdate(video) {
    if (isNaN(video.duration)) return;
    if (!this.player) this.playing(video);

    this.resumeRateKeepDisplay();
    this.removeRelevantElements(video);

    this.autoWebFullscreen(video);
    this.autoNextEpisode(video);

    this.cachePlayTime(video);
    this.videoProgress(video);
  },
  canplay(video) {
    if (!Tools.isVisible(video) || Storage.DISABLE_TRY_PLAY.get()) return;
    if (video._mfs_tryPlay || Tools.isMultiVideo()) return;
    video._mfs_tryPlay = true;
    this.tryPlay(video);
  },
  playing(video) {
    this.setCurrentVideo(video);
    Tools.sleep(50).then(() => this.initVideoPlay(video));
  },
  pause() {
    // 稀饭动漫（https://dm.xifanacg.com）
    Tools.query(".ec-no")?.click();
  },
  ended(video) {
    this.autoExitWebFullscreen();
    this.clearCachedTime(video);
  },
};
