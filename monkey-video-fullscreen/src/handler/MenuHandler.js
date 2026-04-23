import Swal from "sweetalert2";
import I18n from "../common/I18n";
import Store from "../common/Store";
import Tools from "../common/Tools";

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

    const configs = [
      { title: isAuto, cache: Store.IS_AUTO, fn: ({ cache, value }) => cache.set(!value, this.host) },
      { title: I18n.t("custom"), cache: Store.V_WRAPPER },
      { title: I18n.t("detach"), cache: Store.DETACH_THRESHOLD },
      { title: I18n.t("setting"), cache: { name: "SETTING" }, fn: this.settingPopup },
    ];

    // 注册菜单项
    configs.forEach(({ title, cache, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      this[id] = GM_registerMenuCommand(title, () => {
        const value = cache.get?.(this.host);
        if (fn) return fn.call(this, { title, cache, value }); // 自定义逻辑

        // 弹出输入框对话框
        const input = prompt(title, value);
        if (input !== null) cache.set(input, this.host);
      });
    });
  },
  settingPopup() {
    const { html, eCache } = this.renderExtend();

    // 显示弹窗
    Swal.fire({
      html,
      width: 400,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: I18n.t("close"),
      customClass: { container: "vpx-popup" },
      didOpen(popup) {
        popup.oninput = ({ target: t }) => {
          const value = t.value;
          const { host, send } = t.dataset;
          if (send) Tools.postMessage(window, { [`sw_${t.name}`]: value });
          eCache[t.name].set(t.value, host);
        };
      },
    });
  },
  renderExtend() {
    const confs = [
      { name: "fsCode", text: I18n.t("fsCode"), cache: Store.FS_CODE, useHost: true, attrs: ["send"] },
      { name: "ignore", text: I18n.t("ignore"), cache: Store.IGNORE_URLS, useHost: true },
    ];

    return this.renderConfs(confs);
  },
  renderConfs(confs) {
    const render = ({ text, name, value, dataset }) => `
        <div class="vpx-textarea"><p>${text}</p>
          <textarea name="${name}" ${dataset} spellcheck="false" autocomplete="off">${value}</textarea>
        </div>`;

    return this.generate(confs, render);
  },
  generate(confs, render) {
    const finalConfs = confs.map((conf) => {
      const { cache, attrs = [], useHost } = conf;
      const props = attrs.map((key) => `data-${key}="true"`);
      if (useHost) props.push(`data-host="${this.host}"`);
      return { ...conf, dataset: props.join(""), value: cache.get(this.host) };
    });

    // 生成HTML字符串
    const html = finalConfs.map((conf) => render(conf)).join("");

    // name-cache 关系映射
    const eCache = Object.fromEntries(finalConfs.map((e) => [e.name, e.cache]));

    return { html, eCache };
  },
};
