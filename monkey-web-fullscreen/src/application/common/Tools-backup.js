import { Notyf } from "notyf";
import constants from "./Constants";
import { querySelector, querySelectorAll } from "shadow-dom-utils";

const { ONE_SEC, MSG_SOURCE } = constants;

/**
 * 公共方法
 */
export default {
  noNumber: (str) => !/\d/.test(str),
  isTopWin: () => window.top === window,
  isNumber: (str) => /^[0-9]$/.test(str),
  alert: (...data) => window.alert(data.join(" ")),
  scrollTop: (top) => unsafeWindow.top.scrollTo({ top }),
  query: (selector, context) => querySelector(selector, context),
  querys: (selector, context) => querySelectorAll(selector, context),
  validDuration: (video) => !isNaN(video.duration) && video.duration !== Infinity,
  triggerClick: (ele) => ele?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  postMessage: (win = null, data) => win?.postMessage({ source: MSG_SOURCE, ...data }, "*"),
  isVisible: (ele) => !!(ele?.offsetWidth || ele?.offsetHeight || ele?.getClientRects().length),
  log: (...data) => console.log(...["%c===== 脚本日志 =====\n\n", "color:green;", ...data, "\n\n"]),
  preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
  getFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
  getNumbers: (str) => (typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : []),
  haveSiblings: (element) => element?.parentElement?.children.length > 1,
  getElementRect: (element) => element?.getBoundingClientRect(),
  notyf(msg, isError = false) {
    const notyf = new Notyf({ duration: ONE_SEC * 3, position: { x: "center", y: "top" } });
    isError ? notyf.error(msg) : notyf.success(msg);
    return false;
  },
  postMsgToFrames(data) {
    this.getFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
  },
  lastTimeMap: new Map(),
  isTooFrequent(key = "default") {
    const now = Date.now();
    const lastTime = this.lastTimeMap.get(key) ?? 0;
    const isFrequent = now - lastTime < ONE_SEC;
    this.lastTimeMap.set(key, now);
    return isFrequent;
  },
  getElementCenterPoint(element) {
    const { top, left, width, height } = this.getElementRect(element);
    return { centerX: left + width / 2, centerY: top + height / 2 }; // 元素中心点
  },
  isPointInElement(pointX, pointY, element) {
    const { top, left, right, bottom } = this.getElementRect(element);
    return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom;
  },
  triggerMousemove(ele) {
    const { centerY } = this.getElementCenterPoint(ele);
    for (let x = 0; x < ele.offsetWidth; x += 10) this.dispatchMousemove(ele, x, centerY);
  },
  dispatchMousemove(element, clientX, clientY) {
    const dict = { clientX, clientY, bubbles: true };
    element.dispatchEvent(new MouseEvent("mousemove", dict));
  },
  triggerHover(element) {
    if (!element) return;
    this.log("悬停元素：", element);
    const { centerX, centerY } = this.getElementCenterPoint(element);
    const dict = { clientX: centerX, clientY: centerY, bubbles: true };
    element?.dispatchEvent(new MouseEvent("mouseover", dict));
  },
  triggerEscape() {
    const dict = { key: "Escape", keyCode: 27, bubbles: true };
    document.body?.dispatchEvent(new KeyboardEvent("keydown", dict)); // 触发键盘`esc`按键
  },
  createObserver(target, callback) {
    target = target instanceof Element ? target : this.query(target);
    const options = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    return observer;
  },
  closest(element, selector, maxLevel = 3) {
    let currLevel = 0;
    while (element && currLevel < maxLevel) {
      if (element.matches(selector)) return element;
      element = element.parentElement;
      currLevel++;
    }
    return null;
  },
  findSiblingInParent(element, selector, maxLevel = 3) {
    let currLevel = 0;
    let currParent = element?.parentElement;
    while (currParent && currLevel < maxLevel) {
      const sibs = currParent.children;
      for (let sib of sibs) {
        if (sib !== element && sib.matches(selector)) return sib;
      }
      currParent = currParent.parentElement;
      currLevel++;
    }
    return null;
  },
  getParentChain(element) {
    let parents = [];
    let current = element;
    while (current && current.tagName !== "BODY") {
      const tagInfo = this.getTagInfo(current);
      parents.unshift(tagInfo);
      if (current.id && this.noNumber(current.id)) break;
      current = current.parentElement;
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
  getParents(element, withSelf = false) {
    const parents = withSelf ? [element] : [];
    let current = element.parentElement;
    while (current && current !== document.body) {
      parents.unshift(current);
      current = current.parentElement;
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
};
