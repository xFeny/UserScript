import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoEvtMap: new Map(), // 存储：video -> handler（仅用于video事件解绑）
  videoEvents: ["loadedmetadata", "loadeddata", "timeupdate", "canplay", "playing", "ended"],
  setupVideoListeners(video) {
    const handleEvent = (event) => {
      const target = video ?? event.target;
      if (video || target.matches(`video, ${Consts.FAKE_VIDEO}`)) this[event.type](target);
    };

    this.videoEvents.forEach((type) => (video ?? document).addEventListener(type, handleEvent, true));
    if (video) this.videoEvtMap.set(video, handleEvent), this.cleanupDetachedVideos();
  },
  setupShadowVideoListeners() {
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (!video || video.hasAttribute("received")) return;
      video.setAttribute("received", true);
      this.setupVideoListeners(video);
    });
  },
  cleanupDetachedVideos() {
    if (Tools.isThrottle("cleanup")) return;

    this.videoEvtMap.forEach((handler, video) => {
      if (Tools.isAttached(video)) return;
      this.videoEvents.forEach((type) => video.removeEventListener(type, handler, true));
      video.removeAttribute("received");
      this.videoEvtMap.delete(video);
    });
  },
  // ====================⇓⇓⇓ 视频监听事件相关逻辑 ⇓⇓⇓====================
  loadedmetadata(video) {
    if (video.matches(Consts.FAKE_VIDEO)) this.loadeddata(video);
    if (!this.player) this.setCurrentVideo(video);
    this.autoWebFullscreen(video);
  },
  loadeddata(video) {
    this.initVideoProps(video);
  },
  timeupdate(video) {
    if (isNaN(video.duration)) return;
    if (!this.player) this.playing(video);

    this.resumeRateKeepDisplay();
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
    if (!video.tsr) video.tsr = { ...Consts.DEF_TSR };
    Tools.sleep(50).then(() => this.initVideoPlay(video));
  },
  ended(video) {
    this.autoExitWebFullscreen();
    this.clearCachedTime(video);
  },
};
