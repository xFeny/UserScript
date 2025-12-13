import Tools from "../common/Tools";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoEvents: ["loadedmetadata", "loadeddata", "timeupdate", "canplay", "playing", "pause", "ended"],
  setupShadowVideoEventListeners() {
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (!video || video.hasAttribute("received")) return;
      this.setupVideoEventListeners(video), video.setAttribute("received", true);
      if (!this.player) this.setCurrentVideo(video);
    });
  },
  setupVideoEventListeners(video) {
    const handleEvent = (event) => {
      const target = video ?? event.target;
      if (video || target.matches("video, fake-video")) this[event.type](target);
    };

    this.videoEvents.forEach((type) => (video ?? document).addEventListener(type, handleEvent, true));
  },
  loadedmetadata(video) {
    this.autoWebFullscreen(video);
    Tools.querys('[id*="loading"]').forEach((el) => !Tools.query("video", el) && Tools.addCls(el, "_noplayer"));
  },
  loadeddata(video) {
    this.initVideoProps(video);
  },
  timeupdate(video) {
    if (isNaN(video.duration)) return;

    if (!video._mfs_hasPlayInited) this.initPlaySettings(video);
    if (!this.player) this.setCurrentVideo(video);

    this.resumeRateKeepDisplay();
    this.removeRelevantElements(video);

    this.autoWebFullscreen(video);
    this.autoNextEpisode(video);

    this.cachePlayTime(video);
    this.videoProgress(video);
  },
  canplay(video) {
    if (video._mfs_hasTryPlay || Tools.isMultiVideo()) return;
    video._mfs_hasTryPlay = true;
    this.tryPlay(video);
  },
  playing(video) {
    this.setCurrentVideo(video);
    this.initPlaySettings(video);
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
