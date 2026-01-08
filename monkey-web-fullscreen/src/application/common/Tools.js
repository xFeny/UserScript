import { querySelector, querySelectorAll } from "./lib/ShadowUtils";
import { Notyf } from "notyf";
import Consts from "./Consts";

export default unsafeWindow.FyTools = {
  isTopWin: () => window.top === window,
  isNumber: (str) => /^[0-9]$/.test(str),
  scrollTop: (top) => window.scrollTo({ top }),
  alert: (...data) => window.alert(data.join(" ")),
  getElementRect: (el) => el?.getBoundingClientRect(),
  isMultiVideo: () => querySelectorAll("video").length > 1,
  microTask: (callback) => Promise.resolve().then(callback),
  query: (selector, context) => querySelector(selector, context),
  querys: (selector, context) => querySelectorAll(selector, context),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  toFixed: (value, digits = 2) => (+value).toFixed(digits).replace(/\.?0+$/, Consts.EMPTY),
  postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
  getNumbers: (str) => (typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : []),
  log: (...data) => console.log(...["%c===== 脚本日志 =====\n\n", "color:green;", ...data, "\n\n"]),
  getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
  isVisible: (el) => !!(el && getComputedStyle(el).visibility !== "hidden" && (el.offsetWidth || el.offsetHeight)),
  preventDefault: (event) => (event.preventDefault(), event.stopPropagation(), event.stopImmediatePropagation()),
  attr: (el, name, val) => el && name && el[val ? "setAttribute" : "removeAttribute"](name, val),
  createElement: (tagName, attrs = {}) => Object.assign(document.createElement(tagName), attrs),
  emitEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
  isInputable: (el) => ["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable,
  hasCls: (el, ...classes) => classes.flat().some((cls) => el?.classList.contains(cls)),
  delCls: (el, ...classes) => el?.classList.remove(...classes),
  addCls: (el, ...classes) => el?.classList.add(...classes),
  notyf(msg, isError = false) {
    const notyf = new Notyf({ duration: Consts.THREE_SEC, position: { x: "center", y: "top" } });
    isError ? notyf.error(msg) : notyf.success(msg);
    return false;
  },
  sendToIFrames(data) {
    this.getIFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
  },
  freqTimes: new Map(),
  isThrottle(key = "throttle", gap = 300) {
    const now = Date.now();
    const last = this.freqTimes.get(key) ?? 0;
    const diff = now - last;

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
  pointInElement(pointX, pointY, element) {
    if (!element) return false;
    const { top, left, right, bottom } = this.getElementRect(element);
    return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom;
  },
  emitMousemove(element) {
    const { top: y, left, right } = this.getElementRect(element);
    for (let x = left; x <= right; x += 10) this.emitMouseEvent(element, "mousemove", x, y);
  },
  emitMouseEvent(element, eventType, clientX, clientY) {
    const dict = { clientX, clientY, bubbles: true };
    element?.dispatchEvent(new MouseEvent(eventType, dict));
  },
  /**
   * 判断元素是否有有效ID（不含数字/中文）
   * @param {Element} el
   * @returns
   */
  hasValidDomId: (el) => el.id && !/[\d\u4e00-\u9fa5]/.test(el.id),
  getElementPath(element) {
    const parents = [];
    let current = element;
    while (current && !current.matches("body")) {
      parents.unshift(this.getElementSelector(current));
      if (this.hasValidDomId(current)) break;
      current = this.getParent(current);
    }
    return parents.join(" > ");
  },
  getElementSelector(ele) {
    if (this.hasValidDomId(ele)) return `#${ele.id}`;
    const tag = ele.tagName.toLowerCase();
    const validCls = Array.from(ele.classList).filter((cls) => !/[\[\]\d]/.test(cls)); // 排除含[]或数字的类名
    return validCls.length ? `${tag}.${validCls.join(".")}` : tag;
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
  hashCode(str) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = (hash * 0x01000193) >>> 0; // 确保无符号32位整数运算
    }
    return hash;
  },
  /**
   * 通过 XPath 查找元素，支持文本内容或属性值匹配
   * @param {'text'|'attr'} mode - 匹配模式：'text' 匹配文本内容，'attr' 匹配任意属性
   * @param {...string|string[]} texts - 要匹配的文本（可嵌套数组）
   * @returns {Element[]} 匹配的元素数组
   */
  findByText(mode, ...texts) {
    const flatTexts = texts.flat();
    const expr = Object.is(mode, "text")
      ? `.//*[${flatTexts.map((t) => `contains(text(), '${t.replace(/'/g, "\\'")}')`).join(" or ")}]`
      : `.//*[${flatTexts.map((t) => `@*[contains(., '${t.replace(/'/g, "\\'")}')]`).join(" or ")}]`;
    const nodes = document.evaluate(expr, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return Array.from({ length: nodes.snapshotLength }, (_, i) => nodes.snapshotItem(i)).filter((el) => !el.matches("script"));
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
