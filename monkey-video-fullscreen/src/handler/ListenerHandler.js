import Tools from "../common/Tools";
import Consts from "../common/Consts";

/**
 * 应用程序初始化
 */
export default {
  noVideo: () => !window.videoInfo && !window.topWin,
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
  // ====================⇓⇓⇓ 全屏状态变换时处理相关逻辑 ⇓⇓⇓====================
  setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      Tools.postMessage(window.top, { isFullscreen: !!document.fullscreenElement });
    });
  },
  observeFullscreenChange() {
    Object.defineProperty(this, "isFullscreen", {
      get: () => this._isFullscreen ?? false,
      set: (value) => {
        this._isFullscreen = value;

        // 如果是通过按`Esc`而不是`Enter`退出全屏模式时
        !value && this.fsWrapper && this.dispatchShortcutKey(Consts.P);
      },
    });
  },
  // ====================⇑⇑⇑ 全屏状态变换时处理相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 侧边点击相关逻辑 ⇓⇓⇓====================
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
    if (container instanceof Element && this.lacksRelativePosition(container)) {
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
        Tools.microTask(() => this.dispatchShortcutKey(Consts.P, true));
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
    return sroot ? parentNode : this.findVideoParentContainer(parentNode, undefined, false);
  },
  lacksRelativePosition(element) {
    return Tools.getParents(element, true, 2).every((el) => el && getComputedStyle(el).position === "static");
  },
};
