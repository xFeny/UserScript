import { querySelector, querySelectorAll } from "../lib/ShadowUtils";
import Consts from "./Consts";

export default {
  isTopWin: () => window.top === window,
  isNumber: (str) => /^[0-9]$/.test(str),
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
  emitCustomEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
  isInputable: (el) => ["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable,
  sendToIFrames(data) {
    this.getIFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
  },
  freqTimes: new Map(),
  _getTimeDiff(key) {
    const now = Date.now();
    const last = this.freqTimes.get(key) ?? 0;
    const diff = now - last;
    return { now, last, diff };
  },
  isFrequent(key = "frequent", gap = 300) {
    const { now, diff } = this._getTimeDiff(key);
    // 判断操作是否过于频繁，true = 过于频繁（不执行），false = 可以执行
    return this.freqTimes.set(key, now) && diff < gap;
  },
  isThrottle(key = "throttle", gap = 300) {
    const { now, diff } = this._getTimeDiff(key);
    // 判断是否需要节流，true = 需要节流（不执行），false = 可以执行
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
  createObserver(target, callback, options = {}) {
    const observer = new MutationObserver(callback);
    const observeTarget = typeof target === "string" ? this.query(target) : target;
    observer.observe(observeTarget, { childList: true, subtree: true, ...options });
    return observer;
  },
  findParentWithChild(element, selector, maxLevel = 8) {
    for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      if (this.query(selector, parent)) return parent;
    }
    return null;
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
  setPart(node, value) {
    if (!(node instanceof Element)) return;
    const parts = node?.getAttribute("part")?.split(/\s+/) ?? [];
    node?.setAttribute("part", [...new Set([...parts, value])].join(" ").trim());
  },
  delPart(node, value) {
    if (!(node instanceof Element)) return;
    const parts = (node?.getAttribute("part")?.split(/\s+/) ?? []).filter((v) => v !== value);
    node?.setAttribute("part", parts.join(" ").trim());
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
};
