import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Keyboard from "../common/Keyboard";
import VideoEnhancer from "../VideoEnhancer";

// 要 Object.defineProperty 的值
const observedValue = { isFullscreen: false, fsWrapper: null };

/**
 * 应用程序初始化
 */
export default {
  isNormalSite: () => !window?.videoInfo && !window?.topWin,
  isBackgroundVideo: (video) => video?.muted && video?.hasAttribute("loop"),
  getVideo: () => Tools.querys(":is(video, fake-video):not([loop])").find(Tools.isVisible),
  init(isNonFirstInit = false) {
    this.setupDocBodyObserver();
    this.setupKeydownListener();
    this.setupVisibleListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.setupVideoEventListeners();

    if (isNonFirstInit) return;
    this.observeFullscreenChange();
    this.observeWebFullscreenChange();
    this.setupIgnoreUrlsChangeListener();
    this.setupShadowVideoEventListeners();
    this.setupDocMutationObserver();
  },
  setupDocMutationObserver() {
    new MutationObserver(() => {
      if (this.documentElement === document.documentElement) return;
      this.init(true), document.head.append(scriptStyle.cloneNode(true));
    }).observe(document, { childList: true });
  },
  async setupVisibleListener() {
    window.addEventListener("visibilitychange", () => {
      if (this.isNormalSite() || Storage.DISABLE_INVISIBLE_PAUSE.get()) return;

      const video = this.player ?? this.getVideo();
      if (!video || video?._mfs_isEnded || !Tools.isVisible(video)) return;
      document.hidden ? video?.pause() : video?.play();
    });
  },
  setupDocBodyObserver() {
    this.documentElement = document.documentElement;
    this.docObserver?.disconnect(), clearTimeout(this.observerTimer);
    this.docObserver = Tools.createObserver(document, () => {
      const video = this.getVideo();

      // 某些网站需要点击相关元素，才会加载视频，如：https://www.dadalv.cc、https://www.pipilv.cc
      const element = Tools.query("body > #start");
      if (element) setTimeout(() => (element.click?.(), element.remove?.()), 300);

      Promise.resolve().then(() => this.removeLoginPopups());
      if (video?.offsetWidth) this.setCurrentVideo(video);
      if (this.topWin) this.docObserver.disconnect();
    });
    this.observerTimer = setTimeout(() => this.docObserver?.disconnect(), Consts.ONE_SEC * 10);
  },
  setCurrentVideo(video) {
    if (!video || this.player === video) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // player播放中
    if ((!Site.isMgtv() && video.offsetWidth < 240) || this.isBackgroundVideo(video)) return;

    this.player = video;
    this.setVideoInfo(video);
    this.observeVideoSrcChange(video);
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
  async observeVideoSrcChange(video) {
    const that = this;
    if (video.hasAttribute("processed")) return;
    video.setAttribute("processed", true);

    const isFake = video.matches(Consts.FAKE_VIDEO);
    const handleChange = (v) => (delete that.topWin, that.setVideoInfo(v));
    VideoEnhancer.defineProperty(video, isFake ? "srcConfig" : "src", {
      set(value, setter) {
        isFake ? (this._src = value) : setter(value);
        if ((isFake || this === that.player) && value) handleChange(this);
      },
    });
  },
  async setupMouseMoveListener() {
    let timer = null;
    const handleEvent = ({ type, isTrusted }) => {
      const gap = Object.is(type, "mousemove") ? 150 : 50;
      if (!isTrusted || Tools.isFrequent(type, gap, true)) return;

      clearTimeout(timer), this.toggleCursor();
      timer = setTimeout(() => this.toggleCursor(true), Consts.TWO_SEC);
    };

    document.addEventListener("mousemove", (e) => handleEvent(e));
    document.addEventListener("mouseover", (e) => e.target.matches("video, iframe") && handleEvent(e));
  },
  toggleCursor(hide = false) {
    if (this.isNormalSite() || Tools.isFrequent("cursor", undefined, true)) return;
    const cls = "__hc";

    if (!hide) return Tools.querys(`.${cls}`).forEach((el) => Tools.delCls(el, cls));

    [...Tools.getParents(this.player, true, 3), ...Tools.getIFrames()].forEach((el) => {
      el?.blur(), Tools.addCls(el, cls), el?.dispatchEvent(new MouseEvent("mouseleave"));
    });
  },
  async setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      const isFullscreen = !!document.fullscreenElement;
      Tools.postMessage(window.top, { isFullscreen });
    });
  },
  async observeFullscreenChange() {
    Object.defineProperty(this, "isFullscreen", {
      get: () => observedValue.isFullscreen,
      set: (value) => {
        observedValue.isFullscreen = value;
        this.handleFullscreenChange(value);
      },
    });
  },
  handleFullscreenChange(isFullscreen) {
    // 全屏时移除输入框焦点（解决B站自动聚焦问题）
    isFullscreen && Tools.isInputable(document.activeElement) && document.activeElement.blur();

    // 如果是通过按`Esc`而不是`Enter`退出全屏模式时
    !isFullscreen && this.fsWrapper && this.dispatchShortcutKey(Keyboard.P);

    // 播放器右上角时间的显/隐
    this.changeTimeElementDisplay();
  },
  async observeWebFullscreenChange() {
    const handle = (event, { code, type } = event) => {
      if (type === "scroll") return Tools.scrollTop(this.fsWrapper.scrollY);
      if (this.isInputFocus(event) || ![Keyboard.Space, Keyboard.Left, Keyboard.Right].includes(code)) return;
      if (type === "keyup") return Tools.preventDefault(event); // 防止 keyup 事件触发
      Tools.preventDefault(event), this.dispatchShortcutKey(code, true);
    };
    Object.defineProperty(this, "fsWrapper", {
      get: () => observedValue.fsWrapper,
      set: (value) => {
        observedValue.fsWrapper = value;
        const method = value ? "addEventListener" : "removeEventListener";
        ["scroll", "keyup", "keydown"].forEach((type) => {
          try {
            window[method](type, handle, true);
          } catch {
            unsafeWindow[method](type, handle, true);
          }
        });
      },
    });
  },
};
