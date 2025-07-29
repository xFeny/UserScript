import Consts from "../common/Consts";
import Tools from "../common/Tools";

/**
 * 通用网页全屏
 */
export default {
  webFullEnhance() {
    if (this.normalSite() || Tools.isTooFrequent("enhance")) return;
    // 退出网页全屏
    if (this.fullscreenWrapper) return this.exitWebFullEnhance();

    const container = this.getVideoHostContainer();
    if (!container || container.matches(":is(html, body)")) return;

    // 进入网页全屏
    this.fullscreenWrapper = container;
    container.top = container.top ?? container.getBoundingClientRect()?.top ?? 0;
    container.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.addCls(el, "__flex-1"));
    Tools.getParents(container, true)?.forEach(this.applyFullscreenStyles);

    // 确保网页全屏成功
    this.ensureWebFullscreen();
  },
  applyFullscreenStyles(el) {
    el.__cssText = el.style.cssText;
    Tools.setPart(el, Consts.webFull);
    el.style.cssText += "width:100vw!important;height:100vh!important;";
  },
  exitWebFullEnhance() {
    const container = this.fullscreenWrapper;
    Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.delCls(el, "__flex-1"));
    Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => (Tools.delPart(el, Consts.webFull), (el.style = el.__cssText)));
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
    const controlsContainer = this.findControlBarContainer();
    return controlsContainer ? this.findVideoParentContainer(controlsContainer) : this.findVideoParentContainer();
  },
  findControlBarContainer() {
    const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
    const ctrl = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"], [class*="progress"]`;
    const controlsContainer = Tools.findParentWithChild(this.player, ctrl);
    if (!controlsContainer) return null;

    const { centerX, centerY } = Tools.getCenterPoint(controlsContainer);
    const { width: videoW } = Tools.getElementRect(this.player);
    const { width } = Tools.getElementRect(controlsContainer);
    const inRect = Tools.pointInElement(centerX, centerY, this.player);
    return Math.floor(width) <= Math.floor(videoW) && inRect ? controlsContainer : null;
  },
  videoAncestorElements: new Set(),
  findVideoParentContainer(container, maxLevel = 4) {
    const video = this.player;
    container = container ?? video.parentElement;
    const { width: cw, height: ch } = Tools.getElementRect(container);

    for (let parent = container, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      this.videoAncestorElements.add(parent);
      const { width, height } = Tools.getElementRect(parent);
      if (Math.floor(width) === Math.floor(cw) && Math.floor(height) === Math.floor(ch)) container = parent;
    }
    return container;
  },
  ensureWebFullscreen() {
    const elements = [...this.videoAncestorElements].reverse();
    for (const element of elements) {
      const { width: cw, height: ch } = Tools.getElementRect(this.player);
      const { width, height } = Tools.getElementRect(element);
      Tools.log(element, { width, height }, { cw, ch });
      if (Math.floor(width) === Math.floor(cw) && Math.floor(height) === Math.floor(ch)) return;
      this.applyFullscreenStyles(element);
    }
  },
};
