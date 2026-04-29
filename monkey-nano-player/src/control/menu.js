import Store from "../common/Store";

export default {
  initMenuCmds() {
    if (FyTools.isExecuted("hasMenu", window)) return;
    GM_addValueChangeListener(Store.ENABLE_NANO.name + this.host, () => this.setupMenuCmds());
    this.setupMenuCmds();
  },
  setupMenuCmds() {
    const isHide = !FyTools.hasMoveBefore();
    const enableNano = `此站${Store.ENABLE_NANO.get(this.host) ? "禁" : "启"}用悬浮小窗`;

    // 菜单配置项
    const configs = [
      { title: "设置小窗的宽高", cache: Store.NANO_SIZE, isHide, fn: this.inputNanoSize },
      { title: "小窗视口监测元素", cache: Store.INTERSECT_ELEMENT, useHost: true, isHide, fn: this.setIntersect },
      { title: enableNano, cache: Store.ENABLE_NANO, useHost: true, isHide, fn: this.setNanoEnabled },
      { title: "此站网址黑名单", cache: Store.IGNORE_URLS, useHost: true, isHide },
    ];

    // 注册菜单项
    configs.forEach(({ title, isHide, useHost, cache, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      if (isHide) return;

      const host = useHost ? this.host : "";
      this[id] = GM_registerMenuCommand(title, () => {
        if (fn) return fn.call(this, { host, cache, title }); // 自定义逻辑

        // 弹出输入框对话框
        const input = prompt(title, cache.get(host));
        if (input !== null) cache.set(input, host);
      });
    });
  },
  setIntersect({ host, cache, title }) {
    const input = prompt(title, cache.get(host));
    if (input !== null) (cache.set(input, host), this.createNanoObserver());
  },
  // 是否启用悬浮小窗
  setNanoEnabled({ host, cache, title }) {
    const isEnable = !cache.get(host);
    isEnable ? this.createNanoObserver() : this.activateNano(false);
    cache.set(isEnable, host);
  },
  // 设置小窗宽高
  inputNanoSize({ host, cache, title }) {
    const input = prompt(title, cache.get(host));
    if (input !== null) (cache.set(input, host), this.setNanoStyleSize());
  },
};
