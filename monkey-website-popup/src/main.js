const Consts = Object.freeze({
  HIDE: "gm_hide_some",
  CUSTOM: "gm_custom_some",
  MSG_SOURCE: "GM_DEFINE_SOME_STYLE",
});

const App = {
  isTopWin: () => window === window.top,
  getCache: (key = location.host) => GM_getValue(key),
  setCache: (value, key = location.host) => GM_setValue(key, value),
  postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
  setupMenuCmds() {
    if (!this.isTopWin()) return;

    [
      { title: "此站要隐藏的元素", key: undefined, fn: this.setHideStyle },
      { title: "此站自定义的样式", key: Consts.CUSTOM, fn: this.setCustomStyle },
    ].forEach(({ title, key, fn }) => {
      GM_registerMenuCommand(title, () => {
        const input = prompt(title, this.getCache(key));
        if (input !== null) fn.call(this, input);
      });
    });
  },
  /**
   * 自定义的样式
   * @param {String} style 自定义的样式
   * @param {String} setCache 是否更新缓存
   */
  setCustomStyle(style, setCache = true) {
    if (setCache) (this.setCache(style, Consts.CUSTOM), this.syncDataToIFrames({ style }));
    Promise.resolve().then(() => this.addStyle(Consts.CUSTOM, style));
  },
  /**
   * 要隐藏的元素
   * @param {String} selector 元素选择器
   * @param {String} setCache 是否更新缓存
   */
  setHideStyle(selector, setCache = true) {
    if (setCache) (this.setCache(selector), this.syncDataToIFrames({ selector }));
    const cssText = "width:0!important;height:0!important;opacity:0!important;display:none!important;";
    Promise.resolve().then(() => this.addStyle(Consts.HIDE, `${selector}{${cssText}}`));
  },
  /**
   * 添加样式
   * @param {String} id id 唯一标识符
   * @param {String} textContent 文本内容
   */
  addStyle(id, textContent) {
    document.querySelector(`#${id}`)?.remove();
    textContent && GM_addElement("style", { id, textContent });
    return this;
  },
  /**
   * 同步数据至 iframe
   * @param {*} data 发送的数据
   */
  syncDataToIFrames(data) {
    const iFrames = document.querySelectorAll("iframe");
    iFrames.forEach((el) => this.postMessage(el?.contentWindow, data));
  },
  setupEventListener() {
    if (this.isTopWin()) return;
    window.addEventListener("message", ({ data }) => {
      if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
      if ("style" in data) this.setCustomStyle(data.style);
      if ("selector" in data) this.setHideStyle(data.selector);
    });
  },
  initStyle() {
    this.setHideStyle(this.getCache(), false);
    this.setCustomStyle(this.getCache(Consts.CUSTOM), false);
  },
  init() {
    this.initStyle();
    this.setupMenuCmds();
    this.setupEventListener();
  },
};

App.init();
