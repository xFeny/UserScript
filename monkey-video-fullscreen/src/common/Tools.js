import { querySelector, querySelectorAll } from "../lib/ShadowUtils";
import Consts from "./Consts";

export default {
  isTopWin: () => window.top === window,
  scrollTop: (top) => window.scrollTo({ top }),
  getRect: (el) => el?.getBoundingClientRect(),
  microTask: (fn) => Promise.resolve().then(fn),
  query: (selector, ctx) => querySelector(selector, ctx),
  querys: (selector, ctx) => querySelectorAll(selector, ctx),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
  getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
  isVisible: (el) => !!(el && getComputedStyle(el).visibility !== "hidden" && (el.offsetWidth || el.offsetHeight)),
  preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
  attr: (el, name, val) => el && name && el[val ? "setAttribute" : "removeAttribute"](name, val),
  emitEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
  isInputable: (el) => ["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable,
  sendToIFrames(data) {
    this.getIFrames().forEach((el) => this.postMessage(el?.contentWindow, data));
  },
  freqTimes: new Map(),
  isThrottle(key = "throttle", gap = 300) {
    const now = Date.now();
    const last = this.freqTimes.get(key) ?? 0;
    const diff = now - last;

    // 判断是否需要节流，true = 需要节流（不执行），false = 可以执行
    return diff >= gap ? this.freqTimes.set(key, now) && false : true;
  },
  countMap: new Map(),
  isOverLimit(key = "default", max = 5) {
    const count = this.countMap.get(key) ?? 0;
    if (count < max) return this.countMap.set(key, count + 1) && false;
    return true;
  },
  resetLimit(...keys) {
    const keyList = keys.length > 0 ? keys : ["default"];
    keyList.forEach((key) => this.countMap.set(key, 0));
  },
  pointInElement(x, y, el) {
    if (!el) return false;
    const { top, left, right, bottom } = this.getRect(el);
    return x >= left && x <= right && y >= top && y <= bottom;
  },
  getParent(el) {
    if (!el) return null;
    const parent = el.parentNode;
    if (parent instanceof ShadowRoot) return parent.host;
    return parent === document ? null : parent;
  },
  getParents(el, self = false, max = Infinity) {
    const parents = self && el ? [el] : [];
    for (let current = el, deep = 0; current && deep < max; deep++) {
      current = this.getParent(current);
      current && parents.unshift(current);
    }
    return parents;
  },
  cloneAttrs(source, target, ...attrs) {
    attrs.flat().forEach((attr) => {
      const value = source.getAttribute(attr);
      if (value) target.setAttribute(attr, value);
    });
  },
  setStyle(els, prop, val, priority) {
    if (!els || !prop) return;
    const fn = val ? "setProperty" : "removeProperty";
    [].concat(els).forEach((el) => el?.style?.[fn]?.(prop, val, priority));
  },
  /**
   * 检测DOM元素是否仍挂载在活跃文档树中（兼容开放Shadow DOM）
   * @param {HTMLElement} el 待检测的DOM元素
   * @returns {boolean} true=元素挂载；false=元素已脱离
   */
  isAttached(el) {
    if (!el) return false;
    const root = el.getRootNode?.();
    return el.isConnected && (!root || !(root instanceof ShadowRoot) || root.host.isConnected);
  },
};
