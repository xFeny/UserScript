import Tools from "../common/Tools";
import Storage from "../common/Storage";
import I18n from "../common/I18n";

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  isAuto: () => Storage.IS_AUTO.get(window.topWin?.host ?? location.host),
  initMenuCmds() {
    if (this.hasMenu || !Tools.isTopWin()) return;
    GM_addValueChangeListener(Storage.IS_AUTO.name + location.host, () => this.setupMenuCmds());
    this.setupMenuCmds();
    this.hasMenu = true;
  },
  setupMenuCmds() {
    const host = location.host;
    const isAuto = I18n.t(this.isAuto() ? "disable" : "enable");
    const configs = [
      { title: isAuto, cache: Storage.IS_AUTO, fn: (cache, val) => cache.set(!val, host) },
      { title: I18n.t("ignore"), cache: Storage.IGNORE_URLS },
      { title: I18n.t("hidden"), cache: Storage.HIDE_ELEMENTS },
      { title: I18n.t("detach"), cache: Storage.DETACH_THRESHOLD },
      { title: I18n.t("custom"), cache: Storage.CUSTOM_CTN },
    ];

    // 注册菜单项
    configs.forEach(({ title, cache, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      this[id] = GM_registerMenuCommand(title, () => {
        const value = cache.get(host);
        if (fn) return fn.call(this, cache, value); // 自定义逻辑

        // 弹出输入框对话框
        const input = prompt(title, value);
        if (input !== null) cache.set(input, host);
      });
    });
  },
};
