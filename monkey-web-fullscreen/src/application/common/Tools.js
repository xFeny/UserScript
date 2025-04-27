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
  log: (...data) => console.log(...["%c******* 脚本日志 *******\n", "color:green;font-size:16px;", ...data]),
  postMsgToFrames(data) {
    this.querys("iframe:not([src=''])").forEach((iframe) => this.postMessage(iframe.contentWindow, data));
  },
  debounce(fn, delay = ONE_SEC) {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  },
  triggerMousemoveEvent(element) {
    const offsetWidth = element.offsetWidth;
    const clientY = element.offsetHeight / 2;
    const moveEvt = (clientX) => {
      const dict = { clientX, clientY, bubbles: true };
      const mousemove = new MouseEvent("mousemove", dict);
      element.dispatchEvent(mousemove);
    };
    for (let i = 0; i < offsetWidth; i += 10) moveEvt(i);
  },
  triggerMouseoverEvent(element) {
    if (!element) return;
    console.log("鼠标悬停元素：", element);
    const clientX = element?.offsetWidth / 2 || 0;
    const clientY = element?.offsetHeight / 2 || 0;
    const dict = { clientX, clientY, bubbles: true };
    const mouseover = new MouseEvent("mouseover", dict);
    element?.dispatchEvent(mouseover);
  },
  triggerEscapeEvent(element) {
    if (!element) return;
    const dict = { key: "Escape", keyCode: 27, bubbles: true };
    const keydown = new KeyboardEvent("keydown", dict);
    element?.dispatchEvent(keydown); // 触发键盘`esc`按键
  },
  createObserver(target, callback) {
    target = target instanceof HTMLElement ? target : this.query(target);
    const options = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    return observer;
  },
};
