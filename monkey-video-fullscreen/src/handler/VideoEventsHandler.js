import Tools from "../common/Tools";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoEvents: ["loadedmetadata", "timeupdate", "playing"],
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
    });
  },
  // ====================⇓⇓⇓ 视频监听事件相关逻辑 ⇓⇓⇓====================
  loadedmetadata(video) {
    this.initVideoProps(video);
    if (!this.player) this.setCurrentVideo(video);
  },
  timeupdate(video) {
    if (isNaN(video.duration)) return;
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
  // ====================⇑⇑⇑ 视频监听事件相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 设置当前视频相关逻辑 ⇓⇓⇓====================
  setCurrentVideo(video) {
    if (!video || this.player === video || video.offsetWidth < 240 || this.isBackgroundVideo(video)) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // this.player 播放中

    this.player = video;
    this.setVideoInfo(video);
  },
  setVideoInfo(video) {
    const videoInfo = { isLive: video.duration === Infinity };
    this.syncVideoToParentWin(videoInfo);
  },
  syncVideoToParentWin(videoInfo) {
    window.videoInfo = this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo: { ...videoInfo, iFrame: location.href } });
    Tools.microTask(() => this.setupScriptMenuCommand());
    this.sendTopWinInfo();
  },
  sendTopWinInfo() {
    // 向iframe传递顶级窗口信息
    const { host, href: url } = location;
    const { innerWidth: viewWidth, innerHeight: viewHeight } = window;
    const topWin = { url, host, viewWidth, viewHeight };
    window.topWin = this.topWin = topWin;
    Tools.sendToIFrames({ topWin });
  },
};
