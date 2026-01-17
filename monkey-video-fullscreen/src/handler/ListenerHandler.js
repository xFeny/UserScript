import Tools from "../common/Tools";
import Consts from "../common/Consts";

/**
 * 应用程序初始化
 */
export default {
  isMutedLoop: (video) => video?.muted && video?.loop,
  isNoVideo: () => !window.vMeta && !window.topWin,
  init(isNonFirst = false) {
    this.docElement = document.documentElement;

    this.setupKeydownListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.setupVideoListeners();

    if (isNonFirst) return;
    this.setupDocumentObserver();
    this.setupIgnoreChangeListener();
    this.setupShadowVideoListener();
  },
  /**
   * 解决 document.write 导致监听失效问题
   * 网站：https://nkvod.me、https://www.lkvod.com
   */
  setupDocumentObserver() {
    new MutationObserver(() => {
      if (this.docElement === document.documentElement) return;
      (this.init(true), document.head.append(gmStyle.cloneNode(true)));
    }).observe(document, { childList: true });
  },
  setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      const isFullscreen = !!document.fullscreenElement;
      !isFullscreen && this.fsWrapper && this.dispatchShortcut(Consts.P); // 按`Esc`退出全屏模式时
      Tools.postMessage(window.top, { isFullscreen });
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
    const videos = Tools.querys("video").filter((v) => !this.isMutedLoop(v) && Tools.pointInElement(x, y, v));
    return videos.sort((a, b) => getZIndex(b) - getZIndex(a)).shift();
  },
  createEdgeElement(video) {
    const container = this.getEdgeContainer(video);

    // 父容器未发生变化，不更新位置
    if (video.lArea?.parentNode === container) return;

    // 避免元素定位异常
    if (container instanceof Element && this.lacksRelativePosition(container)) {
      Tools.setStyle(container, "position", "relative");
    }

    // 已创建过侧边元素，重新插入到父容器中
    Tools.querys(".__edgeClick", container).forEach((el) => el.remove());
    if (video.lArea) return container.prepend(video.lArea, video.rArea);

    // 复用元素创建逻辑
    const createEdge = (cls = "") => {
      const element = Tools.createElement("div", { video, className: `__edgeClick ${cls}` });

      element.onclick = (e) => {
        Tools.preventDefault(e);
        this.setPlayer(e.target.video);
        Tools.sleep(5).then(() => this.dispatchShortcut(Consts.P, true));
      };

      return element;
    };

    // 解构赋值批量创建边缘元素
    [video.lArea, video.rArea] = [createEdge(), createEdge("right")];
    container.prepend(video.lArea, video.rArea);
  },
  getEdgeContainer(video) {
    if (this.fsWrapper) return video.closest(`[${Consts.webFull}]`) ?? this.fsWrapper;

    const parent = video.parentNode;
    const sroot = video.getRootNode() instanceof ShadowRoot;
    return sroot ? parent : this.findVideoContainer(parent, undefined, false);
  },
  lacksRelativePosition(el) {
    return Tools.getParents(el, 2).every((e) => e && getComputedStyle(e).position === "static");
  },
};
