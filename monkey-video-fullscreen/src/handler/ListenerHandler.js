import Tools from "../common/Tools";
import Consts from "../common/Consts";

/**
 * 应用程序初始化
 */
export default {
  isMutedLoop: (video) => video?.muted && video?.loop,
  isNoVideo: () => !window.videoInfo && !window.topWin,
  init(isNonFirst = false) {
    this.docElement = document.documentElement;

    this.setupKeydownListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.setupVideoListeners();

    if (isNonFirst) return;
    this.setupDocumentObserver();
    this.setupIgnoreUrlsChangeListener();
    this.setupShadowVideoListeners();
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
      video && this.createEdgeClickElement(video);
    };

    document.addEventListener("mousemove", handle, { passive: true });
  },
  getVideoForCoord(clientX, clientY) {
    const getZIndex = (el) => Number(getComputedStyle(el).zIndex) || 0;
    const videos = Tools.querys("video").filter((v) => !this.isMutedLoop(v) && Tools.pointInElement(clientX, clientY, v));
    return videos.sort((a, b) => getZIndex(b) - getZIndex(a)).shift();
  },
  createEdgeClickElement(video) {
    const container = this.getEdgeClickContainer(video);

    // 父容器未发生变化，不更新位置
    if (video.lArea?.parentNode === container) return;

    // 避免元素定位异常
    if (container instanceof Element && this.lacksRelativePosition(container)) {
      Tools.setStyle(container, "position", "relative");
    }

    // 已创建过侧边元素，重新插入到父容器中
    Tools.querys(".video-edge-click", container).forEach((el) => el.remove());
    if (video.lArea) return container.prepend(video.lArea, video.rArea);

    // 复用元素创建逻辑
    const createEdge = (clas = "") => {
      const element = Object.assign(document.createElement("div"), { video, className: `video-edge-click ${clas}` });

      element.onclick = (e) => {
        Tools.preventDefault(e);
        const vid = e.target.video;
        if (this.player !== vid) (this.player = vid), this.setVideoInfo(vid);
        Tools.microTask(() => this.dispatchShortcut(Consts.P, true));
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
};
