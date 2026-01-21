const App = {
  getValue: () => GM_getValue(location.host),
  setValue: (value) => GM_setValue(location.host, value),
  addStyle(id = "gm_hide_some") {
    const cssText = "width:0!important;height:0!important;opacity:0!important;display:none!important;";

    const value = this.getValue();
    document.querySelector(`#${id}`)?.remove();
    value && GM_addElement("style", { id, textContent: `${value}{${cssText}}` });
  },
  setupMenuCmds() {
    const title = "此站要隐藏的元素";
    GM_registerMenuCommand(title, () => {
      const input = prompt(title, this.getValue());
      if (input !== null) (this.setValue(input), this.addStyle());
    });
  },
  init() {
    this.addStyle();
    this.setupMenuCmds();
  },
};

App.init();
