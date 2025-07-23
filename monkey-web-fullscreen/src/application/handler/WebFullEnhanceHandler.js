import { getShadowRoots } from "../common/shadow-dom-utils";
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
    if (this.player?.__wrapper?.hasChildNodes()) return this.player.__wrapper;

    const controlsParent = this.findVideoCtrlBarParent();
    const wrapper = controlsParent ? this.findVideoContainer(controlsParent) : this.findVideoContainer();
    this.player.__wrapper = wrapper;
    return wrapper;
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
  hasExplicitSize(element) {
    // 检查是否通过内联样式设置了固定宽度或高度
    if (this.isFixedSizeValue(element.style)) return true;

    // 检查是否通过外联样式设置了固定宽度或高度
    const roots = [...getShadowRoots(document.body, true), document];
    for (const root of roots) {
      for (let i = 0; i < root.styleSheets.length; i++) {
        const sheet = root.styleSheets[i];
        return this.checkStyleSheet(element, sheet);
      }
    }
    return false;
  },
  checkStyleSheet(element, sheet) {
    try {
      const rules = sheet.cssRules;
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (this.checkStyleRule(element, rule)) return true;
        if (rule instanceof CSSMediaRule) {
          if (!window.matchMedia(rule.conditionText).matches) continue;
          for (let k = 0; k < rule.cssRules.length; k++) {
            const mediaRule = rule.cssRules[k];
            if (this.checkStyleRule(element, mediaRule)) return true;
          }
        }
      }
    } catch (error) {
      console.debug(`无法访问样式表 ${sheet.href}:`, e);
    }
    return false;
  },
  checkStyleRule(element, rule) {
    if (!(rule instanceof CSSStyleRule)) return false;
    return element.matches(rule.selectorText) && this.isFixedSizeValue(rule.style);
  },
  isFixedSizeValue(style) {
    // 匹配固定单位: px, em, rem (支持小数)
    const sizeRegex = /^\d+(\.\d+)?(px|em|rem)$/;
    // 匹配CSS函数: calc, var, min, max, clamp
    const cssFunRegex = /(calc|var|min|max|clamp)\([^)]+\)/;

    return ["width", "height"].some((prop) => {
      const value = style.getPropertyValue(prop) || style[prop];
      return value && (sizeRegex.test(value) || cssFunRegex.test(value));
    });
  },
};
