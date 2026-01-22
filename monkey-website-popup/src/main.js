const MSG_SOURCE = "GM_HIDE_SOME";
const cssText = "width:0!important;height:0!important;opacity:0!important;display:none!important;";

const App = {
  isTopWin: () => window === window.top,
  getCache: () => GM_getValue(location.host),
  setCache: (value) => GM_setValue(location.host, value),
  postMessage: (win, data) => win?.postMessage({ source: MSG_SOURCE, ...data }, "*"),
  addStyle(id = "gm_hide_some") {
    const selector = this.getCache();
    document.querySelector(`#${id}`)?.remove();
    selector && GM_addElement("style", { id, textContent: `${selector}{${cssText}}` });
  },
  setupMenuCmds() {
    if (!this.isTopWin()) return;
    const title = "此站要隐藏的元素";
    GM_registerMenuCommand(title, () => {
      const input = prompt(title, this.getCache());
      if (input !== null) this.refreshStyle(input);
    });
  },
  refreshStyle(value) {
    this.setCache(value);
    Promise.resolve().then(() => this.addStyle());
    if (this.isTopWin()) this.syncDataToIFrames();
  },
  syncDataToIFrames() {
    const selector = this.getCache();
    const iFrames = document.querySelectorAll("iframe");
    iFrames.forEach((el) => this.postMessage(el?.contentWindow, { selector }));
  },
  setupEventListener() {
    window.addEventListener("message", ({ data }) => {
      if (!data?.source === MSG_SOURCE) return;
      if (data?.sync) this.syncDataToIFrames();
      if ("selector" in data) this.refreshStyle(data.selector);
    });

    // iframe 向 window.top 发起同步数据请求
    if (this.isTopWin()) return;
    document.addEventListener("DOMContentLoaded", () => {
      this.postMessage(window.top, { sync: true });
    });
  },
  init() {
    this.addStyle();
    this.setupMenuCmds();
    this.setupEventListener();
  },
};

App.init();
