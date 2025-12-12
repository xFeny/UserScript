import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Keyboard from "../common/Keyboard";
import SiteIcons from "../common/SiteIcons";

/**
 * 网页全屏逻辑处理
 * `@match`网站 通过点击自有图标的方式
 * 非`@match`网站 通过对视频容器父元素添加相关CSS的方式
 */
export default {
  triggerIconElement(name) {
    if (Tools.isFrequent("icon")) return;
    if (!Site.isBiliLive()) return Tools.query(SiteIcons.getIcons()?.[name])?.click();
    const index = Object.values(SiteIcons.name).indexOf(name);
    this.liveAuxHandle(), this.getLiveIcons()?.[index]?.click();
  },
  async liveAuxHandle() {
    unsafeWindow.top.scrollTo({ top: 70 });
    const el = Tools.query(":is(.lite-room, #player-ctnr)", top.document);
    if (el) unsafeWindow.top.scrollTo({ top: Tools.getElementRect(el)?.top });

    if (Tools.hasCls(document.body, "hide-asida-area") || !unsafeWindow.top?.livePlayer) return;
    unsafeWindow.top.livePlayer.volume(100); // 声音100%
    unsafeWindow.top.livePlayer.switchQualityAsync("10000"); // 原画画质
    localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0); // 关闭全屏礼物栏
    Tools.addCls(document.body, "hide-asida-area", "hide-aside-area"); // 关闭侧边聊天栏
  },
  getLiveIcons() {
    // 图标从右到左：全屏、网页全屏、弹幕设置、弹幕开关、小窗模式，即下标[0]是全屏图标
    Tools.emitMousemove(this.getVideo());
    return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
  },
  toggleFullscreen() {
    if (!Tools.isTopWin() || Tools.isFrequent("toggleFull")) return;
    this.isFullscreen ? document.exitFullscreen() : this.getVideoHostContainer()?.requestFullscreen();
    if (this.isFullscreen || !this.fsWrapper) this.dispatchShortcutKey(Keyboard.P); // 全屏或非网页全屏模式下
  },
  toggleWebFullscreen(isTrusted) {
    if (this.noVideo() || Tools.isFrequent("toggleWeb")) return;
    if (this.isFullscreen && isTrusted) return document.fullscreenElement && document.exitFullscreen(); // 由全屏切换到网页全屏
    this.fsWrapper ? this.exitWebFullscreen() : this.enterWebFullscreen();
  },
  enterWebFullscreen() {
    // video的宿主容器元素
    const container = (this.fsWrapper = this.getVideoHostContainer());
    if (!container || container.matches(":is(html, body)")) return this.ensureWebFullscreen();

    // 进入网页全屏
    const parents = Tools.getParents(container, true);
    container.top = container.top ?? Tools.getElementRect(container).top;
    container.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    // 父元素链的长度超过预设的阈值，视频容器“脱离”其原始DOM结构
    container instanceof HTMLIFrameElement || parents.length < Consts.WEBFULL_PARENT_DEPTH
      ? parents.forEach((el) => Tools.setPart(el, Consts.webFull))
      : this.detachForFullscreen();

    // 滚动到视频容器位置，解决微博网页全屏后，在退出时不在原始位置问题
    Tools.scrollTop(container.scrollY + container.top);

    // 确保网页全屏成功
    this.ensureWebFullscreen();
  },
  detachForFullscreen() {
    if (this.fsParent) return;
    this.fsParent = Tools.getParent(this.fsWrapper);

    // 创建占位元素（保持原布局不塌陷）
    this.fsPlaceholder = document.createElement("div");
    Tools.cloneAttrs(this.fsWrapper, this.fsPlaceholder, ["id", "class", "style"]);
    Tools.cloneStyle(this.fsWrapper, this.fsPlaceholder, ["position", "width", "height"]);

    // 替换并移动视频容器
    this.fsParent.replaceChild(this.fsPlaceholder, this.fsWrapper);
    document.body.insertAdjacentElement("beforeend", this.fsWrapper);

    this.fsWrapper.querySelector("video")?.play();
    Tools.setPart(this.fsWrapper, Consts.webFull);
  },
  exitWebFullscreen() {
    if (!this.fsWrapper) return;
    const { scrollY } = this.fsWrapper;

    // 临时禁用平滑滚动：为了确保接下来的滚动操作是瞬间完成的（无动画）
    Tools.setStyle(document.documentElement, "scroll-behavior", "auto", "important");

    // 是脱离原结构式网页全屏时，将视频容器还原到它原来的DOM位置
    if (this.fsParent?.contains(this.fsPlaceholder)) this.fsParent?.replaceChild(this.fsWrapper, this.fsPlaceholder);
    Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => Tools.delPart(el, Consts.webFull));

    requestAnimationFrame(() => Tools.scrollTop(scrollY)); // 滚动到原始位置
    setTimeout(() => Tools.setStyle(document.documentElement, "scroll-behavior"), 100);

    // 清理相关变量
    this.videoParents.clear();
    this.fsPlaceholder = null;
    this.fsWrapper = null;
    this.fsParent = null;
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
    const selector = Storage.CUSTOM_WEB_FULL.get(this.topWin?.host)?.trim();
    const container = selector ? this.player.closest(selector) : null;
    if (container) return container;

    // 查找相关元素
    const ctrlContainer = this.findControlBarContainer();
    return ctrlContainer ? this.findVideoParentContainer(ctrlContainer) : this.findVideoParentContainer();
  },
  findControlBarContainer() {
    const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
    const ctrl = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"], [class*="progress"]`;
    const ctrlContainer = Tools.findParentWithChild(this.player, ctrl);
    if (!ctrlContainer) return null;

    const { width } = Tools.getElementRect(ctrlContainer);
    const { width: vw } = Tools.getElementRect(this.player);
    const { centerX, centerY } = Tools.getCenterPoint(ctrlContainer);
    const inRect = Tools.pointInElement(centerX, centerY, this.player);

    return Math.floor(width) <= Math.floor(vw) && inRect ? ctrlContainer : null;
  },
  videoParents: new Set(),
  findVideoParentContainer(container, maxLevel = 4, track = true) {
    container = container ?? Tools.getParent(this.player);
    const { offsetWidth: cw, offsetHeight: ch } = container;
    if (track) this.videoParents.clear(); // 仅网页全屏时

    // 循环向上查找与初始元素宽高相等的父元素
    for (let parent = container, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
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
      const value = style.getPropertyValue(prop);
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
      Tools.setPart(element, Consts.webFull);
    }
  },
};
