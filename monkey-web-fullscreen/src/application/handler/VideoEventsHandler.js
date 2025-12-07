import Tools from "../common/Tools";

/**
 * 视频监听事件逻辑处理
 */
export default {
  async setupShadowVideoEventListeners() {
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (video) this.setupVideoEventListeners(video);
    });
  },
  async setupVideoEventListeners(video) {
    // 事件处理函数
    const handleEvent = (event) => {
      const target = video ?? event.target;
      if (video || target.matches("video, fake-video")) this[event.type](target);
    };

    // 要监听的事件
    ["loadedmetadata", "loadeddata", "timeupdate", "canplay", "playing", "ended"].forEach((type) => {
      (video ?? document).addEventListener(type, handleEvent, true);
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

    if (!video.__hasInitPlaySettings) this.initPlaySettings(video);
    if (!this.player) this.setCurrentVideo(video);

    this.removeRelevantElements(video);
    this.autoWebFullscreen(video);
    this.autoNextEpisode(video);

    this.cachePlayTime(video);
    this.videoProgress(video);
  },
  canplay(video) {
    if (video.__hasTryAutoPlay || Tools.isMultiVideo()) return;
    video.__hasTryAutoPlay = true;
    this.tryAutoPlay(video);
  },
  playing(video) {
    video.__isEnded = false;
    this.setCurrentVideo(video);
    this.initPlaySettings(video);
  },
  ended(video) {
    video.__isEnded = true;
    this.autoExitWebFullscreen();
    this.clearCachedTime(video);
  },
};
