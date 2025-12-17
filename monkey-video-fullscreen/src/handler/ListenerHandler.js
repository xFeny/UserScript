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
    this.setupVideoDetector();
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
    this.setupDoubleClickListener();
  },
  setupDocumentObserver() {
    // 示例网站：https://nkvod.me、https://www.lkvod.com
    new MutationObserver(() => {
      if (this.docElement === document.documentElement) return;
      this.init(true), document.head.append(gmStyle.cloneNode(true));
    }).observe(document, { childList: true });
  },
  setupVideoDetector() {
    this.docElement = document.documentElement;
    this.obsDoc?.disconnect(), clearTimeout(this.obsTimer);
    this.obsDoc = Tools.createObserver(document, () => {
      if (Tools.isThrottle("detector", 100)) return;
      if (this.topWin) return this.obsDoc?.disconnect();

      const video = this.getVideo();
      if (video?.offsetWidth) this.setCurrentVideo(video);
    });
    this.obsTimer = setTimeout(() => this.obsDoc?.disconnect(), Consts.ONE_SEC * 5);
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
    document.addEventListener("mousemove", ({ type, isTrusted, clientX, clientY }) => {
      if (!isTrusted || Tools.isThrottle(type, 100)) return;

      // 获取鼠标光标位置是否有视频元素
      const elements = document.elementsFromPoint(clientX, clientY);
      const video = elements.find((el) => el.matches("video"));
      if (video) this.setEdgeDoubleClick(video);
    });
  },
  setupDoubleClickListener() {
    document.addEventListener("dblclick", (event, { target } = event) => {
      if (!target.classList.contains("edge-dblclick")) return;

      delete this.player;
      this.setCurrentVideo(target.video);
      Tools.sleep(30).then(() => this.dispatchShortcutKey(Keyboard.P));
    });
  },
  setEdgeDoubleClick(video) {
    const vidWrap = this.findVideoParentContainer(video, 5, false);
    if (video.leftEdge) return vidWrap.prepend(video.leftEdge, video.rightEdge);

    const createEl = () => {
      const el = document.createElement("div");
      el.className = "edge-dblclick";
      el.video = video;
      return el;
    };

    // 创建左右边缘元素并挂载到video对象
    video.leftEdge = createEl();
    video.rightEdge = createEl();

    // 插入到容器中
    vidWrap.prepend(video.leftEdge, video.rightEdge);
  },
};
