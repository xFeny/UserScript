import Tools from "../common/Tools";
import Storage from "../common/Storage";

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
    const isAuto = `此站${this.isAuto() ? "禁" : "启"}用自动网页全屏`;
    const configs = [
      { title: isAuto, cache: Storage.IS_AUTO, fn: (cache, val) => cache.set(!val, host) },
      { title: "此站脱离式全屏阈值", cache: Storage.DETACH_THRESHOLD },
      { title: "自动时忽略的网址", cache: Storage.IGNORE_URLS },
      { title: "自定义视频容器", cache: Storage.CUSTOM_CTN },
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
