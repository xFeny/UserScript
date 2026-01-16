import Tools from "../common/Tools";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoAborts: new Map(), // 存储：video -> AbortController（用于事件解绑）
  videoEvts: ["loadedmetadata", "timeupdate", "playing"],
  setupVideoListeners(video) {
    const ctrl = new AbortController();
    if (video) this.videoAborts.get(video)?.abort(); // 防止重复绑定
    const handle = (e) => this[e.type](video ?? e.target);
    this.videoEvts.forEach((t) => (video ?? document).addEventListener(t, handle, { capture: true, signal: ctrl.signal }));
    if (video) this.videoAborts.set(video, ctrl), this.unbindVideoEvts();
  },
  setupShadowVideoListener() {
    document.addEventListener("shadow-video", (e) => {
      const { video } = e.detail;
      if (!video || video.hasAttribute("received")) return;
      video.setAttribute("received", true);
      this.setupVideoListeners(video);
    });
  },
  unbindVideoEvts() {
    if (Tools.isThrottle("cleanup", 100)) return;
    this.videoAborts.forEach((ctrl, video) => {
      if (Tools.isAttached(video)) return;
      ctrl.abort(), video.removeAttribute("received"), this.videoAborts.delete(video);
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
    if (!video || this.player === video || video.offsetWidth < 260 || this.isMutedLoop(video)) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // this.player 播放中

    this.setPlayer(video);
  },
  setPlayer(video) {
    this.player = video;
    const videoInfo = { isLive: video.duration === Infinity, timestamp: Date.now() };
    this.syncVideoToParentWin(videoInfo);
  },
  syncVideoToParentWin(videoInfo) {
    window.videoInfo = this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo: { ...videoInfo, iFrame: location.href } });
    Tools.microTask(() => this.initMenuCmds());
    this.sendTopWinInfo();
  },
  sendTopWinInfo() {
    // 向iframe传递顶级窗口信息
    const { host, href: url } = location;
    const { innerWidth: vw, innerHeight: vh } = window;
    const topWin = { url, host, vw, vh };
    window.topWin = this.topWin = topWin;
    Tools.sendToIFrames({ topWin });
  },
};
