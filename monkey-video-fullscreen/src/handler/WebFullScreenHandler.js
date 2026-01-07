import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 网页全屏逻辑处理
 * `@match`网站 通过点击自有图标的方式
 * 非`@match`网站 通过对视频容器父元素添加相关CSS的方式
 */
export default {
  toggleFullscreen() {
    if (!Tools.isTopWin() || Tools.isThrottle("toggleFull")) return;
    this.isFullscreen ? document.exitFullscreen() : this.getVideoHostContainer()?.requestFullscreen();
    if (this.isFullscreen || !this.fsWrapper) this.dispatchShortcutKey(Consts.P); // 全屏或非网页全屏模式下
  },
  toggleWebFullscreen(isTrusted) {
    if (this.noVideo() || Tools.isThrottle("toggleWeb")) return;
    if (this.isFullscreen && isTrusted) return document.fullscreenElement && document.exitFullscreen(); // 由全屏切换到网页全屏
    this.fsWrapper ? this.exitWebFullscreen() : this.enterWebFullscreen();
  },
  enterWebFullscreen() {
    // video的宿主容器元素
    const container = (this.fsWrapper = this.getVideoHostContainer());
    if (!container || container.matches(":is(html, body)")) return this.ensureWebFullscreen();

    container.scrollY = window.scrollY;
    const parents = Tools.getParents(container, true);
    container instanceof HTMLIFrameElement || parents.length < Storage.DETACH_THRESHOLD.get(location.host)
      ? parents.forEach((el) => {
          Tools.emitEvent("addStyle", { shadowRoot: el.getRootNode() });
          Tools.attr(el, Consts.webFull, true);
        })
      : this.detachForFullscreen();

    // 确保网页全屏成功
    if (!this.fsParent) this.ensureWebFullscreen();
  },
  detachForFullscreen() {
    if (this.fsParent) return;
    this.fsParent = Tools.getParent(this.fsWrapper);

    // 创建占位元素（保持原布局不塌陷）
    this.fsPlaceholder = document.createElement("div");
    Tools.cloneAttrs(this.fsWrapper, this.fsPlaceholder, ["id", "class", "style"]);

    // 替换并移动视频容器
    this.fsParent.replaceChild(this.fsPlaceholder, this.fsWrapper);
    document.body.insertAdjacentElement("beforeend", this.fsWrapper);

    this.fsWrapper.querySelector("video")?.play();
    Tools.attr(this.fsWrapper, Consts.webFull, true);
  },
  exitWebFullscreen() {
    if (!this.fsWrapper) return;
    const { scrollY } = this.fsWrapper;

    // 临时禁用平滑滚动：为了确保接下来的滚动操作是瞬间完成的（无动画）
    Tools.setStyle(document.documentElement, "scroll-behavior", "auto", "important");

    // 是脱离原结构式网页全屏时，将视频容器还原到它原来的DOM位置
    if (this.fsParent?.contains(this.fsPlaceholder)) this.fsParent?.replaceChild(this.fsWrapper, this.fsPlaceholder);
    Tools.querys(`[${Consts.webFull}]`).forEach((el) => Tools.attr(el, Consts.webFull));

    // 滚动到全屏前位置、恢复默认滚动效果
    requestAnimationFrame(() => (Tools.scrollTop(scrollY), Tools.setStyle(document.documentElement, "scroll-behavior")));

    // 清理相关变量
    this.videoParents.clear();
    this.fsPlaceholder = this.fsWrapper = this.fsParent = null;
  },
  getVideoHostContainer() {
    if (this.player) return this.getVideoContainer();

    // video所在的iframe
    const videoIFrame = this.getVideoIFrame();
    if (videoIFrame) return videoIFrame;

    // 与video中心点相交的iframe
    const ifrs = Tools.getIFrames();
    const { centerX, centerY } = this?.videoInfo ?? {};
    return ifrs.length <= 1 ? ifrs[0] : ifrs.find((el) => Tools.isVisible(el) && Tools.pointInElement(centerX, centerY, el));
  },
  getVideoIFrame() {
    if (!this?.videoInfo?.iframeSrc) return null;

    const { pathname, search } = new URL(this.videoInfo.iframeSrc);
    const decoded = decodeURI(search); // 先解码得到实际字符串
    const partial = decoded.slice(0, decoded.length * 0.8);
    return Tools.query(`iframe[src*="${pathname + partial}"]`) ?? Tools.query(`iframe[src*="${pathname}"]`);
  },
  getVideoContainer() {
    // 自定义网页全屏元素，支持多个选择器，返回第一个找到的元素
    const selector = Storage.CUSTOM_CONTAINER.get(this.topWin?.host)?.trim();
    const container = selector ? this.player.closest(selector) ?? Tools.query(selector) : null;
    return container ?? this.findVideoParentContainer(this.findControlBarContainer());
  },
  findControlBarContainer() {
    const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
    const selector = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"], [class*="progress"], [class*="volume"]`;

    let parent = Tools.getParent(this.player);
    while (parent && parent.offsetHeight <= this.player.offsetHeight) {
      if (Tools.query(selector, parent)) return parent;
      parent = Tools.getParent(parent);
    }

    return null;
  },
  videoParents: new Set(),
  findVideoParentContainer(container, maxLevel = 4, track = true) {
    container = container ?? Tools.getParent(this.player);
    if (!container.offsetHeight) container = Tools.getParent(container); // Youtube 存在这样的问题
    const { offsetWidth: cw, offsetHeight: ch } = container;
    if (track) this.videoParents.clear(); // 仅网页全屏时

    // 循环向上查找与初始元素宽高相等的父元素
    for (let parent = container, level = 0; parent && level < maxLevel; parent = Tools.getParent(parent), level++) {
      if (parent.offsetWidth === cw && parent.offsetHeight === ch) container = parent;
      if (this.hasExplicitlySize(parent)) return container;
      if (track) this.videoParents.add(parent);
    }

    return container;
  },
  hasExplicitlySize(element) {
    const style = element.style;
    const sizeRegex = /^\d+(\.\d+)?(px|em|rem)$/;
    return ["width", "height"].some((prop) => {
      const value = style?.getPropertyValue(prop);
      return value && sizeRegex.test(value);
    });
  },
  ensureWebFullscreen() {
    const { viewWidth, viewHeight } = this.topWin;
    const elements = [...this.videoParents].reverse();

    // 核心目的：确保视频父元素宽高与视窗完全匹配，保障网页全屏正常显示
    // 背景说明：当父元素因外联CSS设置了固定宽高值；当进入网页全屏后，父元素宽高未适应视窗，因此需要重新计算并修正元素宽高；
    // 如：https://www.toutiao.com/video/7579134807163060782、https://www.163.com/v/video/VO3QRCEH5.html
    for (const element of elements) {
      const { offsetWidth: width, offsetHeight: height } = this.player;
      if (width === viewWidth && height === viewHeight && element.offsetHeight === viewHeight) continue;
      Tools.attr(element, Consts.webFull, true);
    }
  },
};
