import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Tools from "../common/Tools";

/**
 * 通用网页全屏
 */
export default {
  webFullEnhance() {
    if (this.isNormalSite() || Tools.isTooFrequent("enhance")) return;

    // 退出网页全屏
    if (this.fullscreenWrapper) return this.exitWebFullEnhance();

    // video的宿主容器元素
    const container = this.getVideoHostContainer();
    if (!container || container.matches(":is(html, body)")) return;

    // 进入网页全屏
    this.fullscreenWrapper = container;
    container.top = container.top ?? Tools.getElementRect(container).top;
    container.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    Tools.getParents(container, true).forEach((el) => Tools.setPart(el, Consts.webFull));

    // 滚动到视频容器位置，解决微博网页全屏后，在退出时不在原始位置问题
    Tools.scrollTop(container.scrollY + container.top);

    // 确保网页全屏成功
    this.ensureWebFullscreen();
  },
  exitWebFullEnhance() {
    const { scrollY } = this.fullscreenWrapper;
    Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => Tools.delPart(el, Consts.webFull));
    requestAnimationFrame(() => Tools.scrollTop(scrollY)); // 滚动到原始位置
    this.fullscreenWrapper = null;
    this.videoParents.clear();
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
    // 自定义网页全屏元素
    const selector = Storage.CUSTOM_WEB_FULL.get(this.topWin.host);
    if (selector) return this.videoParents.clear(), Tools.query(selector);

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
    const video = this.player;
    container = container ?? video.parentElement;
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

    // 确保video父元素的宽高与视窗一致
    // findVideoParentContainer 获取到的父容器，由于外联css设置了固定的宽高
    // 在网页全屏后，需要重新判断元素的宽高，确保视频成功网页全屏
    // 如：https://www.toutiao.com
    for (const element of elements) {
      const { offsetWidth: width, offsetHeight: height } = this.player;
      if (width === viewWidth && height === viewHeight && element.offsetHeight === viewHeight) continue;
      Tools.setPart(element, Consts.webFull);
    }
  },
};
