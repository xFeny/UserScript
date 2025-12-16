import Consts from "../common/Consts";
import Tools from "../common/Tools";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoEvtMap: new Map(), // 存储：video -> handler（仅用于video事件解绑）
  videoEvents: ["loadedmetadata", "loadeddata", "timeupdate", "canplay", "playing", "pause", "ended"],
  setupVideoListeners(video) {
    const handleEvent = (event) => {
      const target = video ?? event.target;
      if (video || target.matches("video, fake-video")) this[event.type](target);
    };

    this.videoEvents.forEach((type) => (video ?? document).addEventListener(type, handleEvent, true));
    if (video) this.videoEvtMap.set(video, handleEvent), this.initCleanupTimer();
  },
  setupShadowVideoListeners() {
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (!video || video.hasAttribute("received")) return;
      this.setupVideoListeners(video), video.setAttribute("received", true);
      if (!this.player) this.setCurrentVideo(video);
    });
  },
  initCleanupTimer() {
    if (this.cleanupTimer || this.videoEvtMap.size <= 1) return;
    this.cleanupTimer = setInterval(() => this.cleanupDetachedVideos(), Consts.THREE_SEC * 10);
  },
  cleanupDetachedVideos() {
    this.videoEvtMap.forEach((handler, video) => {
      if (Tools.isAttached(video)) return;
      this.videoEvents.forEach((type) => video.removeEventListener(type, handler, true));
      this.videoEvtMap.delete(video);
      video.removeAttribute("received");
      // Tools.log("清理已脱离文档的video元素", video);
    });
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
