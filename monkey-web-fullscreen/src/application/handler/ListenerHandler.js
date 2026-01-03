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
  noVideo: () => !window.videoInfo,
  isBackgroundVideo: (video) => video?.muted && video?.loop,
  getVideo: () => Tools.querys(":is(video, fake-video):not([loop])").find(Tools.isVisible),
  init(isNonFirst = false) {
    this.host = location.host;
    this.setupVideoDetector();
    this.setupKeydownListener();
    this.setupVisibleListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.setupVideoListeners();

    if (isNonFirst) return;
    this.setupDocumentObserver();
    this.observeFullscreenChange();
    this.observeWebFullscreenChange();
    this.setupIgnoreUrlsChangeListener();
    this.setupShadowVideoListeners();
    this.setupLoadEventListener();
  },
  /**
   * 解决 document.write 导致监听失效问题
   * 网站：https://nkvod.me、https://www.lkvod.com
   */
  setupDocumentObserver() {
    new MutationObserver(() => {
      if (this.docElement === document.documentElement) return;
      this.init(true), document.head.append(gmStyle.cloneNode(true));
    }).observe(document, { childList: true });
  },
  setupVisibleListener() {
    window.addEventListener("visibilitychange", () => {
      if (this.noVideo() || Storage.IS_INVISIBLE_PAUSE.get()) return;

      const video = this.player ?? this.getVideo();
      if (!video || video.ended || !Tools.isVisible(video)) return;
      document.hidden ? video.pause() : video.play();
    });
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
    if (!video || this.player === video || video.offsetWidth < 260 || this.isBackgroundVideo(video)) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // this.player 播放中

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
  setupMouseMoveListener() {
    let timer = null;
    const handle = ({ type, clientX, clientY }) => {
      if (Tools.isThrottle(type, 300)) return;

      // 有视频信息时才切换鼠标光标的显隐
      if (!this.noVideo()) {
        clearTimeout(timer), this.toggleCursor();
        timer = setTimeout(() => this.toggleCursor(true), Consts.TWO_SEC);
      }

      // 是否创建侧边双击网页全屏元素
      if (!Storage.ENABLE_EDGE_CLICK.get()) return;
      const video = this.getVideoForCoordinate(clientX, clientY);
      video && this.createEdgeClickElement(video);
    };

    document.addEventListener("mousemove", handle, { passive: true });
  },
  toggleCursor(hide = false, cls = "__hc") {
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
  observeWebFullscreenChange() {
    const handle = (event, { code, type } = event) => {
      if (type === "scroll") return Tools.scrollTop(this.fsWrapper.scrollY);
      if (this.isInputFocus(event) || ![Keyboard.Space, Keyboard.Left, Keyboard.Right].includes(code)) return;
      Tools.preventDefault(event), Object.is(type, "keydown") && this.dispatchShortcutKey(code, { bypass: true });
    };
    Object.defineProperty(this, "fsWrapper", {
      get: () => observedValue.fsWrapper,
      set: (value) => {
        observedValue.fsWrapper = value;
        const method = value ? "addEventListener" : "removeEventListener";
        ["scroll", "keyup", "keydown"].forEach((type) => window[method](type, handle, true));
      },
    });
  },
  getVideoForCoordinate(clientX, clientY) {
    return Tools.querys("video").find((video) => Tools.pointInElement(clientX, clientY, video));
  },
  createEdgeClickElement(video) {
    if (!Storage.ENABLE_EDGE_CLICK.get()) return;

    const container = this.getEdgeClickContainer(video);

    // 父容器未发生变化，不更新位置
    if (video.lArea?.parentNode === container) return;

    // 避免元素定位异常
    if (container instanceof Element && getComputedStyle(container).position === "static") {
      Tools.setStyle(container, "position", "relative");
    }

    // 已创建过侧边元素，重新插入到父容器中
    if (video.lArea) return container.prepend(video.lArea, video.rArea);

    // 复用元素创建逻辑
    const createEdge = (clas = "") => {
      const element = Tools.createElement("div", { video, className: `video-edge-click ${clas}` });

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
    if (this.fsWrapper) return video.closest(`[part="${Consts.webFull}"]`) ?? this.fsWrapper;

    const parentNode = video.parentNode;
    const sroot = video.getRootNode() instanceof ShadowRoot;
    return sroot ? parentNode : this.findVideoParentContainer(parentNode, 4, false);
  },
  removeEdgeClickElements() {
    Tools.querys(".video-edge-click").forEach((el) => (el.remove(), delete el.video.lArea, delete el.video.rArea));
  },
};
