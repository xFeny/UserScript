import { querySelector, querySelectorAll } from "./lib/ShadowUtils";
import { Notyf } from "notyf";
import Consts from "./Consts";

export default unsafeWindow.FyTools = {
  isTopWin: () => window.top === window,
  isNumber: (str) => /^[0-9]$/.test(str),
  scrollTop: (top) => window.scrollTo({ top }),
  getRect: (el) => el?.getBoundingClientRect(),
  microTask: (fn) => Promise.resolve().then(fn),
  alert: (...data) => window.alert(data.join(" ")),
  hasMoveBefore: () => "moveBefore" in Element.prototype,
  query: (selector, ctx) => querySelector(selector, ctx),
  querys: (selector, ctx) => querySelectorAll(selector, ctx),
  clamp: (value, min, max) => Math.min(Math.max(value, min), max),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  toFixed: (value, digits = 2) => (+value).toFixed(digits).replace(/\.?0+$/, Consts.EMPTY),
  postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
  getNumbers: (str) => (typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : []),
  log: (...data) => console.log(...["%c===== 脚本日志 =====\n\n", "color:green;", ...data, "\n\n"]),
  isExecuted: (key, ctx = (window.e9x ??= {})) => ctx?.[key] || !!(ctx && (ctx[key] = true), false),
  getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
  isVisible: (el) => !!(el && getComputedStyle(el).visibility !== "hidden" && (el.offsetWidth || el.offsetHeight)),
  attr: (el, name, val) => el && name && el[val ? "setAttribute" : "removeAttribute"](name, val),
  preventEvent: (e) => (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation()),
  emitEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
  isInputable: (el) => ["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable,
  newEle: (name, attrs = {}) => Object.assign(document.createElement(name), attrs),
  hasCls: (el, ...cls) => cls.flat().some((c) => el?.classList.contains(c)),
  delCls: (el, ...cls) => el?.classList.remove(...cls),
  addCls: (el, ...cls) => el?.classList.add(...cls),
  notyf(msg, isError = false) {
    const notyf = new Notyf({ duration: Consts.THREE_SEC, position: { x: "center", y: "top" } });
    isError ? notyf.error(msg) : notyf.success(msg);
    return false;
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
  getCenterPoint(el) {
    const { top, left, width, height } = this.getRect(el);
    return { cx: left + width / 2, cy: top + height / 2 }; // 元素中心点
  },
  /**
   * 判断是否在目标元素视觉上方
   * @param {HTMLElement} target 目标元素（被遮盖的）
   * @param {HTMLElement} cover 待检查元素（要判断在上的）
   * @returns {boolean}
   */
  isAboveElement(target, cover) {
    if (!target || !cover) return false;
    const { cx, cy } = this.getCenterPoint(target);
    return cover.contains(document.elementFromPoint(cx, cy));
  },
  emitMousemove(el) {
    const { top: y, left, right } = this.getRect(el);
    for (let x = left; x <= right; x += 10) this.fireMouseEvt(el, "mousemove", x, y);
  },
  fireMouseEvt(el, type, clientX, clientY) {
    const dict = { clientX, clientY, bubbles: true };
    return el?.dispatchEvent(new MouseEvent(type, dict));
  },
  /**
   * 判断元素是否有有效ID（不含数字/中文）
   * @param {Element} el
   * @returns
   */
  isValidId: (el) => el.id && !/[\d\u4e00-\u9fa5]/.test(el.id),
  getElementPath(element) {
    const parents = [];
    let current = element;
    while (current && !current.matches("body")) {
      parents.unshift(this.getSelector(current));
      if (this.isValidId(current)) break;
      current = this.getParent(current);
    }
    return parents.join(" > ");
  },
  getSelector(el) {
    if (this.isValidId(el)) return `#${el.id}`;
    const tag = el.tagName.toLowerCase();
    const validCls = Array.from(el.classList).filter((cls) => !/[\[\]\d]/.test(cls)); // 排除含[]或数字的类名
    return validCls.length ? `${tag}.${validCls.join(".")}` : tag;
  },
  getParent(el) {
    if (!el) return null;
    const parent = el.parentNode;
    if (parent instanceof ShadowRoot) return parent.host;
    return parent === document ? null : parent;
  },
  getParents(el, max = Infinity, self = true) {
    const parents = self && el ? [el] : [];
    for (let current = el, deep = 0; current && deep < max; deep++) {
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
    const flatTexts = texts.flat().map((t) => t.replace(/'/g, "\\'"));
    const part = (t) => (mode === "text" ? `contains(text(), '${t}')` : `@*[contains(., '${t}')]`);
    const expr = `.//*[${flatTexts.map(part).join(" or ")}]`;
    const nodes = document.evaluate(expr, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    return Array.from({ length: nodes.snapshotLength }, (_, i) => nodes.snapshotItem(i)).filter((el) => !el.matches("script"));
  },
  safeHTML(html) {
    if (!window.trustedTypes?.createPolicy) return html;
    const policy = trustedTypes.defaultPolicy ?? trustedTypes.createPolicy("default", { createHTML: (input) => input });
    return policy.createHTML(html);
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
  isAttached: (el) => !!el && el.isConnected && (!el.getRootNode?.()?.host || el.getRootNode().host.isConnected),
  /**
   * 轮询检测指定条件，直到条件满足或超时
   * @param {Function} condition - 检测条件函数，需返回布尔值（true/false）
   * @param {Object} [opts={}] - 配置选项
   * @param {boolean} [opts.immediate=false] - 是否立即执行首次检测（true=立即执行，false=延迟interval后执行）
   * @param {number} [opts.interval=50] - 每次检测的间隔时间（毫秒），默认50ms
   * @param {number} [opts.timeout=3000] - 最大超时时间（毫秒），默认3000ms（3秒）
   * @returns {Promise<void>} - 条件满足时resolve（无返回值），超时/执行出错时reject
   */
  waitFor(condition, opts = {}) {
    const start = Date.now();
    const { immediate = false, interval = 50, timeout = 3000 } = opts;

    return new Promise((resolve, reject) => {
      const checkCondition = () => {
        if (Date.now() - start > timeout) return reject(new Error("waitFor 预期条件未满足"));
        condition() ? resolve() : setTimeout(checkCondition, interval);
      };

      immediate ? checkCondition() : setTimeout(checkCondition, interval); // 执行第一次检测
    });
  },
};
