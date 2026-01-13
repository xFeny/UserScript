import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Keyboard from "../common/Keyboard";

/**
 * 网页全屏逻辑处理
 * `@match`网站 通过点击自有图标的方式
 * 非`@match`网站 通过对视频容器父元素添加相关CSS的方式
 */
export default {
  triggerIconElement(name) {
    if (Tools.isThrottle("icon")) return;
    if (!Site.isBiliLive()) return Tools.query(Site.getIcons()?.[name])?.click();
    const index = Object.values(Site.icons).indexOf(name);
    this.getLiveIcons()?.[index]?.click();
  },
  /**
   * 获取B站直播播放器控制栏右侧的功能图标列表
   * @description 图标从右到左排序：全屏、网页全屏、弹幕设置、弹幕开关、小窗模式（下标[0]为全屏图标）
   * @returns {NodeList} 图标元素的节点列表，按「全屏→网页全屏→弹幕设置→弹幕开关→小窗模式」顺序排列
   */
  getLiveIcons() {
    Tools.emitMousemove(this.player);
    return Tools.querys(".right-area .icon");
  },
  toggleFullscreen() {
    if (!Tools.isTopWin() || Tools.isThrottle("toggleFull")) return;
    if (Site.isGmMatch() && !Site.isBiliLive()) return this.triggerIconElement(Site.icons.full);
    this.isFullscreen ? document.exitFullscreen() : this.getVideoHostContainer()?.requestFullscreen();
    if (this.isFullscreen || !this.fsWrapper) this.dispatchShortcut(Keyboard.P); // 全屏或非网页全屏模式下
  },
  toggleWebFullscreen(isTrusted) {
    if (this.isNoVideo() || Tools.isThrottle("toggleWeb")) return;
    if (Site.isGmMatch() && !Site.isBiliLive()) return this.triggerIconElement(Site.icons.webFull);
    if (this.isFullscreen && isTrusted) return document.fullscreenElement && document.exitFullscreen(); // 由全屏切换到网页全屏
    this.fsWrapper ? this.exitWebFullscreen() : this.enterWebFullscreen();
  },
  /**
   * 进入网页全屏
   * 若容器层级超过阈值，容器“脱离”原DOM结构
   */
  enterWebFullscreen() {
    // video的宿主容器元素
    const container = (this.fsWrapper = this.getVideoHostContainer());
    if (!container || container.matches(":is(html, body)")) return this.ensureWebFullscreen();

    container.scrollY = window.scrollY;
    const parents = Tools.getParents(container, true);
    container instanceof HTMLIFrameElement || parents.length < Storage.DETACH_THRESHOLD.get(this.host)
      ? parents.forEach((el) => {
          Tools.emitEvent("addStyle", { shadowRoot: el.getRootNode() });
          Tools.attr(el, Consts.webFull, true);
        })
      : this.detachForFullscreen();

    // 确保网页全屏成功
    this.ensureWebFullscreen();
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
    Tools.setStyle(this.docElement, "scroll-behavior", "auto", "important");

    // 是脱离原结构式网页全屏时，将视频容器还原到它原来的DOM位置
    if (this.fsParent?.contains(this.fsPlaceholder)) this.fsParent?.replaceChild(this.fsWrapper, this.fsPlaceholder);
    Tools.querys(`[${Consts.webFull}]`).forEach((el) => Tools.attr(el, Consts.webFull));

    // 滚动到全屏前位置、恢复默认滚动效果
    requestAnimationFrame(() => (Tools.scrollTop(scrollY), Tools.setStyle(this.docElement, "scroll-behavior")));

    // 清理相关变量
    this.videoParents.clear();
    this.fsPlaceholder = this.fsWrapper = this.fsParent = null;
  },
  getVideoHostContainer() {
    if (this.player) return this.getVideoContainer();
    return this.getVideoIFrame() ?? Tools.getIFrames().find(Tools.isVisible);
  },
  getVideoIFrame() {
    if (!this.videoInfo?.iFrame) return null;

    const { pathname, search } = new URL(this.videoInfo.iFrame);
    const partial = ((s) => s.slice(0, s.length * 0.8))(decodeURIComponent(search));
    return Tools.query(`iframe[src*="${pathname + partial}"]`);
  },
  getVideoContainer() {
    // 自定义网页全屏元素，支持多个选择器，返回第一个找到的元素
    const selector = Storage.CUSTOM_WEB_FULL.get(this.topWin?.host ?? this.host)?.trim();
    const container = selector ? this.player.closest(selector) ?? Tools.query(selector) : null;
    return container ?? this.findVideoContainer(this.findCtrlContainer());
  },
  findCtrlContainer() {
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
  findVideoContainer(container, max = 4, track = true) {
    container = container ?? Tools.getParent(this.player);
    if (!container.offsetHeight) container = Tools.getParent(container); // Youtube 存在这样的问题
    const { offsetWidth: cw, offsetHeight: ch } = container;
    if (track) this.videoParents.clear(); // 仅网页全屏时

    // 循环向上查找与初始元素宽高相等的父元素
    for (let parent = container, deep = 0; parent && deep < max; parent = Tools.getParent(parent), deep++) {
      if (parent.offsetWidth === cw && parent.offsetHeight === ch) container = parent;
      if (this.hasExplicitlySize(parent)) return container;
      if (track) this.videoParents.add(parent);
    }

    return container;
  },
  hasExplicitlySize(el) {
    const style = el.style;
    const sizeRegex = /^\d+(\.\d+)?(px|em|rem)$/;
    return ["width", "height"].some((prop) => {
      const value = style?.getPropertyValue(prop);
      return value && sizeRegex.test(value);
    });
  },
  ensureWebFullscreen() {
    const { vw, vh } = this.topWin;
    const elements = [...this.videoParents].reverse();

    // 核心目的：确保视频父元素宽高与视窗完全匹配，保障网页全屏正常显示
    // 背景说明：当父元素因外联CSS设置了固定宽高值；当进入网页全屏后，父元素宽高未适应视窗，因此需要重新计算并修正元素宽高；
    // 如：https://www.toutiao.com/video/7579134807163060782、https://www.163.com/v/video/VO3QRCEH5.html
    for (const el of elements) {
      if (!this.fsWrapper.contains(el)) continue; // 脱离式网页全屏时，元素不在 this.fsWrapper 中
      const { offsetWidth: width, offsetHeight: height } = this.player;
      if (width === vw && height === vh && el.offsetHeight === vh) continue;
      Tools.attr(el, Consts.webFull, true);
    }
  },
};
