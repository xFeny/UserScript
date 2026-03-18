import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoAborts: new Map(), // 存储：video -> AbortController（用于事件解绑）
  videoEvts: ["loadedmetadata", "loadeddata", "timeupdate", "ratechange", "canplay", "playing", "ended"],
  setupVideoListeners(video) {
    const ctrl = new AbortController();
    video && this.videoAborts.get(video)?.abort(); // 防止重复绑定

    const handle = ({ type, target }) => {
      if (!target.matches(`video, ${Consts.FAKE_VIDEO}`)) return;
      (this[type]?.(target), this.customVideoEvtHandle(type, target));
    };

    this.videoEvts.forEach((t) => (video ?? document).addEventListener(t, handle, { capture: true, signal: ctrl.signal }));
    if (video) (this.videoAborts.set(video, ctrl), this.unbindVideoEvts());
  },
  setupShadowVideoListener() {
    document.addEventListener("shadow-video", ({ detail: { video } }) => {
      if (!video || video.hasAttribute("received")) return;
      video.setAttribute("received", true);
      this.setupVideoListeners(video);
    });
  },
  unbindVideoEvts() {
    if (Tools.isThrottle("cleanup", Consts.ONE_SEC)) return;
    this.videoAborts.forEach((ctrl, video) => {
      if (Tools.isAttached(video)) return;
      (ctrl.abort(), video.removeAttribute("received"), this.videoAborts.delete(video));
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

    this.autoWebFullscreen(video);
    this.autoNextEpisode(video);

    this.cachePlayTime(video);
    this.videoProgress(video);
    this.ensureRateDisplay();
  },
  canplay(video) {
    if (!Tools.isVisible(video) || Tools.isMultiV() || Storage.DISABLE_TRY_PLAY.get()) return;
    if (!this.isExecuted("_mfs_playV", video)) this.playV(video);
  },
  playing(video) {
    this.setCurrentVideo(video);
    video.tsr ??= { ...Consts.DEF_TSR };
    Tools.sleep(50).then(() => this.initVideoPlay(video));
  },
  ended(video) {
    this.autoExitWebFullscreen();
    this.clearCachedTime(video);
  },
  ratechange: () => App.playbackRateDisplay(),
  customVideoEvtHandle(type, video) {
    if (this.isMutedLoop(video)) return;
    if (type === "timeupdate" && Tools.isThrottle("codeSnippet", Consts.ONE_SEC)) return;
    Tools.microTask(() => this.executeCodeSnippet(Storage.VIDEO_EVT_CODE.get(this.host), type, video));
  },
  codeSnippetCache: new Map(),
  executeCodeSnippet(jsCode, type, video) {
    try {
      if (!jsCode) return;
      const args = ["type", "video", "unsafeWindow", "Tools", "App"];
      const handler = this.codeSnippetCache.get(type) || this.codeSnippetCache.set(type, new Function(...args, jsCode)).get(type);
      handler(type, video, unsafeWindow, Tools, App);
    } catch (e) {
      console.error("JS代码片段执行出错：", e);
    }
  },
};
