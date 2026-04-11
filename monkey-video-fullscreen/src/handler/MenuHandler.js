import Tools from "../common/Tools";
import Store from "../common/Store";
import I18n from "../common/I18n";

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  isAuto: () => Store.IS_AUTO.get(window.topWin?.host ?? location.host),
  initMenuCmds() {
    if (this.hasMenu || !Tools.isTopWin()) return;
    GM_addValueChangeListener(Store.IS_AUTO.name + this.host, () => this.setupMenuCmds());
    this.setupMenuCmds();
    this.hasMenu = true;
  },
  setupMenuCmds() {
    const isAuto = I18n.t(this.isAuto() ? "disable" : "enable");
    const fsChange = ({ title, cache, value }) => {
      const input = prompt(title, value);
      if (input === null) return;
      cache.set(input, this.host);
      this.codeSnippetCache = null;
    };

    const configs = [
      { title: isAuto, cache: Store.IS_AUTO, fn: ({ cache, value }) => cache.set(!value, this.host) },
      { title: I18n.t("ignore"), cache: Store.IGNORE_URLS },
      { title: I18n.t("custom"), cache: Store.V_WRAPPER },
      { title: I18n.t("fsChange"), cache: Store.FS_CODE, fn: fsChange },
      { title: I18n.t("detach"), cache: Store.DETACH_THRESHOLD },
    ];

    // 注册菜单项
    configs.forEach(({ title, cache, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      this[id] = GM_registerMenuCommand(title, () => {
        const value = cache.get(this.host);
        if (fn) return fn.call(this, { title, cache, value }); // 自定义逻辑

        // 弹出输入框对话框
        const input = prompt(title, value);
        if (input !== null) cache.set(input, this.host);
      });
    });
  },
};
