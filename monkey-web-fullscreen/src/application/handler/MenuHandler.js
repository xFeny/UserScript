import Store from "../common/Store";
import Consts from "../common/Consts";
import Tools from "../common/Tools";
import Site from "../common/Site";
import Swal from "sweetalert2";

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  unUsedRate: () => Store.DISABLE_RATE.get(),
  isOverrideKey: () => Store.OVERRIDE_KEY.get(),
  isAutoSite: () => Store.SITE_AUTO.get(window.topWin?.host ?? location.host),
  initMenuCmds() {
    if (Tools.isExecuted("hasMenu") || !Tools.isTopWin()) return;
    this.setupMenuChangeListener();
    this.setupMenuCmds();
  },
  setupMenuChangeListener() {
    [Store.SITE_AUTO].forEach((t) => GM_addValueChangeListener(t.name + this.host, () => this.setupMenuCmds()));
  },
  setupMenuCmds() {
    const tle = `此站${this.isAutoSite() ? "禁" : "启"}用自动网页全屏`;
    const sFn = ({ host, cache }) => cache.toggle(host);

    // 菜单配置项
    const configs = [
      { title: tle, cache: Store.SITE_AUTO, useHost: true, isHide: Site.isGmMatch(), fn: sFn },
      { title: "此站脱离式全屏阈值", cache: Store.DETACH_THRESHOLD, useHost: true, isHide: Site.isGmMatch() },
      { title: "快捷键说明", cache: { name: "SHORTCUTKEY" }, fn: this.shortcutKeysPopup },
      { title: "更多设置", cache: { name: "SETTING" }, fn: this.settingPopup },
    ];

    // 注册菜单项
    configs.forEach(({ title, isHide, useHost, cache, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      if (isHide) return;

      const host = useHost ? this.host : Consts.EMPTY;
      this[id] = GM_registerMenuCommand(title, () => {
        if (fn) return fn.call(this, { host, cache, title }); // 自定义逻辑

        // 弹出输入框对话框
        const input = prompt(title, cache.get(host));
        if (input !== null) cache.set(input, host);
      });
    });
  },
  shortcutKeysPopup() {
    const keys = [
      { key: "Enter", desc: "全屏" },
      { key: "P", desc: "网页全屏" },
      { key: "N", desc: "切换下集" },
      { key: "R", desc: "旋转 90°" },
      { key: "M", desc: "静音切换" },
      { key: "D", desc: "弹幕切换" },
      { key: "K / L", desc: "上下帧" },
      { key: "Ctrl Z", desc: "复位缩移" },
      { key: "Shift R", desc: "水平镜像" },
      { key: "Shift A", desc: "🔛自动下集" },
      { key: "Ctrl Alt S", desc: "截图" },
      { key: "Alt + / -", desc: "缩放" },
      { key: "Alt ◀️🔼", desc: "移动" },
      { key: "A / S 或 + / -", desc: "±倍速" },
      { key: "Ctrl 1️~5️", desc: "预设倍速" },
      { key: "1️~9️", desc: "1️~9️ 倍速" },
      { key: "数字 0️", desc: "快进 N 秒" },
      { key: "◀️▶️", desc: "快退/进 (默禁)" },
      { key: "空格", desc: "播放/暂停 (默禁)" },
    ];

    // 偶数索引时创建新行，奇数索引时补充到上一行
    const rows = keys.reduce((acc, it, i) => {
      if (i % 2) return acc;

      const next = keys[i + 1] || { key: Consts.EMPTY, desc: Consts.EMPTY };
      return acc + `<tr><td>${it.key}</td><td>${it.desc}</td><td>${next.key}</td><td>${next.desc}</td></tr>`;
    }, Consts.EMPTY);

    Swal.fire({
      width: 650,
      title: "快捷键说明",
      showCancelButton: true,
      cancelButtonText: "关闭",
      showConfirmButton: false,
      customClass: { container: "vpx-popup" },
      html: Tools.safeHTML(`<table><tr><th>快捷键</th><th>说明</th><th>快捷键</th><th>说明</th></tr>${rows}</table>`),
    });
  },
  settingPopup() {
    const cacheMap = {};
    const tabConfs = ["控制:Basics", "参数:Params", "忽略:Ignore", "全屏:Full", "下集:Next", "高级:Extend"];

    // 创建容器
    const header = Tools.newEle("div", { className: "vpx-tabs-header" });
    const content = Tools.newEle("div", { className: "vpx-tabs-content" });

    tabConfs.forEach((conf, i) => {
      const tabId = `tab_${i}`;
      const cur = i ? "" : "active";
      const [textContent, method] = conf.split(":");
      const { html, eCache } = this[`render${method}`]();

      // 插入元素
      header.append(Tools.newEle("div", { tabId, className: `vpx-tab ${cur}`, textContent }));
      content.append(Tools.newEle("div", { className: `vpx-tab-panel ${tabId} ${cur}`, innerHTML: html }));

      // 合并缓存映射到总cacheMap
      Object.assign(cacheMap, eCache);
    });

    const tabs = Tools.newEle("div", { className: "vpx-tabs" });
    tabs.append(header, content);

    // 显示弹窗
    Swal.fire({
      width: 400,
      html: tabs,
      title: "设置",
      showCancelButton: true,
      cancelButtonText: "关闭",
      showConfirmButton: false,
      customClass: { container: "vpx-popup" },
      didOpen(popup) {
        // 处理Tabs切换
        popup.onclick = ({ target: t }) => {
          if (!t.matches(".vpx-tab")) return;
          Tools.querys(".active", popup).forEach((el) => Tools.delCls(el, "active"));
          Tools.query(`.${t.tabId}`, popup).classList.add("active");
          t.classList.add("active");
        };

        // 输入事件监听
        popup.oninput = ({ target: t }) => {
          const cache = cacheMap[t.name];
          const { host, send, delay } = t.dataset;
          const value = Object.is(t.type, "checkbox") ? t.checked : t.value;
          if (send) Tools.postMessage(window, { [`sw_${t.name}`]: value });
          const setCache = () => (host ? cache.set(value, host) : cache.set(value));
          delay ? setTimeout(setCache, 50) : setCache();
        };
      },
    });
  },
  renderBasics() {
    const confs = [
      { name: "autoDef", text: "禁用 默认自动", cache: Store.NO_AUTO_DEF },
      { name: "speed", text: "禁用 倍速调节", cache: Store.DISABLE_RATE, attrs: ["send", "delay"] },
      { name: "memory", text: "禁用 记忆倍速", cache: Store.FORGET_RATE, attrs: ["send"] },
      { name: "tabs", text: "禁用 不可见暂停", cache: Store.INVIS_PAUSE },
      { name: "next", text: "启用 自动切换下集", cache: Store.NEXT_AUTO },
      { name: "wClock", text: "启用 非全屏显时间", cache: Store.CLOCK_WEB, attrs: ["send"] },
      { name: "sRate", text: "启用 左上角常显倍速", cache: Store.RATE_SHOW, attrs: ["send"] },
      { name: "override", text: "启用 空格◀️▶️ 控制", cache: Store.OVERRIDE_KEY },
    ];

    const render = ({ text, name, value, dataset }) => `
        <label class="vpx-input">${text}
          <input name="${name}" ${value ? "checked" : ""} ${dataset} type="checkbox"/>
          <span class="toggle-track"></span>
        </label>`;

    return this.generate(confs, render);
  },
  renderParams() {
    const confs = [
      { name: "step", text: "倍速步进", cache: Store.RATE_STEP },
      { name: "skip", text: "快进/退秒数", cache: Store.SKIP_INTERVAL },
      { name: "zero", text: "零键快进秒数", cache: Store.ZERO_KEY_SKIP },
      { name: "advance", text: "下集提前秒数", cache: Store.NEXT_ADVANCE },
      { name: "percent", text: "缩放百分比", cache: Store.ZOOM_PERCENT },
      { name: "move", text: "移动距离", cache: Store.MOVE_DIST },
      { name: "color", text: "时间颜色", cache: Store.CLOCK_COLOR, attrs: ["send"] },
      { name: "preset", text: "常用倍速", cache: Store.PRESET_RATE },
    ];

    const render = ({ text, name, value, dataset }) => `
        <label class="vpx-input">${text}
          <input name="${name}" value="${value}" ${dataset} type="text" autocomplete="off"/>
        </label>`;

    return this.generate(confs, render);
  },
  renderIgnore() {
    const confs = [
      { name: "nextUrls", text: "自动切换下集时 忽略的网址（用 ; 隔开）", cache: Store.NEXT_IGNORE_URLS },
      { name: "wFsUrls", text: "自动网页全屏时 忽略的网址（用 ; 隔开）", cache: Store.FULL_IGNORE_URLS },
    ];

    return this.renderConfs(confs);
  },
  renderFull() {
    const confs = [
      { name: "vWrap", text: "此站 (网页)全屏视频容器", cache: Store.V_WRAPPER, disable: this.isGMatch(), useHost: true },
      { name: "fsCode", text: "此站 (网页)全屏切换 事件代码", cache: Store.FS_CODE, useHost: true, attrs: ["send"] },
    ];

    return this.renderConfs(confs);
  },
  renderNext() {
    const confs = [
      { name: "curEp", text: "此站 当前播放集选择器", cache: Store.NEXT_CUR_EP, useHost: true, disable: Site.isGmMatch() },
      { name: "allEp", text: "此站 定位全部集选择器", cache: Store.NEXT_REL_EP, useHost: true, disable: Site.isGmMatch() },
    ];

    return this.renderConfs(confs);
  },
  renderExtend() {
    const confs = [
      { name: "lCode", text: "此站 load 事件代码", cache: Store.LOAD_CODE, useHost: true, attrs: ["send"] },
      { name: "vCode", text: "此站 video 事件代码", cache: Store.VIDEO_CODE, useHost: true, attrs: ["send"] },
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
      const { cache, attrs = [], useHost, disable } = conf;
      const host = useHost ? this.host : Consts.EMPTY;

      const props = attrs.map((key) => `data-${key}="true"`);
      if (host) props.push(`data-host="${host}"`);
      if (disable) props.push(`disabled`);

      return { ...conf, dataset: props.join(Consts.EMPTY), value: cache.get(host) };
    });

    // 生成HTML字符串
    const html = finalConfs.map((conf) => render(conf)).join(Consts.EMPTY);

    // name-cache 关系映射
    const eCache = Object.fromEntries(finalConfs.map((e) => [e.name, e.cache]));

    return { html, eCache };
  },
};
