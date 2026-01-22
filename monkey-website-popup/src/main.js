const cssText = "width:0!important;height:0!important;opacity:0!important;display:none!important;";

const App = {
  getCache: () => GM_getValue(location.host),
  setCache: (value) => GM_setValue(location.host, value),
  addStyle(id = "gm_hide_some") {
    const selector = this.getCache();
    document.querySelector(`#${id}`)?.remove();
    selector && GM_addElement("style", { id, textContent: `${selector}{${cssText}}` });
  },
  setupMenuCmds() {
    const title = "此站要隐藏的元素";
    GM_registerMenuCommand(title, () => {
      const input = prompt(title, this.getCache());
      if (input !== null) (this.setCache(input), this.addStyle());
    });
  },
  init() {
    this.addStyle();
    this.setupMenuCmds();
  },
};

App.init();
