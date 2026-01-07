import Storage from "../common/Storage";
import Tools from "../common/Tools";

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
  // ====================⇓⇓⇓ 设置当前视频相关逻辑 ⇓⇓⇓====================
  setCurrentVideo(video) {
    if (!video || this.player === video || video.offsetWidth < 260 || this.isBackgroundVideo(video)) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // this.player 播放中

    this.player = video;
    this.setVideoInfo(video);
    this.observeVideoSrcChange(video);
  },
  setVideoInfo(video) {
    const isLive = Object.is(video.duration, Infinity);
    const selector = Tools.getParentChain(video, true);
    const videoInfo = { src: video.currentSrc, isLive, selector };
    this.setParentWinVideoInfo(videoInfo);
  },
  setParentWinVideoInfo(videoInfo) {
    window.videoInfo = this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo: { ...videoInfo, iframeSrc: location.href } });
    Tools.microTask(() => (this.setupPickerEpisodeListener(), this.setupScriptMenuCommand()));
    this.getVideoIFrame()?.focus(); // 自动聚焦到内嵌框架，使空格键能切换播放状态
    this.sendTopWinInfo();
  },
  sendTopWinInfo() {
    // 向iframe传递顶级窗口信息
    const { host, href: url } = location;
    const { innerWidth: viewWidth, innerHeight: viewHeight } = window;
    const topWin = { url, host, viewWidth, viewHeight, urlHash: Tools.hashCode(url) };
    window.topWin = this.topWin = topWin;
    Tools.sendToIFrames({ topWin });
  },
  observeVideoSrcChange(video) {
    if (video.hasAttribute("observed")) return;
    video.setAttribute("observed", true);

    const that = this;
    const isFake = video.matches(Consts.FAKE_VIDEO);
    const handleChange = (v) => (delete that.topWin, that.setVideoInfo(v));
    VideoEnhancer.defineProperty(video, isFake ? "srcConfig" : "src", {
      set(value, setter) {
        isFake ? (this._src = value) : setter(value);
        if ((isFake || this === that.player) && value) handleChange(this);
      },
    });
  },
  // ====================⇑⇑⇑ 设置当前视频相关逻辑 ⇑⇑⇑====================
};
