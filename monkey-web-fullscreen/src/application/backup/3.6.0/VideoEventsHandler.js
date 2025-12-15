import Tools from "../../common/Tools";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoEvtMap: new WeakMap(), // 存储：video -> handler（仅用于video事件解绑）
  videoEvents: ["loadedmetadata", "loadeddata", "timeupdate", "canplay", "playing", "pause", "ended"],
  setupVideoListeners(video) {
    const handleEvent = (event) => {
      const target = video ?? event.target;
      if (video || target.matches("video, fake-video")) this[event.type](target);
    };

    this.videoEvents.forEach((type) => (video ?? document).addEventListener(type, handleEvent, true));

    if (video && !this.videoEvtMap.has(video)) this.videoEvtMap.set(video, handleEvent);
  },
  setupShadowVideoListeners() {
    // 绑定视频相关事件监听
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (!video || video.hasAttribute("received")) return;
      this.setupVideoListeners(video), video.setAttribute("received", true);
      if (!this.player) this.setCurrentVideo(video);
    });

    // 移除视频相关事件监听
    document.addEventListener("shadow-video-remove", (e) => this.removeVideoListeners(e.detail.video));
  },
  removeVideoListeners(video) {
    if (!video || !this.videoEvtMap.has(video)) return;

    this.videoEvents.forEach((type) => video.removeEventListener(type, this.videoEvtMap.get(video), true));
    video.removeAttribute("received");
    this.videoEvtMap.delete(video);
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
    if (!this.player) this.playing(video);

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
    this.initVideoPlay(video);
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
