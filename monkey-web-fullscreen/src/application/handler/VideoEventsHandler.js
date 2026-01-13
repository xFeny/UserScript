import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoAborts: new Map(), // 存储：video -> AbortController（用于事件解绑）
  videoEvts: ["loadedmetadata", "loadeddata", "timeupdate", "canplay", "playing", "ended"],
  setupVideoListeners(video) {
    const handle = (e) => {
      const target = video ?? e.target;
      if (video || target.matches(`video, ${Consts.FAKE_VIDEO}`)) this[e.type](target);
    };

    const ctrl = new AbortController();
    if (video) this.videoAborts.get(video)?.abort(); // 防止重复绑定

    this.videoEvts.forEach((t) => (video ?? document).addEventListener(t, handle, { capture: true, signal: ctrl.signal }));
    if (video) this.videoAborts.set(video, ctrl), this.unbindVideoEvts();
  },
  setupShadowVideoListeners() {
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (!video || video.hasAttribute("received")) return;
      video.setAttribute("received", true);
      this.setupVideoListeners(video);
    });
  },
  unbindVideoEvts() {
    if (this.videoAborts.size <= 1 || Tools.isThrottle("cleanup")) return;
    this.videoAborts.forEach((ctrl, video) => {
      if (Tools.isAttached(video)) return;
      ctrl.abort(), video.removeAttribute("received"), this.videoAborts.delete(video);
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
