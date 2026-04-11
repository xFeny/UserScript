import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Store from "../common/Store";
import VideoEnhancer from "../VideoEnhancer";
import HotKey from "../common/HotKey";

// 只在开发环境下执行，打包时会移除该代码
if (import.meta.env.DEV) Tools.isTopWin() && window.addEventListener("resize", () => App.sendTopWinInfo());

/**
 * 应用程序初始化
 */
export default {
  player: null,
  fsWrapper: null,
  isFullscreen: false,
  isNoVideo: () => !window.vMeta && !window.topWin,
  isMutedLoop: (video) => video?.muted && video?.loop,
  init(isNonFirst = false) {
    this.host = location.host;
    this.setupVideoListeners();
    this.setupKeydownListener();
    this.setupVisibleListener();
    this.setupMouseMoveListener();
    this.setupFullscreenListener();
    this.docEle = document.documentElement;

    if (isNonFirst) return;
    this.setupDocumentObserver();
    this.setupLoadEventListener();
    this.setupShadowVideoListener();
    this.setupIgnoreChangeListener();
    this.watchWebFullscreenChange();
    VideoEnhancer.hookActiveVideo();
  },
  setupVisibleListener() {
    window.addEventListener("visibilitychange", () => {
      const video = this.player;
      if (!video || video.ended || Store.INVIS_PAUSE.get()) return;
      document.hidden ? video.pause() : video.play();
    });
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
  // ====================⇓⇓⇓ 设置当前视频相关逻辑 ⇓⇓⇓====================
  setCurrentVideo(video) {
    if (!video || this.player === video || video.offsetWidth < 260) return;
    if (this.player && !this.player.paused && !isNaN(this.player.duration)) return; // this.player 播放中

    this.setPlayer(video);
    this.watchVideoSrc(video);
  },
  setPlayer(video) {
    this.player = video;
    const vMeta = this.vMeta ?? { vw: innerWidth, vh: innerHeight };
    this.syncMetaToParentWin(vMeta);
  },
  syncMetaToParentWin(vMeta) {
    window.vMeta = this.vMeta = { ...vMeta, timestamp: Date.now() };
    if (!Tools.isTopWin()) return Tools.postMessage(unsafeWindow.parent, { vMeta: { ...vMeta, iFrame: location.href } });
    Tools.microTask(() => (this.initMenuCmds(), this.setupPickerListener()));
    this.sendTopWinInfo();
  },
  sendTopWinInfo() {
    // 向iframe传递顶级窗口信息
    const { host, href: url } = location;
    const { innerWidth: vw, innerHeight: vh } = window;
    const topWin = { vw, vh, url, host, urlHash: Tools.hashCode(url) };
    window.topWin = this.topWin = topWin;
    this.sendToVideoIFrame({ topWin });
  },
  sendToVideoIFrame(data) {
    const vFrame = this.getVideoIFrame();
    Tools.postMessage(vFrame?.contentWindow, data);
    if (vFrame) this.observeIFrameChange(vFrame);
  },
  watchVideoSrc(video) {
    if (Tools.isExecuted("observed", video)) return;

    const isFake = video.matches(Consts.FAKE_VIDEO);
    const onChange = (v) => (delete this.topWin, this.setPlayer(v));
    VideoEnhancer.defineProperty(video, isFake ? "srcConfig" : "src", {
      set(value, setter) {
        (setter(value), value && this === App.player && onChange(this));
      },
    });
  },
  /**
   * 核心功能：
   * 1. 观察iframe的src属性变化，自动退出(网页)全屏，如：https://www.ttdm6.me 下集切换
   * 2. 自动聚焦iframe，使空格能控制视频播放
   */
  observeIFrameChange(iFrame) {
    if (!iFrame || Tools.isExecuted("observed", iFrame)) return;

    // src属性发生变化，自动退出(网页)全屏
    const observer = new MutationObserver(() => document.exitFullscreen().catch(() => this.exitWebFullscreen()));
    observer.observe(iFrame, { attributes: true, attributeFilter: ["src"] });
    if (this.isOverrideKey()) iFrame.focus(); // 使空格能控制视频播放
  },
  // ====================⇑⇑⇑ 设置当前视频相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 全屏状态变换时处理相关逻辑 ⇓⇓⇓====================
  setupFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
      Tools.postMessage(window.top, { isFullscreen: !!document.fullscreenElement });
    });

    if (Tools.isExecuted("fsDoneHook")) return;
    VideoEnhancer.defineProperty(this, "isFullscreen", {
      set: (value, setter) => (setter(value), this.onFullChange(value)),
    });
  },
  onFullChange(isFull) {
    // 全屏时移除输入框焦点（解决B站自动聚焦问题）
    isFull && Tools.isInputable(document.activeElement) && document.activeElement.blur();

    // 默认 <=> 全屏、 全屏 => 网页全屏
    if (!this.isGMatch() && !(isFull && this.fsWrapper)) this.toggleWebFullscreen();

    // 执行自定义的代码片段
    Tools.microTask(() => this.runFsChangeCode());

    // 播放器右上角时间的显/隐
    this.changeTimeDisplay();
  },
  watchWebFullscreenChange() {
    const handle = () => Tools.scrollTop(this.fsWrapper.scrollY);
    VideoEnhancer.defineProperty(this, "fsWrapper", {
      set: (value, setter) => {
        const method = setter(value) ? "addEventListener" : "removeEventListener";
        Tools.microTask(() => this.runFsChangeCode());
        unsafeWindow[method]("scroll", handle, true);
      },
    });
  },
  runFsChangeCode() {
    // 连续触发只执行最后一次
    clearTimeout(this.e9x_fsCode);
    this.e9x_fsCode = setTimeout(() => {
      const jsCode = Store.FS_CODE.get(this.host);
      this.executeCodeSnippet(jsCode, this.getFsMode(), this.player);
    }, 10);
  },
  /**
   * 获取页面模式
   * @param {Number} tol 误差值
   * @returns isFull-全屏、isWFull-网页全屏、default-默认
   */
  getFsMode(tol = 5) {
    const { width, height } = window.screen;
    const { topWin, player, fsWrapper } = this;
    const { offsetWidth: ew = 0, offsetHeight: eh = 0 } = this.isGMatch() ? player : fsWrapper || {};

    const isWFs = Math.abs(ew - topWin.vw) < tol && Math.abs(eh - topWin.vh) < tol;
    const isFs = Math.abs(ew - width) < tol && Math.abs(eh - height) < tol;
    return isFs ? "isFull" : isWFs ? "isWFull" : "default";
  },
  // ====================⇑⇑⇑ 全屏状态变换时处理相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 鼠标移动监听相关逻辑 ⇓⇓⇓====================
  setupMouseMoveListener() {
    const handle = ({ type, target, clientX, clientY }) => {
      if (Tools.isThrottle(type)) return;
      const video = this.getVideoForCoord(clientX, clientY);
      if (video) (this.createEdgeElement(video), this.toggleCursor(target));
    };

    document.addEventListener("mousemove", handle, { passive: true });
  },
  toggleCursor(target, cls = "__hc") {
    clearTimeout(this._cursorTid);
    Tools.querys(`.${cls}`).forEach((el) => Tools.delCls(el, cls));

    this._cursorTid = setTimeout(() => {
      const eles = [target, ...Tools.getParents(this.player, 2), ...Tools.querys(".__v_edge")];
      eles.forEach((el) => (Tools.addCls(el, cls), Tools.fireMouseEvt(el, "mouseleave")));
    }, Consts.TWO_SEC);
  },
  // ====================⇓⇓⇓ 侧边点击相关逻辑 ⇓⇓⇓====================
  getVideoForCoord(x, y) {
    if (Tools.pointInElement(x, y, this.player)) return this.player;

    const getZIndex = (el) => Number(getComputedStyle(el).zIndex) || 0;
    const videos = Tools.querys("video").filter((v) => Tools.pointInElement(x, y, v));
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
    Tools.querys(".__v_edge", container).forEach((el) => el.remove());
    if (video.lArea) return container.prepend(video.lArea, video.rArea);

    // 复用元素创建逻辑
    const createEdge = (cls = "") => {
      const element = Tools.newEle("div", { video, className: `__v_edge ${cls}` });

      element.onclick = (e) => {
        Tools.preventEvent(e);
        this.setPlayer(e.target.video);
        Tools.sleep(5).then(() => this.dispatchShortcut(HotKey.P, true));
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
  // ====================⇑⇑⇑ 侧边点击相关逻辑 ⇑⇑⇑====================
};
