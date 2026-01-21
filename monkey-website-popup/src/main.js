const App = {
  addStyle() {
    const css = "width:0!important;height:0!important;opacity:0!important;display:none!important;";
    GM_addStyle(`${this.getValue()}{${css}}`);
  },
  getValue: () => GM_getValue(location.host),
  setValue: (value) => GM_setValue(location.host, value),
  setupMenuCmds() {
    const title = "此站要隐藏的元素";
    GM_registerMenuCommand(title, () => {
      const input = prompt(title, this.getValue());
      if (input !== null) (this.setValue(input), input && this.addStyle());
    });
  },
  init() {
    this.addStyle();
    this.setupMenuCmds();
  },
};

App.init();
