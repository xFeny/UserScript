import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import constants from "./Constants";
import { querySelector, querySelectorAll } from "shadow-dom-utils";

const { ONE_SEC, MSG_SOURCE } = constants;

/**
 * 公共方法
 */
export default {
  isTopWin: () => window.top === window,
  noNumber: (str) => !/\d/.test(str),
  isNumber: (str) => /^[0-9]$/.test(str),
  scrollTop: (top) => unsafeWindow.top.scrollTo({ top }),
  query: (selector, context) => querySelector(selector, context),
  querys: (selector, context) => querySelectorAll(selector, context),
  validDuration: (video) => !isNaN(video.duration) && video.duration !== Infinity,
  triggerClick: (ele) => ele?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  postMessage: (win = null, data) => win?.postMessage({ source: MSG_SOURCE, ...data }, "*"),
  isVisible: (ele) => !!(ele?.offsetWidth || ele?.offsetHeight || ele?.getClientRects().length),
  log: (...data) => console.log(...["%c======= 脚本日志 =======\n\n", "color:green;font-size:14px;", ...data, "\n\n"]),
  alert: (...data) => window.alert(data.join(" ")),
  preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  },
  notyf(msg, isError = false) {
    const notyf = new Notyf({
      duration: ONE_SEC * 3,
      position: { x: "center", y: "top" },
    });
    isError ? notyf.error(msg) : notyf.success(msg);
    return false;
  },
  getFrames() {
    return this.querys("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])");
  },
  postMsgToFrames(data) {
    this.getFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
  },
  debounce(fn, delay = ONE_SEC) {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  },
  getElementRect(element) {
    return element?.getBoundingClientRect();
  },
  getElementCenterPoint(element) {
    const { top, left, width, height } = this.getElementRect(element);
    return { centerX: left + width / 2, centerY: top + height / 2 }; // 元素中心点
  },
  isPointInElementRect(pointX, pointY, element) {
    const { top, left, right, bottom } = this.getElementRect(element);
    return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom;
  },
  triggerMousemove(element) {
    const offsetWidth = element.offsetWidth;
    const { centerY } = this.getElementCenterPoint(element);
    for (let clientX = 0; clientX < offsetWidth; clientX += 10) {
      this.dispatchMousemove(element, clientX, centerY);
    }
  },
  dispatchMousemove(element, clientX, clientY) {
    const dict = { clientX, clientY, bubbles: true };
    const mousemove = new MouseEvent("mousemove", dict);
    element.dispatchEvent(mousemove);
  },
  triggerHoverEvent(element) {
    if (!element) return;
    this.log("网页全屏元素：", element);
    const { centerX, centerY } = this.getElementCenterPoint(element);
    const dict = { clientX: centerX, clientY: centerY, bubbles: true };
    const mouseover = new MouseEvent("mouseover", dict);
    element?.dispatchEvent(mouseover);
  },
  triggerEscapeEvent() {
    const dict = { key: "Escape", keyCode: 27, bubbles: true };
    const keydown = new KeyboardEvent("keydown", dict);
    document.body?.dispatchEvent(keydown); // 触发键盘`esc`按键
  },
  createObserver(target, callback) {
    target = target instanceof HTMLElement ? target : this.query(target);
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
    let currParent = element.parentElement;
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
  haveSiblings(element) {
    return element?.parentElement?.children.length > 1;
  },
  extractNumbers(str) {
    if (!str) return [];
    const numbers = str.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
  },
  getParentChain(element) {
    let parents = [];
    let current = element;
    while (current && current.tagName !== "BODY") {
      const tagInfo = this.getTagInfo(current);
      parents.unshift(tagInfo);
      if (current.id && this.noNumber(current.id)) break;
      current = current.parentNode;
    }
    return parents.join(" > ");
  },
  getTagInfo(ele) {
    if (ele.id && this.noNumber(ele.id)) return `#${ele.id}`;
    const classList = ele.classList;
    let tagInfo = ele.tagName.toLowerCase();
    if (!!classList.length) {
      if (/[:\[\]]/.test(ele.className)) {
        tagInfo += `[class="${ele.className}"]`;
      } else {
        const filterClass = Array.from(classList).filter((cls) => this.noNumber(cls));
        if (!!filterClass.length) tagInfo += `.${filterClass.join(".")}`;
      }
    }
    return tagInfo;
  },
};
