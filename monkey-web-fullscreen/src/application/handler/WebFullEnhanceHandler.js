import { getShadowRoots } from "../modules/shadow-dom-utils";
import Consts from "../common/Consts";
import Tools from "../common/Tools";

/**
 * 通用网页全屏
 */
export default {
  webFullEnhance() {
    if (this.normalSite() || Tools.isTooFrequent("enhance")) return;
    // 退出网页全屏
    if (this.webFullWrap) return this.exitWebFull();

    const wrap = this.getVideoHostContainer();
    if (!wrap || wrap.matches(":is(html, body)")) return;

    // 进入网页全屏
    this.webFullWrap = wrap;
    wrap.top = wrap.top ?? wrap.getBoundingClientRect()?.top ?? 0;
    wrap.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.addCls(el, "__flex-1"));

    Tools.getParents(wrap, true)?.forEach((el) => {
      (el.__cssText = el.style.cssText), Tools.setPart(el, Consts.webFull);
      el.style.cssText += "width:100vw!important;height:100vh!important;";
    });
  },
  exitWebFull() {
    const wrap = this.webFullWrap;
    Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.delCls(el, "__flex-1"));
    Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => (Tools.delPart(el, Consts.webFull), (el.style = el.__cssText)));
    Tools.scrollTop((Tools.getElementRect(wrap)?.top < 0 ? wrap?.top + wrap.scrollY : wrap?.top) - 120);
    this.webFullWrap = null;
  },
  getVideoHostContainer() {
    if (this.player) return this.getVideoWrapper();

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
  getVideoWrapper() {
    const controlsParent = this.findVideoCtrlBarParent();
    return controlsParent ? this.findVideoContainer(controlsParent) : this.findVideoContainer();
  },
  findVideoCtrlBarParent() {
    const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
    const ctrl = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"], [class*="progress"]`;
    const controlsParent = Tools.findParentWithChild(this.player, ctrl);
    if (!controlsParent) return null;

    const { centerX, centerY } = Tools.getCenterPoint(controlsParent);
    const { width: videoW } = Tools.getElementRect(this.player);
    const { width } = Tools.getElementRect(controlsParent);
    const inRect = Tools.pointInElement(centerX, centerY, this.player);
    return Math.floor(width) <= Math.floor(videoW) && inRect ? controlsParent : null;
  },
  findVideoContainer(container, maxLevel = 4) {
    const video = this.player;
    container = container ?? video.parentElement;
    const { width: cw, height: ch } = Tools.getElementRect(container);

    for (let parent = container, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      const { width, height } = Tools.getElementRect(parent);
      if (Math.floor(width) === Math.floor(cw) && Math.floor(height) === Math.floor(ch)) container = parent;
      if (!parent.matches("video") && this.hasExplicitSize(parent)) return container;
    }
    return container;
  },
  /**
   * 检查元素是否设置了固定宽度或高度
   * @param {HTMLElement} element - 需要检查的DOM元素
   * @returns {boolean} 如果宽度或高度是固定尺寸则返回true，否则返回false
   */
  sizeCheckCache: new WeakMap(),
  hasExplicitSize(element) {
    // 检查内联样式
    if (this.isFixedSizeValue(element.style)) return true;

    // 检查缓存结果
    if (this.sizeCheckCache.has(element)) return this.sizeCheckCache.get(element);

    // 检查外联样式并缓存结果
    const result = this.getCachedStyleSheets().some((sheet) => this.checkStyleSheet(element, sheet));
    this.sizeCheckCache.set(element, result);

    return result;
  },
  styleSheetCache: [],
  getCachedStyleSheets() {
    if (this.styleSheetCache.length) return this.styleSheetCache;
    const roots = [...getShadowRoots(document.body, true), document];
    roots.forEach((root) => {
      const styleSheets = Array.from(root.styleSheets);
      const adoptedStyleSheets = Array.from(root.adoptedStyleSheets);
      this.styleSheetCache.push(...styleSheets, ...adoptedStyleSheets);
    });
    return this.styleSheetCache;
  },
  checkStyleSheet(element, sheet) {
    try {
      for (const rule of sheet.cssRules) {
        if (this.checkStyleRule(element, rule)) return true;
        if (rule instanceof CSSMediaRule && window.matchMedia(rule.conditionText)?.matches) {
          for (const mediaRule of rule.cssRules) {
            if (this.checkStyleRule(element, mediaRule)) return true;
          }
        }
      }
    } catch (e) {
      console.debug(`无法访问样式表 ${sheet.href}:`, e);
    }
    return false;
  },
  checkStyleRule(element, rule) {
    if (!(rule instanceof CSSStyleRule)) return false;
    return element.matches(rule.selectorText) && this.isFixedSizeValue(rule.style);
  },
  isFixedSizeValue(style) {
    const sizeRegex = /^\d+(\.\d+)?(px|em|rem)$/;
    const cssFunRegex = /(calc|var|min|max|clamp)\([^)]+\)/;
    const percentRegex = /^(?!100(\.0+)?%)\d+(\.\d+)?%$/; // 匹配非100%
    return ["width", "height"].some((prop) => {
      const value = style.getPropertyValue(prop) || style[prop];
      return value && (sizeRegex.test(value) || cssFunRegex.test(value) || percentRegex.test(value));
    });
  },
};
