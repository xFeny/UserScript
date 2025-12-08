import { Notyf } from "notyf";
import Consts from "./Consts";
import EventTypes from "./EventTypes";
import { querySelector, querySelectorAll } from "./shadow-dom-utils";

export default unsafeWindow.Tools = {
  noNumber: (str) => !/\d/.test(str),
  isTopWin: () => window.top === window,
  isNumber: (str) => /^[0-9]$/.test(str),
  scrollTop: (top) => window.scrollTo({ top }),
  alert: (...data) => window.alert(data.join(" ")),
  getElementRect: (el) => el?.getBoundingClientRect(),
  isMultiVideo: () => querySelectorAll("video").length > 1,
  query: (selector, context) => querySelector(selector, context),
  querys: (selector, context) => querySelectorAll(selector, context),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  triggerClick: (ele) => ele?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  toFixed: (value, digits = 2) => (+value).toFixed(digits).replace(/\.?0+$/, Consts.EMPTY),
  postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
  getNumbers: (str) => (typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : []),
  log: (...data) => console.log(...["%c===== 脚本日志 =====\n\n", "color:green;", ...data, "\n\n"]),
  getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
  isVisible: (el) => !!(el && getComputedStyle(el).visibility !== "hidden" && (el.offsetWidth || el.offsetHeight)),
  preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
  emitCustomEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
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
  isFrequent(key = "default", gap = 300, isThrottle = false) {
    const now = Date.now();
    const last = this.freqTimes.get(key) ?? 0;
    const delta = now - last;

    // 限制模式：返回是否过于频繁
    if (!isThrottle) return this.freqTimes.set(key, now) && delta < gap;

    // 节流模式：间隔满足时执行一次
    return delta >= gap ? this.freqTimes.set(key, now) && false : true;
  },
  limitCountMap: new Map(),
  isOverLimit(key = "default", maxCount = 5) {
    const count = this.limitCountMap.get(key) ?? 0;
    if (count < maxCount) return this.limitCountMap.set(key, count + 1) && false;
    return true;
  },
  resetLimitCounter(key = "default") {
    this.limitCountMap.set(key, 0);
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
  triggerMousemove(element) {
    const { centerX, centerY } = this.getCenterPoint(element);
    for (let y = 0; y < centerY; y += 10) this.dispatchMouseEvent(element, EventTypes.MOUSE_MOVE, centerX, y);
  },
  triggerMouseHover(element) {
    const { centerX, centerY } = this.getCenterPoint(element);
    this.dispatchMouseEvent(element, EventTypes.MOUSE_OVER, centerX, centerY);
  },
  dispatchMouseEvent(element, eventType, clientX, clientY) {
    const dict = { clientX, clientY, bubbles: true };
    element?.dispatchEvent(new MouseEvent(eventType, dict));
  },
  createObserver(target, callback, options = {}) {
    const observer = new MutationObserver(callback);
    const observeTarget = typeof target === "string" ? this.query(target) : target;
    observer.observe(observeTarget, { childList: true, subtree: true, ...options });
    return observer;
  },
  closest(element, selector, maxLevel = 3) {
    for (let level = 0; element && level < maxLevel; level++, element = element.parentElement) {
      if (element.matches(selector)) return element;
    }
    return null;
  },
  findParentWithChild(element, selector, maxLevel = 8) {
    for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      if (this.query(selector, parent)) return parent;
    }
    return null;
  },
  findSibling(element, selector, maxLevel = 3) {
    for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      for (const child of parent.children) {
        if (child !== element && child.matches(selector)) return child;
      }
    }
    return null;
  },
  getParentChain(element, nth = false) {
    const parents = [];
    for (let current = element; current && current !== document.body; current = current.parentElement) {
      parents.unshift(this.getTagInfo(current, nth));
      if (current.id && this.noNumber(current.id)) break;
    }
    return parents.join(" > ");
  },
  getTagInfo(ele, nth = false) {
    // id不是数字和中文
    if (ele.id && this.noNumber(ele.id) && !/[\u4e00-\u9fa5]/.test(ele.id)) return `#${ele.id}`;
    let selector = ele.tagName.toLowerCase();
    const classes = Array.from(ele.classList);

    // 处理类选择器
    if (classes.length) {
      const validClasses = classes.filter(this.noNumber, this);
      selector += /[:[\]]/.test(ele.className)
        ? `[class="${ele.className}"]`
        : validClasses.length
        ? `.${validClasses.join(".")}`
        : Consts.EMPTY;
    }

    // 非首个同类型元素添加nth-of-type
    if (nth && ele.parentElement) {
      const siblings = Array.from(ele.parentElement.children).filter((sib) => sib.tagName === ele.tagName);
      const index = siblings.indexOf(ele);
      if (index > 0) selector += `:nth-of-type(${index + 1})`;
    }

    return selector;
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
};
