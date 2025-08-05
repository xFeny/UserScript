import Consts from "../common/Consts";
import Tools from "../common/Tools";

/**
 * 通用网页全屏
 */
export default {
  webFullEnhance() {
    if (this.isNormalSite() || Tools.isTooFrequent("enhance")) return;
    // 退出网页全屏
    if (this.fullscreenWrapper) return this.exitWebFullEnhance();

    const container = this.getVideoHostContainer();
    if (!container || container.matches(":is(html, body)")) return;

    // 进入网页全屏
    this.fullscreenWrapper = container;
    container.top = container.top ?? container.getBoundingClientRect()?.top ?? 0;
    container.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    Tools.getParents(container, true)?.forEach((el) => Tools.setPart(el, Consts.webFull));

    this.ensureWebFullscreen(); // 确保网页全屏成功
  },
  exitWebFullEnhance() {
    const container = this.fullscreenWrapper;
    Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => Tools.delPart(el, Consts.webFull));
    Tools.scrollTop((Tools.getElementRect(container)?.top < 0 ? container?.top + container.scrollY : container?.top) - 120);
    this.fullscreenWrapper = null;
  },
  getVideoHostContainer() {
    if (this.player) return this.getVideoContainer();

    const videoIFrame = this.getVideoIFrame();
    if (videoIFrame) return videoIFrame;

    const ifrs = Tools.getIFrames();
    const { centerX, centerY } = this?.videoInfo ?? {};
    return ifrs.length <= 1 ? ifrs[0] : ifrs.find((el) => Tools.isVisible(el) && Tools.pointInElement(centerX, centerY, el));
  },
  getVideoIFrame() {
    if (!this?.videoInfo?.iframeSrc) return null;

    const { pathname, search } = new URL(this.videoInfo.iframeSrc);
    const decoded = decodeURI(search); // 先解码得到实际字符串
    const partial = decoded.slice(0, decoded.length * 0.8);
    return Tools.query(`iframe[src*="${pathname + partial}"]`);
  },
  getVideoContainer() {
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
  videoAncestorElements: new Set(),
  findVideoParentContainer(container, maxLevel = 4) {
    const video = this.player;
    container = container ?? video.parentElement;
    const { offsetWidth: cw, offsetHeight: ch } = container;
    this.videoAncestorElements.clear();

    // 循环向上查找与初始元素宽高相等的父元素
    for (let parent = container, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      if (parent.offsetWidth === cw && parent.offsetHeight === ch) container = parent;
      if (this.hasExplicitlySize(parent)) return container;
      this.videoAncestorElements.add(parent);
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
    const elements = [...this.videoAncestorElements].reverse();
    for (const element of elements) {
      const { offsetWidth, offsetHeight } = this.player;
      if (offsetWidth === viewWidth && offsetHeight === viewHeight) return;
      Tools.setPart(element, Consts.webFull);
    }
  },
};
