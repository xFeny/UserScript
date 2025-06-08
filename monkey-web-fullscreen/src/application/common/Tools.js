import { Notyf } from "notyf";
import Constants from "./Constants";
import { querySelector, querySelectorAll } from "./shadow-dom-utils";

const { ONE_SEC, MSG_SOURCE } = Constants;

/**
 * 公共方法
 */
export default unsafeWindow.Tools = {
  noNumber: (str) => !/\d/.test(str),
  isTopWin: () => window.top === window,
  isNumber: (str) => /^[0-9]$/.test(str),
  scrollTop: (top) => window.scrollTo({ top }),
  alert: (...data) => window.alert(data.join(" ")),
  query: (selector, context) => querySelector(selector, context),
  querys: (selector, context) => querySelectorAll(selector, context),
  validDuration: (video) => !isNaN(video.duration) && video.duration !== Infinity,
  triggerClick: (ele) => ele?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  postMessage: (win = null, data) => win?.postMessage({ source: MSG_SOURCE, ...data }, "*"),
  isVisible: (ele) => !!(ele?.offsetWidth || ele?.offsetHeight || ele?.getClientRects().length),
  log: (...data) => console.log(...["%c===== 脚本日志 =====\n\n", "color:green;", ...data, "\n\n"]),
  preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
  getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
  hasClass: (element, ...classes) => classes.flat().some((cls) => element.classList.contains(cls)),
  getNumbers: (str) => (typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : []),
  getElementRect: (element) => element?.getBoundingClientRect(),
  notyf(msg, isError = false) {
    const notyf = new Notyf({ duration: ONE_SEC * 3, position: { x: "center", y: "top" } });
    isError ? notyf.error(msg) : notyf.success(msg);
    return false;
  },
  sendToIFrames(data) {
    this.getIFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
  },
  lastTimeMap: new Map(),
  isTooFrequent(key = "default", delay = ONE_SEC) {
    const now = Date.now();
    const lastTime = this.lastTimeMap.get(key) ?? 0;
    const isFrequent = now - lastTime < delay;
    this.lastTimeMap.set(key, now);
    return isFrequent;
  },
  getCenterPoint(element) {
    const { top, left, width, height } = this.getElementRect(element);
    return { centerX: left + width / 2, centerY: top + height / 2 }; // 元素中心点
  },
  pointInElement(pointX, pointY, element) {
    const { top, left, right, bottom } = this.getElementRect(element);
    return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom;
  },
  triggerMousemove(element) {
    if (!element) return;
    const { centerY } = this.getCenterPoint(element);
    for (let x = 0; x < element.offsetWidth; x += 10) this.dispatchMousemove(element, x, centerY);
  },
  dispatchMousemove(element, clientX, clientY) {
    const dict = { clientX, clientY, bubbles: true };
    element.dispatchEvent(new MouseEvent("mousemove", dict));
  },
  createObserver(target, callback) {
    const observer = new MutationObserver(callback);
    target = target instanceof Element ? target : this.query(target);
    observer.observe(target, { attributes: true, childList: true, subtree: true });
    return observer;
  },
  closest(element, selector, maxLevel = 3) {
    for (let level = 0; element && level < maxLevel; level++, element = element.parentElement) {
      if (element.matches(selector)) return element;
    }
    return null;
  },
  findSiblingInParent(element, selector, maxLevel = 3) {
    for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      for (const child of parent.children) {
        if (child !== element && child.matches(selector)) return child;
      }
    }
    return null;
  },
  getParentChain(element) {
    const parents = [];
    for (let current = element; current && current !== document.body; current = current.parentElement) {
      parents.unshift(this.getTagInfo(current));
      if (current.id && this.noNumber(current.id)) break;
    }
    return parents.join(" > ");
  },
  getTagInfo(ele) {
    if (ele.id && this.noNumber(ele.id)) return `#${ele.id}`;
    let tagInfo = ele.tagName.toLowerCase();
    const classList = Array.from(ele.classList);
    if (classList.length === 0) return tagInfo;
    // 检查是否包含特殊字符
    if (/[:\[\]]/.test(ele.className)) return `${tagInfo}[class="${ele.className}"]`;
    // 过滤数字类名
    const classes = classList.filter((cls) => this.noNumber(cls));
    return classes.length ? `${tagInfo}.${classes.join(".")}` : tagInfo;
  },
  getParents(element, withSelf = false, maxLevel = Infinity) {
    const parents = withSelf && element ? [element] : [];
    for (let current = element, level = 0; current && level < maxLevel; level++) {
      current = current.parentNode instanceof ShadowRoot ? current?.getRootNode()?.host : current?.parentElement;
      current && parents.unshift(current);
    }
    return parents;
  },
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash >>> 0;
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
    if (!node?.getRootNode()?.host) return;
    const currentParts = node.getAttribute("part")?.split(" ") || [];
    node.setAttribute("part", [...new Set([...currentParts, value])].join(" "));
  },
  removePart(node, value) {
    if (!node?.getRootNode()?.host) return;
    const parts = (node.getAttribute("part") || "").trim().split(/\s+/).filter(Boolean);
    const newValue = parts.filter((v) => v !== value).join(" ");
    newValue ? node.setAttribute("part", newValue) : node.removeAttribute("part");
  },
  togglePart(node, value) {
    node.getAttribute("part")?.includes(value) ? this.removePart(node, value) : this.setPart(node, value);
  },
};
