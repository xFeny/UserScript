import I18n from "../common/I18n";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Swal from "sweetalert2";

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  isAutoSite: () => Storage.THIS_SITE_AUTO.get(Tools.isTopWin() ? location.host : window?.topWin?.host),
  setupScriptMenuCommand() {
    if (this.hasMenu || !Tools.isTopWin() || Tools.isFrequent("menu")) return;
    this.setupMenuChangeListener();
    this.registMenuCommand();
    this.hasMenu = true;
  },
  setupMenuChangeListener() {
    const key = Storage.THIS_SITE_AUTO.name + location.host;
    GM_addValueChangeListener(key, () => this.registMenuCommand());
  },
  registMenuCommand() {
    const siteFn = ({ host, cache }) => cache.set(host, !cache.get(host));

    // 菜单配置项
    const configs = [
      { title: I18n.t(this.isAutoSite() ? "disAuto" : "enAuto"), cache: Storage.THIS_SITE_AUTO, useHost: true, fn: siteFn },
      { title: I18n.t("ignore"), cache: Storage.IGNORE_URLS, fn: this.ignoreUrlsPopup },
      { title: I18n.t("custom"), cache: Storage.CUSTOM_CONTAINER, useHost: true },
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
        host ? cache.set(host, input) : cache.set(input);
      });
    });
  },
  ignoreUrlsPopup({ title, cache }) {
    Swal.fire({
      width: 350,
      title: title,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: I18n.t("close"),
      html: Tools.safeHTML('<textarea id="ignoreUrls" spellcheck="false"></textarea>'),
      customClass: { container: "monkey-web-fullscreen" },
      didOpen(popup) {
        const textarea = Tools.query("#ignoreUrls", popup);
        textarea.oninput = () => cache.set(textarea.value); // 保存输入值
        textarea.value = cache.get(); // 赋值
      },
    });
  },
};
