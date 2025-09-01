import Tools from "./common/Tools";
import Consts from "./common/Consts";
import Storage from "./common/Storage";
import Clock from "./common/Clock";
import Site from "./common/Site";

export default window.App = {
  init() {
    this.setupDocBodyObserver();
    this.setupVisibleListener();
    this.setupKeydownListener();
    this.setupUrlChangeListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.observeFullscreenChange();
    this.setupIgnoreUrlsChangeListener();
    document.addEventListener("load", () => this.triggerStartElement(), true);
  },
  isNormalSite: () => !window?.videoInfo && !window?.topWin,
  getVideo: () => Tools.querys(":is(video, fake-video):not([loop])").find(Tools.isVisible),
  isBackgroundVideo: (video) => video?.muted && video?.hasAttribute("loop"),
  triggerStartElement() {
    // https://www.zhihu.com 、https://www.jumomo.cc 、https://www.jiaozi.me 、https://www.kmvod.cc
    const element = Tools.query("._qrp4qg, .ec-no, .conplaying, #start, .choice-true, .close-btn, .closeclick");
    if (!element || Tools.isFrequent("start")) return;
    setTimeout(() => element?.click() & element?.remove(), 150);
  },
  setupVisibleListener() {
    window.addEventListener("visibilitychange", () => {
      if (this.isNormalSite() || Storage.DISABLE_INVISIBLE_PAUSE.get()) return;

      const video = this.player ?? this.getVideo();
      if (!video || video?.isEnded || !Tools.isVisible(video)) return;
      document.hidden ? video?.pause() : video?.play();
    });
  },
  setupUrlChangeListener() {
    const _wr = (method) => {
      const original = history[method];
      history[method] = function () {
        original.apply(this, arguments);
        window.dispatchEvent(new Event(method));
      };
    };
    const handler = () => this.setupDocBodyObserver();
    ["popstate", "pushState", "replaceState"].forEach((t) => _wr(t) & window.addEventListener(t, handler));
  },
  setupDocBodyObserver() {
    this.bodyObserver?.disconnect();
    clearTimeout(this.observerTimeout);
    this.bodyObserver = Tools.createObserver(document.body, () => {
      this.removeLoginPopups();
      const video = this.getVideo();
      if (video?.offsetWidth) this.setCurrentVideo(video);
      if (this.topWin) this.bodyObserver.disconnect();
    });
    this.observerTimeout = setTimeout(() => this.bodyObserver?.disconnect(), Consts.ONE_SEC * 10);
  },
  setCurrentVideo(video) {
    if (!video || this.player === video) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // player播放中
    if ((!Site.isMgtv() && video.offsetWidth < 200) || this.isBackgroundVideo(video)) return;

    this.player = video;
    this.setVideoInfo(video);
    this.setupVideoObserver(video);
    window.videoEnhance.enhanced(video);
    this.createClock();
  },
  setVideoInfo(video) {
    const isLive = Object.is(video.duration, Infinity);
    const selector = Tools.getParentChain(video, true);
    const videoInfo = { ...Tools.getCenterPoint(video), src: video.currentSrc, isLive, selector };
    this.setParentWinVideoInfo(videoInfo);
  },
  setParentWinVideoInfo(videoInfo) {
    window.videoInfo = this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo: { ...videoInfo, iframeSrc: location.href } });
    Promise.resolve().then(() => (this.setupPickerEpisodeListener(), this.setupScriptMenuCommand()));
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
  setupVideoObserver(video) {
    this.playerObserver?.disconnect();
    const handleAttrChange = (mutations) => {
      mutations.forEach((mutation) => {
        const { attributeName, oldValue, target } = mutation;
        const newValue = target.getAttribute(attributeName);
        if (attributeName !== "src" || oldValue === newValue || !newValue) return;
        // Tools.log(`视频源变化: ${oldValue ?? "空"} => ${newValue ?? "空"}`);

        // 确保topWin信息的即时性和可靠性
        this.setVideoInfo(target);
        this.initVideoProps(target);
        this.hasAppliedCachedTime = false;
      });
    };

    const options = { attributes: true, attributeOldValue: true };
    this.playerObserver = Tools.createObserver(video, handleAttrChange, options);
  },
  setupMouseMoveListener() {
    let timer = null;
    const handleMouseEvent = ({ target, isTrusted }) => {
      if (!isTrusted) return;

      clearTimeout(timer), this.toggleCursor();
      timer = setTimeout(() => this.toggleCursor(true), Consts.THREE_SEC);
      if (target instanceof HTMLVideoElement) this.setCurrentVideo(target);
    };

    document.addEventListener("mousemove", (e) => handleMouseEvent(e));
    document.addEventListener("mouseover", (e) => e.target.matches("video, iframe") && handleMouseEvent(e));
  },
  toggleCursor(hide = false) {
    if (this.isNormalSite() || Tools.isFrequent("cursor", undefined, true)) return;
    const cls = "__hc";

    if (!hide) return Tools.querys(`.${cls}`).forEach((el) => Tools.delCls(el, cls));

    [...Tools.getParents(this.player, true, 3), ...Tools.getIFrames()].forEach((el) => {
      el?.blur(), Tools.addCls(el, cls), el?.dispatchEvent(new MouseEvent("mouseleave"));
    });
  },
  setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      const isFullscreen = !!document.fullscreenElement;
      Tools.postMessage(window.top, { isFullscreen });
    });
  },
  observeFullscreenChange() {
    let _isFullscreen = false;
    Object.defineProperty(this, "isFullscreen", {
      get: () => _isFullscreen,
      set: (value) => {
        _isFullscreen = value;
        this.handleFullscreenChange(value);
      },
    });
  },
  handleFullscreenChange(isFullscreen) {
    if (!this.player) return;

    // 退出全屏模式时，移除播放进度元素
    !isFullscreen && this.removeVideoProgress();

    // 时钟显示或隐藏
    this.toggleClock();
  },
  createClock(state = Clock.state.stop) {
    Promise.resolve().then(() => {
      this.Clock?.destroy(), (this.Clock = null); // 先销毁再创建
      if (!this.player?.parentNode) return;

      // 全屏或非全屏显示时间
      const shouldDestroy = this.shouldDestroyTimeEl();
      this.Clock = new Clock(this.player.parentNode, { color: Storage.CLOCK_COLOR.get() });
      this.Clock[shouldDestroy ? state : Clock.state.start]?.();
      this.toggleSmallerFont(Storage.USE_SMALLER_FONT.get());
    });
  },
  toggleClock() {
    // 隐藏时钟
    if (this.shouldDestroyTimeEl()) return this.Clock?.destroy();

    // 显示时钟
    const state = Clock.state.start;
    this.Clock?.isInDOM() ? this.Clock[state]() : this.createClock(state);
    this.Clock?.setCustomColor(Storage.CLOCK_COLOR.get());
  },
  shouldDestroyTimeEl() {
    const isFull = this.isFullscreen;
    return (isFull && Storage.DISABLE_CLOCK.get()) || (!isFull && !Storage.UNFULL_CLOCK.get());
  },
};
