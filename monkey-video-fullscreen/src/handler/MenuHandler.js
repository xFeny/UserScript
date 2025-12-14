import I18n from "../common/I18n";
import Tools from "../common/Tools";
import Storage from "../common/Storage";
import Consts from "../common/Consts";

const { THIS_SITE_AUTO } = Storage;

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  isAutoSite: () => THIS_SITE_AUTO.get(Tools.isTopWin() ? location.host : window?.topWin?.host),
  setupScriptMenuCommand() {
    if (this.hasMenu || !Tools.isTopWin() || Tools.isFrequent("menu")) return;
    this.setupMenuChangeListener();
    this.registMenuCommand();
    this.hasMenu = true;
  },
  setupMenuChangeListener() {
    [THIS_SITE_AUTO.name + location.host].forEach((key) => GM_addValueChangeListener(key, () => this.registMenuCommand()));
  },
  registMenuCommand() {
    const siteFun = ({ host, cache }) => cache.set(host, !cache.get(host));

    // 菜单配置项
    const configs = [
      { title: I18n.t(this.isAutoSite() ? "disable" : "enable"), cache: THIS_SITE_AUTO, useHost: true, fn: siteFun },
      { title: I18n.t("ignore"), cache: Storage.IGNORE_URLS, useHost: true },
      { title: I18n.t("custom"), cache: Storage.CUSTOM_CONTAINER },
      { title: I18n.t("step"), cache: Storage.SPEED_STEP },
    ];

    // 注册菜单项
    configs.forEach(({ title, useHost, cache, isHidden, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      if (isHidden) return;

      const host = useHost ? location.host : Consts.EMPTY;
      this[id] = GM_registerMenuCommand(title, () => {
        if (fn) return fn.call(this, { host, cache, title }); // 自定义逻辑

        // 弹出输入框对话框
        const input = prompt(title, host ? cache.get(host) : cache.get());
        if (input && cache.parser(input)) host ? cache.set(host, input) : cache.set(input);
      });
    });
  },
};
