import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Keyboard from "../common/Keyboard";

// 要 Object.defineProperty 的值
const observedValue = { isFullscreen: false, fsWrapper: null };

/**
 * 应用程序初始化
 */
export default {
  noVideo: () => !window?.videoInfo,
  isBackgroundVideo: (video) => video?.muted && video?.loop,
  getVideo: () => Tools.querys(":is(video, fake-video):not([loop])").find(Tools.isVisible),
  init(isNonFirst = false) {
    this.body = document.body;
    this.setupKeydownListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.setupVideoListeners();

    if (isNonFirst) return;
    this.setupDocumentObserver();
    this.observeFullscreenChange();
    this.observeWebFullscreenChange();
    this.setupIgnoreUrlsChangeListener();
    this.setupShadowVideoListeners();
  },
  /**
   * 解决 document.write 导致监听失效问题
   * 网站：https://nkvod.me、https://www.lkvod.com
   */
  setupDocumentObserver() {
    new MutationObserver(() => {
      if (this.body === document.body) return;
      this.init(true), document.head.append(gmStyle.cloneNode(true));
    }).observe(document, { childList: true });
  },
  setCurrentVideo(video) {
    if (!video || this.player === video || video.offsetWidth < 240 || this.isBackgroundVideo(video)) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // this.player 播放中

    this.player = video;
    this.setVideoInfo(video);
  },
  setVideoInfo(video) {
    const videoInfo = { ...Tools.getCenterPoint(video), isLive: video.duration === Infinity };
    this.setParentWinVideoInfo(videoInfo);
  },
  setParentWinVideoInfo(videoInfo) {
    window.videoInfo = this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo: { ...videoInfo, iframeSrc: location.href } });
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
  setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      const isFullscreen = !!document.fullscreenElement;
      Tools.postMessage(window.top, { isFullscreen });
    });
  },
  observeFullscreenChange() {
    Object.defineProperty(this, "isFullscreen", {
      get: () => observedValue.isFullscreen,
      set: (value) => {
        observedValue.isFullscreen = value;

        // 如果是通过按`Esc`而不是`Enter`退出全屏模式时
        !value && this.fsWrapper && this.dispatchShortcutKey(Keyboard.P);
      },
    });
  },
  observeWebFullscreenChange() {
    const handle = () => Tools.scrollTop(this.fsWrapper.scrollY);
    Object.defineProperty(this, "fsWrapper", {
      get: () => observedValue.fsWrapper,
      set: (value) => {
        observedValue.fsWrapper = value;
        const method = value ? "addEventListener" : "removeEventListener";
        try {
          window[method]("scroll", handle, true);
        } catch {
          unsafeWindow[method]("scroll", handle, true);
        }
      },
    });
  },
  setupMouseMoveListener() {
    const handle = ({ type, clientX, clientY }) => {
      if (Tools.isThrottle(type, 300)) return;
      const video = this.getVideoForCoordinate(clientX, clientY);
      video && this.createEdgeClickElement(video);
    };

    document.addEventListener("mousemove", handle, { passive: true });
  },
  getVideoForCoordinate(clientX, clientY) {
    return Tools.querys("video").find((video) => Tools.pointInElement(clientX, clientY, video));
  },
  createEdgeClickElement(video) {
    const container = this.getEdgeClickContainer(video);

    // 父容器未发生变化，不更新位置
    if (video.lArea?.parentNode === container) return;

    // 避免元素定位异常
    if (container instanceof Element && getComputedStyle(container).position === "static") {
      Tools.setStyle(container, "position", "relative");
    }

    // 已创建过，复用元素
    if (video.lArea) return container.prepend(video.lArea, video.rArea);

    // 复用元素创建逻辑
    const createEdge = (clas = "") => {
      const element = Object.assign(document.createElement("div"), { video, className: `video-edge-click ${clas}` });

      element.onclick = (e) => {
        Tools.preventDefault(e);
        const vid = e.target.video;
        if (this.player !== vid) (this.player = vid), this.setVideoInfo(vid);
        Tools.microTask(() => this.dispatchShortcutKey(Keyboard.P, { isTrusted: true }));
      };

      return element;
    };

    // 解构赋值批量创建边缘元素
    [video.lArea, video.rArea] = [createEdge(), createEdge("right")];
    container.prepend(video.lArea, video.rArea);
  },
  getEdgeClickContainer(video) {
    if (this.fsWrapper) return video.closest(`[part="${Consts.webFull}"]`);

    const parentNode = video.parentNode;
    const sroot = video.getRootNode() instanceof ShadowRoot;
    return sroot ? parentNode : this.findVideoParentContainer(parentNode, 4, false);
  },
};
