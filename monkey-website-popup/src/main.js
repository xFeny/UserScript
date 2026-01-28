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
    this.syncDataToIFrames(value);
    Promise.resolve().then(() => this.addStyle());
  },
  syncDataToIFrames(selector) {
    const iFrames = document.querySelectorAll("iframe");
    iFrames.forEach((el) => this.postMessage(el?.contentWindow, { selector }));
  },
  setupEventListener() {
    if (this.isTopWin()) return;
    window.addEventListener("message", ({ data }) => {
      if (!data?.source?.includes(MSG_SOURCE)) return;
      if ("selector" in data) this.refreshStyle(data.selector);
    });
  },
  init() {
    this.addStyle();
    this.setupMenuCmds();
    this.setupEventListener();
  },
};

App.init();
