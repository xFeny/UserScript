import constants from "./Constants";
const { ONE_SEC, MSG_SOURCE } = constants;
/**
 * 公共方法
 */
export default {
  isTopWin: () => window.top === window,
  isNumber: (str) => /^[0-9]$/.test(str),
  scrollTop: (top) => unsafeWindow.top.scrollTo({ top }),
  query: (selector, context) => (context || document).querySelector(selector),
  querys: (selector, context) => (context || document).querySelectorAll(selector),
  validDuration: (video) => !isNaN(video.duration) && video.duration !== Infinity,
  triggerClick: (ele) => ele?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  postMessage: (win = null, data) => win?.postMessage({ source: MSG_SOURCE, ...data }, "*"),
  isVisible: (ele) => !!(ele?.offsetWidth || ele?.offsetHeight || ele?.getClientRects().length),
  log: (...data) => console.log(...["%c======= 脚本日志 =======\n\n", "color:green;font-size:14px;", ...data, "\n\n"]),
  alert: (...data) => window.alert(data.join(" ")),
  getFrames() {
    return this.querys("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])");
  },
  postMsgToFrames(data) {
    this.getFrames().forEach((iframe) => this.postMessage(iframe.contentWindow, data));
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
    let curLevel = 0;
    while (element && curLevel < maxLevel) {
      if (element.matches(selector)) return element;
      element = element.parentElement;
      curLevel++;
    }
    return null;
  },
  findSiblingInParent(element, selector, maxLevel = 3) {
    let curLevel = 0;
    let curParent = element.parentElement;
    while (curParent && curLevel < maxLevel) {
      const sibs = curParent.children;
      for (let sib of sibs) {
        if (sib !== element && sib.matches(selector)) return sib;
      }
      curParent = curParent.parentElement;
      curLevel++;
    }
    return null;
  },
  hasSiblings(element) {
    return element.parentElement.children.length > 1;
  },
  extractNumbers(str) {
    // 提取字符串中的数字
    const numbers = str.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
  },
  compareUrls(url1, url2) {
    const parseUrl = (url) => {
      const parsed = new URL(url);
      return parsed.host + parsed.pathname + parsed.search + parsed.hash;
    };
    return parseUrl(url1) === parseUrl(url2);
  },
};
