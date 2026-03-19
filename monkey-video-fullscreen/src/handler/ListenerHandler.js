import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import VideoEnhancer from "../lib/VideoEnhancer";

/**
 * 应用程序初始化
 */
export default {
  fsWrapper: null,
  isFullscreen: false,
  isNoVideo: () => !window.vMeta && !window.topWin,
  isMutedLoop: (video) => video?.muted && video?.loop,
  isExecuted: (key, ctx = window) => ctx[key] || !!((ctx[key] = true), false),
  init(isNonFirst = false) {
    this.host = location.host;
    this.setupVideoListeners();
    this.setupKeydownListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.docElement = document.documentElement;

    if (isNonFirst) return;
    this.setupDocumentObserver();
    this.setupShadowVideoListener();
    this.setupIgnoreChangeListener();
    this.observeWebFullscreenChange();
    VideoEnhancer.hookActiveVideo();
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

  // ====================⇓⇓⇓ 全屏状态变换时处理相关逻辑 ⇓⇓⇓====================
  setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      Tools.postMessage(window.top, { isFullscreen: !!document.fullscreenElement });
    });

    if (this.isExecuted("isDefined")) return;
    VideoEnhancer.defineProperty(this, "isFullscreen", {
      set: (value, setter) => (setter(value), this.handleFullscreenChange(value)),
    });
  },
  handleFullscreenChange(isFullscreen) {
    // 全屏时移除输入框焦点（解决B站自动聚焦问题）
    isFullscreen && Tools.isInputable(document.activeElement) && document.activeElement.blur();

    // 处理通过Esc键而非Enter键退出全屏模式的场景
    !isFullscreen && this.fsWrapper && this.dispatchShortcut(Consts.P);

    Tools.microTask(() => this.customFullscreenChangeHandle());
  },
  observeWebFullscreenChange() {
    VideoEnhancer.defineProperty(this, "fsWrapper", {
      set: (value, setter) => {
        (setter(value), Tools.microTask(() => this.customFullscreenChangeHandle()));
      },
    });
  },
  customFullscreenChangeHandle() {
    if (Tools.isThrottle("fsChange", Consts.HALF_SEC)) return;
    Tools.sleep(100).then(() => {
      const { width, height } = window.screen;
      const { topWin, player, fsWrapper } = this;
      const { offsetWidth, offsetHeight } = fsWrapper ?? player ?? {};

      const isWFs = offsetWidth === topWin.vw && offsetHeight >= topWin.vh;
      const isFs = offsetWidth === width && offsetHeight === height;
      const type = isFs ? "isFull" : isWFs ? "isWFull" : "default";

      const jsCode = Storage.FS_CHANGE_CODE.get(topWin.host);
      this.executeCodeSnippet(jsCode, type, player);
    });
  },
  codeSnippetCache: new Map(),
  executeCodeSnippet(jsCode, type, video) {
    try {
      if (!jsCode) return;
      const code = `(async () => { ${jsCode} })()`;
      const args = ["type", "App", "video", "Tools", "unsafeWindow"];
      const handler = this.codeSnippetCache.get(type) || this.codeSnippetCache.set(type, new Function(...args, code)).get(type);
      handler(type, App, video, Tools, unsafeWindow);
    } catch (e) {
      const unsafe = e.message.includes("unsafe-eval");
      unsafe ? this.injectCodeSnippet(jsCode, type, video) : console.error("JS代码片段执行出错：", e);
    }
  },
  injectCodeSnippet(jsCode, type, video) {
    const evt = `gm_code_inject_${type}`;
    const injectCode = `
      (() => {
        document.addEventListener('${evt}', (e) => {
          try {
            const { type, App, video, Tools, unsafeWindow } = e.detail;
            (async () => { ${jsCode} })();
          } catch (err) { console.error('动态代码执行出错:', err); }
        }, { once: true });
      })();
      `;

    Tools.query(`#${evt}`)?.remove();
    GM_addElement("script", { id: evt, textContent: injectCode, type: "text/javascript" });
    document.dispatchEvent(new CustomEvent(evt, { detail: { type, App, video, Tools, unsafeWindow } }));
  },
  // ====================⇑⇑⇑ 全屏状态变换时处理相关逻辑 ⇑⇑⇑====================

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
