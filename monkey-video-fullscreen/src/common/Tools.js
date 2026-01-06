import { isElement, querySelector, querySelectorAll } from "../lib/ShadowUtils";
import Consts from "./Consts";

export default {
  isTopWin: () => window.top === window,
  scrollTop: (top) => window.scrollTo({ top }),
  getElementRect: (el) => el?.getBoundingClientRect(),
  microTask: (callback) => Promise.resolve().then(callback),
  query: (selector, context) => querySelector(selector, context),
  querys: (selector, context) => querySelectorAll(selector, context),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
  getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
  isVisible: (el) => !!(el && getComputedStyle(el).visibility !== "hidden" && (el.offsetWidth || el.offsetHeight)),
  preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
  emitEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
  isInputable: (el) => ["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable,
  sendToIFrames(data) {
    this.getIFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
  },
  freqTimes: new Map(),
  /**
   * 是否需要节流
   * @param {*} key 节流键名
   * @param {*} gap 节流间隔
   * @returns true = 需要节流（不执行），false = 可以执行
   */
  isThrottle(key = "throttle", gap = 300) {
    const now = Date.now();
    const last = this.freqTimes.get(key) ?? 0;
    const diff = now - last;
    return diff >= gap ? this.freqTimes.set(key, now) && false : true;
  },
  limitCountMap: new Map(),
  isOverLimit(key = "default", maxCount = 5) {
    const count = this.limitCountMap.get(key) ?? 0;
    if (count < maxCount) return this.limitCountMap.set(key, count + 1) && false;
    return true;
  },
  resetLimit(...keys) {
    const keyList = keys.length > 0 ? keys : ["default"];
    keyList.forEach((key) => this.limitCountMap.set(key, 0));
  },
  getCenterPoint(element) {
    if (!element) return { centerX: 0, centerY: 0 };
    const { top, left, width, height } = this.getElementRect(element);
    return { centerX: left + width / 2, centerY: top + height / 2 }; // 元素中心点
  },
  pointInElement(pointX, pointY, element) {
    if (!element) return false;
    const { top, left, right, bottom } = this.getElementRect(element);
    return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom;
  },
  getParent(element) {
    if (!element) return null;
    const parent = element.parentNode;
    if (parent instanceof ShadowRoot) return parent.host;
    return parent === document ? null : parent;
  },
  getParents(element, withSelf = false, maxLevel = Infinity) {
    const parents = withSelf && element ? [element] : [];
    for (let current = element, level = 0; current && level < maxLevel; level++) {
      current = this.getParent(current);
      current && parents.unshift(current);
    }
    return parents;
  },
  getParts: (node) => node.getAttribute("part")?.split(/\s+/) ?? [],
  setPart(node, value) {
    if (!isElement(node)) return;
    node.setAttribute("part", [...new Set([...this.getParts(node), value])].join(" "));
  },
  delPart(node, value) {
    if (!isElement(node)) return;
    const parts = this.getParts(node).filter((v) => v !== value);
    node.setAttribute("part", parts.join(" "));
  },
  safeHTML(htmlStr) {
    if (!window.trustedTypes?.createPolicy) return htmlStr;
    const policy = trustedTypes.defaultPolicy ?? trustedTypes.createPolicy("default", { createHTML: (input) => input });
    return policy.createHTML(htmlStr);
  },
  cloneAttrs(source, target, ...attrs) {
    attrs.flat().forEach((attr) => {
      const value = source.getAttribute(attr);
      if (value) target.setAttribute(attr, value);
    });
  },
  cloneStyle(source, target, ...names) {
    const computedStyle = window.getComputedStyle(source);
    names.flat().forEach((name) => {
      const value = computedStyle.getPropertyValue(name);
      if (value) target.style.setProperty(name, value);
    });
  },
  setStyle(eles, prop, val, priority) {
    if (!eles || !prop) return;
    const fn = val ? "setProperty" : "removeProperty";
    [].concat(eles).forEach((el) => el?.style?.[fn]?.(prop, val, priority));
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
