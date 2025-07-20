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
    Tools.getParents(wrap, true)?.forEach((el) => Tools.setPart(el, Consts.webFull));

    // video特殊处理
    if (this.player) Tools.setPart(this.player, Consts.videoPart);
  },
  exitWebFull() {
    const wrap = this.webFullWrap;
    if (this.player) Tools.delPart(this.player, Consts.videoPart);

    Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.delCls(el, "__flex-1"));
    Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => Tools.delPart(el, Consts.webFull));
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
    container = container ?? video;
    const { width: cw, height: ch } = Tools.getElementRect(container);

    for (let parent = container, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      const { width, height } = Tools.getElementRect(parent);
      if (!parent.matches("video") && this.hasExplicitSize(parent)) return parent;
      if (Math.floor(width) === Math.floor(cw) && Math.floor(height) === Math.floor(ch)) container = parent;
    }
    return container;
  },
  /**
   * 检查元素是否设置了固定宽度或高度
   * @param {HTMLElement} element - 需要检查的DOM元素
   * @returns {boolean} 如果元素有显式设置的px/em/rem单位的宽度或高度则返回true，否则返回false
   */
  hasExplicitSize(element) {
    const regex = /^\d+(\.\d+)?(px|em|rem)$/;
    // 检查是否通过内联样式设置了固定宽度或高度
    if (regex.test(element.style.width) || element.style.height) return true;

    // 检查是否通过外联样式设置了固定宽度或高度
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          if (rule instanceof CSSStyleRule) {
            if (element.matches(rule.selectorText)) {
              const width = rule.style.getPropertyValue("width");
              const height = rule.style.getPropertyValue("height");
              if (width && regex.test(width)) return true;
              if (height && regex.test(height)) return true;
            }
          } else if (rule instanceof CSSMediaRule) {
            if (window.matchMedia(rule.conditionText).matches) {
              for (let k = 0; k < rule.cssRules.length; k++) {
                const mediaRule = rule.cssRules[k];
                if (mediaRule instanceof CSSStyleRule && element.matches(mediaRule.selectorText)) {
                  const width = mediaRule.style.getPropertyValue("width");
                  const height = mediaRule.style.getPropertyValue("height");
                  if (width && regex.test(width)) return true;
                  if (height && regex.test(height)) return true;
                }
              }
            }
          }
        }
      } catch (e) {}
    }

    return false;
  },
};
