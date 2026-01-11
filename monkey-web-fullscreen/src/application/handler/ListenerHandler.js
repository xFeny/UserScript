import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Keyboard from "../common/Keyboard";
import VideoEnhancer from "../VideoEnhancer";

/**
 * 应用程序初始化
 */
export default {
  fsWrapper: null,
  isFullscreen: false,
  noVideo: () => !window.videoInfo && !window.topWin,
  isBackgroundVideo: (video) => video?.muted && video?.loop,
  isObserved: (el) => el.hasAttribute("observed") || !!(el.setAttribute("observed", true), false),
  init(isNonFirst = false) {
    this.host = location.host;
    this.docElement = document.documentElement;

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
  setupVisibleListener() {
    window.addEventListener("visibilitychange", () => {
      if (this.noVideo() || Storage.IS_INVISIBLE_PAUSE.get()) return;

      const video = this.player;
      if (!video || video.ended || !Tools.isVisible(video)) return;
      document.hidden ? video.pause() : video.play();
    });
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
  // ====================⇓⇓⇓ 设置当前视频相关逻辑 ⇓⇓⇓====================
  setCurrentVideo(video) {
    if (!video || this.player === video || video.offsetWidth < 260 || this.isBackgroundVideo(video)) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // this.player 播放中

    this.player = video;
    this.setVideoInfo(video);
    this.observeVideoSrcChange(video);
  },
  setVideoInfo(video) {
    const videoInfo = { isLive: video.duration === Infinity };
    this.syncVideoToParentWin(videoInfo);
  },
  syncVideoToParentWin(videoInfo) {
    window.videoInfo = this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo: { ...videoInfo, iFrame: location.href } });
    Tools.microTask(() => (this.setupPickerEpisodeListener(), this.setupScriptMenuCommand()));
    this.watchVideoIFrameChange();
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
    if (this.isObserved(video)) return;

    const isFake = video.matches(Consts.FAKE_VIDEO);
    const handleChange = (v) => (delete this.topWin, this.setVideoInfo(v));
    VideoEnhancer.defineProperty(video, isFake ? "srcConfig" : "src", {
      set(value, setter) {
        setter(value), value && this === App.player && handleChange(this);
      },
    });
  },
  /**
   * 监听视频所在iframe的src属性变化
   * 当src发生变动时，自动退出网页全屏状态
   * 如：https://www.ttdm1.me
   */
  watchVideoIFrameChange() {
    const iFrame = this.getVideoIFrame();
    if (!iFrame || this.isObserved(iFrame)) return;

    new MutationObserver(() =>
      this.isFullscreen ? this.toggleFullscreen() : this.fsWrapper && this.exitWebFullscreen()
    ).observe(iFrame, { attributes: true, attributeFilter: ["src"] });
    iFrame.focus(); // 自动聚焦：单层嵌套场景下，「启用 空格◀️▶️ 控制」时，能切换视频播放状态
  },
  // ====================⇑⇑⇑ 设置当前视频相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 全屏状态变换时处理相关逻辑 ⇓⇓⇓====================
  setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      Tools.postMessage(window.top, { isFullscreen: !!document.fullscreenElement });
    });
  },
  observeFullscreenChange() {
    VideoEnhancer.defineProperty(this, "isFullscreen", {
      set: (value, setter) => (setter(value), this.handleFullscreenChange(value)),
    });
  },
  handleFullscreenChange(isFullscreen) {
    // 全屏时移除输入框焦点（解决B站自动聚焦问题）
    isFullscreen && Tools.isInputable(document.activeElement) && document.activeElement.blur();

    // 如果是通过按`Esc`而不是`Enter`退出全屏模式时
    !isFullscreen && this.fsWrapper && this.dispatchShortcut(Keyboard.P);

    // 播放器右上角时间的显/隐
    this.changeTimeElementDisplay();
  },
  observeWebFullscreenChange() {
    const handle = (event, { code, type } = event) => {
      if (type === "scroll") return Tools.scrollTop(this.fsWrapper.scrollY);
      if (this.isInputFocus(event) || ![Keyboard.Space, Keyboard.Left, Keyboard.Right].includes(code)) return;
      Tools.preventDefault(event), Object.is(type, "keydown") && this.dispatchShortcut(code, { bypass: true });
    };

    VideoEnhancer.defineProperty(this, "fsWrapper", {
      set(value, setter) {
        const method = setter(value) ? "addEventListener" : "removeEventListener";
        ["scroll", "keyup", "keydown"].forEach((type) => unsafeWindow[method](type, handle, true));
      },
    });
  },
  // ====================⇑⇑⇑ 全屏状态变换时处理相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 鼠标移动监听相关逻辑 ⇓⇓⇓====================
  setupMouseMoveListener() {
    let timer = null;
    const handle = ({ type, clientX, clientY }) => {
      if (Tools.isThrottle(type)) return;

      // 根据坐标获取视频元素，并创建侧边元素
      this.createEdgeClickElement(this.getVideoForCoord(clientX, clientY));

      // 有视频信息时才切换鼠标光标的显隐
      if (this.noVideo()) return;
      clearTimeout(timer), this.toggleCursor();
      timer = setTimeout(() => this.toggleCursor(true), Consts.TWO_SEC);
    };

    document.addEventListener("mousemove", handle, { passive: true });
  },
  toggleCursor(hide = false, cls = "__hc") {
    if (!hide) return Tools.querys(`.${cls}`).forEach((el) => Tools.delCls(el, cls));

    const elements = [...Tools.getParents(this.player, true, 3), this.getVideoIFrame()];
    elements.forEach((el) => (Tools.addCls(el, cls), Tools.fireMouseEvt(el, "mouseleave")));
  },
  // ====================⇓⇓⇓ 侧边点击相关逻辑 ⇓⇓⇓====================
  getVideoForCoord(clientX, clientY) {
    if (!Storage.ENABLE_EDGE_CLICK.get()) return;
    return Tools.querys("video").find((video) => Tools.pointInElement(clientX, clientY, video));
  },
  createEdgeClickElement(video) {
    if (!video || !Storage.ENABLE_EDGE_CLICK.get()) return;

    const container = this.getEdgeClickContainer(video);

    // 父容器未发生变化，不更新位置
    if (video.lArea?.parentNode === container) return;

    // 避免元素定位异常
    if (container instanceof Element && this.lacksRelativePosition(container)) {
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
        Tools.microTask(() => this.dispatchShortcut(Keyboard.P, { isTrusted: true }));
      };

      return element;
    };

    // 解构赋值批量创建边缘元素
    [video.lArea, video.rArea] = [createEdge(), createEdge("right")];
    container.prepend(video.lArea, video.rArea);
  },
  getEdgeClickContainer(video) {
    if (this.fsWrapper) return video.closest(`[${Consts.webFull}]`) ?? this.fsWrapper;

    const parentNode = video.parentNode;
    const sroot = video.getRootNode() instanceof ShadowRoot;
    return sroot ? parentNode : this.findVideoParentContainer(parentNode, undefined, false);
  },
  lacksRelativePosition(element) {
    return Tools.getParents(element, true, 2).every((el) => el && getComputedStyle(el).position === "static");
  },
  removeEdgeClickElements() {
    Tools.querys(".video-edge-click").forEach((el) => (el.remove(), delete el.video.lArea, delete el.video.rArea));
  },
  // ====================⇑⇑⇑ 侧边点击相关逻辑 ⇑⇑⇑====================
};
