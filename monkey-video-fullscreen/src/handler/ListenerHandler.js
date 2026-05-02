import Tools from "../common/Tools";
import Consts from "../common/Consts";
import VideoEnhancer from "../lib/VideoEnhancer";

/**
 * 应用程序初始化
 */
export default {
  isNoVideo: () => !window.vMeta && !window.topWin,
  isMutedLoop: (video) => video?.muted && video?.loop,
  init(isNonFirst = false) {
    this.host = location.host;
    this.setupVideoListeners();
    this.setupKeydownListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.docEle = document.documentElement;

    if (isNonFirst) return;
    this.setupDocumentObserver();
    this.setupShadowVideoListener();
    this.setupIgnoreChangeListener();
    VideoEnhancer.hookActiveVideo();
  },
  /**
   * 解决 document.write 导致监听失效问题
   * 网站：https://nkvod.me、https://www.lkvod.com
   */
  setupDocumentObserver() {
    new MutationObserver(() => {
      if (this.docEle === document.documentElement) return;
      (this.init(true), document.head.append(gmStyle.cloneNode(true)));
    }).observe(document, { childList: true });
  },
  setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      Tools.postMessage(window.top, { isFullscreen: !!document.fullscreenElement });
    });

    if (Tools.isExecuted("fsDoneHook")) return;
    Object.defineProperty(this, "isFullscreen", {
      get: () => this._isFullscreen,
      set: (value) => {
        this._isFullscreen = value;

        // 默认 <=> 全屏、 全屏 => 网页全屏
        if (!(value && this.fsWrapper)) this.toggleWebFullscreen();
        Tools.microTask(() => this.runFsChangeCode());
      },
    });
  },
  // ====================⇓⇓⇓ 侧边点击相关逻辑 ⇓⇓⇓====================
  setupMouseMoveListener() {
    const handle = ({ type, clientX, clientY }) => {
      if (Tools.isThrottle(type)) return;
      const video = this.getVideoForCoord(clientX, clientY);
      video && this.createEdgeElement(video);
    };

    document.addEventListener("mousemove", handle, { passive: true });
  },
  getVideoForCoord(x, y) {
    if (Tools.pointInElement(x, y, this.player)) return this.player;

    const getZIndex = (el) => Number(getComputedStyle(el).zIndex) || 0;
    const videos = Tools.querys("video").filter((v) => Tools.pointInElement(x, y, v));
    return videos.sort((a, b) => getZIndex(b) - getZIndex(a)).shift();
  },
  createEdgeElement(video) {
    if (document.readyState === "loading" || video.readyState < 2) return;
    const container = this.getEdgeContainer(video);

    // 父容器未发生变化，不更新位置
    if (video._vEdge?.[0]?.parentNode === container) return;

    // 避免元素定位异常
    if (this.lacksRelativePosition(container)) Tools.setStyle(container, "position", "relative");

    // 已创建过侧边元素，重新插入到父容器中
    if (video._vEdge) return container.prepend(...video._vEdge);

    // 复用元素创建逻辑
    const createEdge = (cls = "") => {
      const element = Tools.newEle("div", { video, className: `__v_edge ${cls}` });

      element.onclick = (e) => {
        Tools.preventDefault(e);
        this.setPlayer(e.target.video);
        Tools.sleep(5).then(() => this.dispatchShortcut(Consts.P, true));
      };

      return element;
    };

    // 创建边缘元素
    video._vEdge = [createEdge(), createEdge("right")];
    container.prepend(...video._vEdge);
  },
  getEdgeContainer(video) {
    if (this.fsWrapper) return video.closest(`[${Consts.webFull}]`) ?? this.fsWrapper;

    const parent = video.parentNode;
    const sroot = video.getRootNode() instanceof ShadowRoot;
    return sroot ? parent : this.findVideoContainer(parent, undefined, false);
  },
  lacksRelativePosition(el) {
    if (!(el instanceof Element)) return false;
    return Tools.getParents(el, 2).every((e) => e && getComputedStyle(e).position === "static");
  },
};
