import Storage from "../common/Storage";
import Consts from "../common/Consts";
import Tools from "../common/Tools";
import Site from "../common/Site";
import Swal from "sweetalert2";

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  unUsedRate: () => Storage.DISABLE_SPEED.get(),
  isOverrideKey: () => Storage.OVERRIDE_KEY.get(),
  isAutoSite: () => Storage.IS_SITE_AUTO.get(window.topWin?.host ?? location.host),
  initMenuCmds() {
    if (Tools.isExecuted("hasMenu") || !Tools.isTopWin()) return;
    this.setupMenuStorageListener();
    this.setupMenuCmds();
  },
  setupMenuStorageListener() {
    [Storage.IS_SITE_AUTO, Storage.CURRENT_EPISODE].forEach((it) =>
      GM_addValueChangeListener(`${it.name}${this.host}`, () => this.setupMenuCmds())
    );
  },
  setupMenuCmds() {
    const epHide = !Storage.CURRENT_EPISODE.get(this.host);
    const tle = `此站${this.isAutoSite() ? "禁" : "启"}用自动网页全屏`;
    const sFn = ({ host, cache }) => cache.set(!cache.get(host), host);
    const delFn = ({ host }) => Storage.CURRENT_EPISODE.del(host) & Storage.RELATIVE_EPISODE.del(host);

    // 菜单配置项
    const configs = [
      { title: tle, cache: Storage.IS_SITE_AUTO, useHost: true, isHide: Site.isGmMatch(), fn: sFn },
      { title: "此站脱离式全屏阈值", cache: Storage.DETACH_THRESHOLD, useHost: true, isHide: Site.isGmMatch() },
      { title: "删除此站剧集选择器", cache: Storage.CURRENT_EPISODE, useHost: true, isHide: epHide, fn: delFn },
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
      customClass: { container: "monkey-web-fullscreen" },
      html: Tools.safeHTML(`<table><tr><th>快捷键</th><th>说明</th><th>快捷键</th><th>说明</th></tr>${rows}</table>`),
    });
  },
  settingPopup() {
    const [a, b, c, d, e] = [this.genBasics(), this.genParams(), this.genIgnore(), this.genFull(), this.genCode()];
    const cacheMap = Object.assign({}, ...[a, b, c, d, e].map((it) => it.eCache));

    const html = `
        <div class="swal2-tabs">
          <div class="swal2-tabs-header">
              <div class="swal2-tab active" data-id="tab1">控制</div>
              <div class="swal2-tab" data-id="tab2">参数</div>
              <div class="swal2-tab" data-id="tab3">忽略</div>
              <div class="swal2-tab" data-id="tab4">全屏</div>
              <div class="swal2-tab" data-id="tab5">增强</div>
          </div>
          <div class="swal2-tabs-content">
            <div class="swal2-tab-panel active" id="tab1">${a.html}</div>
            <div class="swal2-tab-panel" id="tab2">${b.html}</div>
            <div class="swal2-tab-panel" id="tab3">${c.html}</div>
            <div class="swal2-tab-panel" id="tab4">${d.html}</div>
            <div class="swal2-tab-panel" id="tab5">${e.html}</div>
          </div>
        </div>`;

    Swal.fire({
      width: 400,
      title: "设置",
      showCancelButton: true,
      cancelButtonText: "关闭",
      showConfirmButton: false,
      html: Tools.safeHTML(html),
      customClass: { container: "monkey-web-fullscreen" },
      didOpen(popup) {
        // 处理Tabs切换
        popup.onclick = ({ target: tab }) => {
          if (!tab.matches(".swal2-tab")) return;
          Tools.querys(".active", popup).forEach((el) => Tools.delCls(el, "active"));
          Tools.query(`#${tab.dataset.id}`, popup).classList.add("active");
          tab.classList.add("active");
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
  genBasics() {
    const confs = [
      { name: "autoDef", text: "禁用 默认自动", cache: Storage.NO_AUTO_DEF },
      { name: "speed", text: "禁用 倍速调节", cache: Storage.DISABLE_SPEED, attrs: ["send", "delay"] },
      { name: "memory", text: "禁用 记忆倍速", cache: Storage.NOT_CACHE_SPEED, attrs: ["send"] },
      { name: "tabs", text: "禁用 不可见暂停", cache: Storage.IS_INVISIBLE_PAUSE },
      { name: "next", text: "启用 自动切换下集", cache: Storage.IS_AUTO_NEXT },
      { name: "wClock", text: "启用 非全屏显时间", cache: Storage.PAGE_CLOCK, attrs: ["send"] },
      { name: "sRate", text: "启用 左上角常显倍速", cache: Storage.RATE_KEEP_SHOW, attrs: ["send"] },
      { name: "override", text: "启用 空格◀️▶️ 控制", cache: Storage.OVERRIDE_KEY },
    ];

    const render = ({ text, name, value, dataset }) => `
        <label class="__menu">${text}
          <input name="${name}" ${value ? "checked" : ""} ${dataset} type="checkbox"/>
          <span class="toggle-track"></span>
        </label>`;

    return this.generate(confs, render);
  },
  genParams() {
    const confs = [
      { name: "step", text: "倍速步进", cache: Storage.SPEED_STEP },
      { name: "skip", text: "快进/退秒数", cache: Storage.SKIP_INTERVAL },
      { name: "zero", text: "零键快进秒数", cache: Storage.ZERO_KEY_SKIP },
      { name: "advance", text: "下集提前秒数", cache: Storage.NEXT_ADVANCE_SEC },
      { name: "percent", text: "缩放百分比", cache: Storage.ZOOM_PERCENT },
      { name: "move", text: "移动距离", cache: Storage.MOVING_DISTANCE },
      { name: "color", text: "时间颜色", cache: Storage.CLOCK_COLOR, attrs: ["send"] },
      { name: "preset", text: "常用倍速", cache: Storage.PRESET_SPEED },
    ];

    const render = ({ text, name, value, dataset }) => `
        <label class="__menu">${text}
          <input name="${name}" value="${value}" ${dataset} type="text" autocomplete="off"/>
        </label>`;

    return this.generate(confs, render);
  },
  genIgnore() {
    const confs = [
      { name: "ignoreNext", text: "自动切换下集时忽略的网址（用 ; 隔开）", cache: Storage.NEXT_IGNORE_URLS },
      { name: "ignoreFs", text: "自动网页全屏时忽略的网址（用 ; 隔开）", cache: Storage.FULL_IGNORE_URLS },
    ];

    const render = ({ text, name, value, dataset, disable }) => `
        <div class="text-group"><p>${text}</p>
          <textarea name="${name}" ${dataset} ${disable ? "disabled" : ""} spellcheck="false" autocomplete="off">${value}</textarea>
        </div>`;

    return this.generate(confs, render);
  },
  genFull() {
    const confs = [
      { name: "custCtn", text: "此站(网页)全屏视频容器", cache: Storage.CUSTOM_CTN, disable: this.isGMatch(), useHost: true },
      { name: "fsCode", text: "此站(网页)全屏切换扩展代码", cache: Storage.FULL_CHANGE_CODE, useHost: true, attrs: ["send"] },
    ];

    const render = ({ text, name, value, dataset, disable }) => `
        <div class="text-group"><p>${text}</p>
          <textarea name="${name}" ${dataset} ${disable ? "disabled" : ""} spellcheck="false" autocomplete="off">${value}</textarea>
        </div>`;

    return this.generate(confs, render);
  },
  genCode() {
    const confs = [
      { name: "lCode", text: "此站 load 事件扩展代码", cache: Storage.LOAD_EVT_CODE, useHost: true, attrs: ["send"] },
      { name: "vCode", text: "此站视频事件扩展代码", cache: Storage.VIDEO_EVT_CODE, useHost: true, attrs: ["send"] },
    ];

    const render = ({ text, name, value, dataset, disable }) => `
        <div class="text-group"><p>${text}</p>
          <textarea name="${name}" ${dataset} ${disable ? "disabled" : ""} spellcheck="false" autocomplete="off">${value}</textarea>
        </div>`;

    return this.generate(confs, render);
  },
  generate(confs, render) {
    const finalConfs = confs.map((conf) => {
      const { cache, attrs = [], useHost } = conf;
      const host = useHost ? this.host : Consts.EMPTY;

      let dataset = attrs.map((key) => `data-${key}="true"`).join(" ");
      if (host) dataset = `${dataset} data-host="${host}"`.trim();

      return { ...conf, dataset, value: cache.get(host) };
    });

    // 生成HTML字符串
    const html = finalConfs.map((conf) => render(conf)).join(Consts.EMPTY);

    // name-cache 关系映射
    const eCache = Object.fromEntries(finalConfs.map((e) => [e.name, e.cache]));

    return { html, eCache };
  },
};
