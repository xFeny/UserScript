import Storage from "../common/Storage";
import Consts from "../common/Consts";
import Tools from "../common/Tools";
import Site from "../common/Site";
import Swal from "sweetalert2";

const { IS_SITE_AUTO, CURRENT_EPISODE } = Storage;

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  noAutoDefault: () => Storage.NO_AUTO_DEF.get(),
  isOverrideKey: () => Storage.OVERRIDE_KEY.get(),
  isDisableSpeed: () => Storage.DISABLE_SPEED.get(),
  isDisableZoom: () => Storage.DISABLE_ZOOM_MOVE.get(),
  isAutoSite: () => IS_SITE_AUTO.get(Tools.isTopWin() ? location.host : window?.topWin?.host),
  restoreDefaultSetting: () => GM_listValues().forEach((key) => GM_deleteValue(key)),
  setupScriptMenuCommand() {
    if (this.hasMenu || !Tools.isTopWin() || Tools.isFrequent("menu")) return;
    this.setupMenuChangeListener();
    this.registMenuCommand();
    this.hasMenu = true;
  },
  setupMenuChangeListener() {
    const host = location.host;
    [IS_SITE_AUTO.name + host, CURRENT_EPISODE.name + host].forEach((key) =>
      GM_addValueChangeListener(key, () => this.registMenuCommand())
    );
  },
  registMenuCommand() {
    const noPicker = !CURRENT_EPISODE.get(location.host);
    const siteTitle = `此站${this.isAutoSite() ? "禁" : "启"}用自动网页全屏`;
    const siteFun = ({ host, cache }) => cache.set(!cache.get(host), host);
    const delPicker = ({ host }) => Storage.CURRENT_EPISODE.del(host) & Storage.RELATIVE_EPISODE.del(host);

    // 菜单配置项
    const configs = [
      { title: siteTitle, cache: IS_SITE_AUTO, useHost: true, isHidden: Site.isGmMatch(), fn: siteFun },
      { title: "删除此站剧集选择器", cache: CURRENT_EPISODE, useHost: true, isHidden: noPicker, fn: delPicker },
      { title: "快捷键说明", cache: { name: "SHORTCUTKEY" }, isHidden: false, fn: this.shortcutKeysPopup },
      { title: "更多设置", cache: { name: "SETTING" }, isHidden: false, fn: this.settingPopup },
      // { title: "还原默认", cache: { name: "RESET" }, isHidden: false, fn: this.restoreDefaultSetting },
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
        host ? cache.set(input, host) : cache.set(input);
      });
    });
  },
  shortcutKeysPopup() {
    const shortcutKeys = [
      { key: "Enter", desc: "全屏" },
      { key: "P", desc: "网页全屏" },
      { key: "N", desc: "切换下集" },
      { key: "R", desc: "旋转 90°" },
      { key: "M", desc: "静音切换" },
      { key: "D", desc: "弹幕切换" },
      { key: "Z", desc: "正常倍速" },
      { key: "K / L", desc: "上下帧" },
      { key: "Shift R", desc: "水平镜像" },
      { key: "Shift P", desc: "画中画切换" },
      { key: "Shift L", desc: "原生控制栏" },
      { key: "Ctrl Z", desc: "复位缩放移动" },
      { key: "Shift E", desc: "启/禁自动下集" },
      { key: "Ctrl Alt A", desc: "截图 (默禁)" },
      { key: "Alt ➕ / ➖", desc: "缩放 (默禁)" },
      { key: "A / S 或 ➕ / ➖", desc: "倍速 ±0.25" },
      { key: "Alt ◀️🔼🔽▶️", desc: "移动 (默禁)" },
      { key: "Ctrl 1️~5️", desc: "预设倍速" },
      { key: "1️~9️", desc: "1️~9️ 倍速" },
      { key: "数字 0️", desc: "快进 N 秒" },
      { key: "◀️▶️", desc: "快退/进 (默禁)" },
      { key: "空格", desc: "播放/暂停 (默禁)" },
    ];

    // 偶数索引时创建新行，奇数索引时补充到上一行
    const rows = shortcutKeys.reduce((acc, item, i) => {
      if (i % 2 === 0) {
        const next = shortcutKeys[i + 1] || { key: Consts.EMPTY, desc: Consts.EMPTY };
        return acc + `<tr><td>${item.key}</td><td>${item.desc}</td><td>${next.key}</td><td>${next.desc}</td></tr>`;
      }
      return acc;
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
    const { html: basicsHtml, cacheMap: basicsMap } = this.genBasicsItems();
    const { html: assistHtml, cacheMap: assistMap } = this.genAssistItems();
    const { html: paramsHtml, cacheMap: paramsMap } = this.genParamsItems();
    const { html: ignoreHtml, cacheMap: ignoreMap } = this.genIgnoreItems();
    const cacheMap = { ...basicsMap, ...assistMap, ...paramsMap, ...ignoreMap };
    const modalHtml = `
        <div class="swal2-tabs">
          <!-- Tabs 标题栏 -->
          <div class="swal2-tabs-header">
              <div class="swal2-tab active" data-tab="tab1">播放设置</div>
              <div class="swal2-tab" data-tab="tab2">辅助设置</div>
              <div class="swal2-tab" data-tab="tab3">参数设置</div>
              <div class="swal2-tab" data-tab="tab4">其他设置</div>
          </div>
          <!-- Tabs 内容区 -->
          <div class="swal2-tabs-content">
            <div class="swal2-tab-panel active" id="tab1">${basicsHtml}</div>
            <div class="swal2-tab-panel" id="tab2">${assistHtml}</div>
            <div class="swal2-tab-panel" id="tab3">${paramsHtml}</div>
            <div class="swal2-tab-panel" id="tab4">${ignoreHtml}</div>
          </div>
        </div>`;

    Swal.fire({
      width: 410,
      title: "设置",
      showCancelButton: true,
      cancelButtonText: "关闭",
      showConfirmButton: false,
      html: Tools.safeHTML(modalHtml),
      customClass: { container: "monkey-web-fullscreen" },
      didOpen(popup) {
        // 为Tabs绑定切换事件
        Tools.querys(".swal2-tab", popup).forEach((tab) => {
          tab.addEventListener("click", () => {
            Tools.querys(".swal2-tab, .swal2-tab-panel", popup).forEach((el) => el.classList.remove("active"));
            Tools.query(`#${tab.dataset.tab}`, popup).classList.add("active");
            tab.classList.add("active");
          });
        });

        // 为input、textarea绑定事件
        Tools.querys(".__menu input, textarea", popup).forEach((ele) => {
          ele.addEventListener("input", function () {
            const cache = cacheMap[this.name];
            const { host, send, delay } = this.dataset;
            const value = Object.is(this.type, "checkbox") ? this.checked : this.value;
            if (send) Tools.postMessage(window, { [`toggle_${this.name}`]: value });
            const setCache = () => (host ? cache.set(value, host) : cache.set(value));
            delay ? setTimeout(setCache, 50) : setCache();
          });
        });
      },
    });
  },
  genBasicsItems() {
    const configs = [
      { name: "speed", text: "禁用 倍速调节", cache: Storage.DISABLE_SPEED, attrs: ["send", "delay"] },
      { name: "memory", text: "禁用 记忆倍速", cache: Storage.NOT_CACHE_SPEED, attrs: ["send"] },
      { name: "time", text: "禁用 记忆播放位置", cache: Storage.NOT_CACHE_TIME },
      { name: "fit", text: "禁用 自动网页全屏", cache: Storage.NO_AUTO_DEF, isHide: !Site.isGmMatch() },
      { name: "tabs", text: "禁用 不可见时暂停", cache: Storage.IS_INVISIBLE_PAUSE },
      { name: "volume", text: "禁用 音量默认百分百", cache: Storage.IS_MAX_VOLUME },
      { name: "next", text: "启用 自动切换至下集", cache: Storage.IS_AUTO_NEXT },
      { name: "override", text: "启用 空格◀️▶️ 控制", cache: Storage.OVERRIDE_KEY },
    ];

    const renderItem = ({ text, dataset, name, value }) => `
        <label class="__menu">${text}
          <input ${dataset} ${value ? "checked" : ""} name="${name}" type="checkbox"/>
          <span class="toggle-track"></span>
        </label>`;

    return this.generateCommonItems(configs, renderItem);
  },
  genAssistItems() {
    const configs = [
      { name: "pic", text: "禁用 视频截图", cache: Storage.DISABLE_SCREENSHOT },
      { name: "zoom", text: "禁用 缩放移动", cache: Storage.DISABLE_ZOOM_MOVE, attrs: ["send"] },
      { name: "clock", text: "禁用 全屏时显示时间", cache: Storage.DISABLE_CLOCK },
      { name: "clockAlways", text: "启用 非全屏显示时间", cache: Storage.PAGE_CLOCK, attrs: ["send"] },
      { name: "smallerFont", text: "启用 小字号显示时间", cache: Storage.USE_SMALL_FONT, attrs: ["send"] },
      { name: "rateKeep", text: "启用 左上角常显倍速", cache: Storage.RATE_KEEP_SHOW, attrs: ["send"] },
    ].filter(({ isHidden }) => !isHidden);

    const renderItem = ({ text, dataset, name, value }) => `
        <label class="__menu">${text}
          <input ${dataset} ${value ? "checked" : ""} name="${name}" type="checkbox"/>
          <span class="toggle-track"></span>
        </label>`;

    return this.generateCommonItems(configs, renderItem);
  },
  genParamsItems() {
    const configs = [
      { name: "step", text: "倍速步进", cache: Storage.SPEED_STEP },
      { name: "skip", text: "快进/退秒数", cache: Storage.SKIP_INTERVAL },
      { name: "zeroSkip", text: "零键快进秒数", cache: Storage.ZERO_KEY_SKIP_INTERVAL },
      { name: "advance", text: "自动下集提前秒数", cache: Storage.NEXT_ADVANCE_SEC },
      { name: "days", text: "播放进度保存天数", cache: Storage.STORAGE_DAYS },
      { name: "percent", text: "缩放百分比", cache: Storage.ZOOM_PERCENT },
      { name: "move", text: "移动距离", cache: Storage.MOVING_DISTANCE },
      { name: "color", text: "时间颜色", cache: Storage.CLOCK_COLOR, attrs: ["send"] },
      { name: "preset", text: "常用倍速", cache: Storage.PRESET_SPEED },
    ];

    const renderItem = ({ text, dataset, name, value }) => `
        <label class="__menu">${text}
          <input ${dataset} value="${value}" name="${name}" type="text" autocomplete="off"/>
        </label>`;

    return this.generateCommonItems(configs, renderItem);
  },
  genIgnoreItems() {
    const { CUSTOM_WEB_FULL, NEXT_IGNORE_URLS, FULL_IGNORE_URLS } = Storage;
    const configs = [
      { name: "customRule", text: "自定义此站视频容器", cache: CUSTOM_WEB_FULL, isHide: Site.isGmMatch(), useHost: true },
      { name: "nextIgnore", text: "自动切换下集时忽略的网址列表（分号隔开）", cache: NEXT_IGNORE_URLS },
      { name: "fitIgnore", text: "自动网页全屏时忽略的网址列表（分号隔开）", cache: FULL_IGNORE_URLS },
    ];

    const renderItem = ({ text, dataset, name, value }) => `
        <div class="others-sett"><p>${text}</p>
          <textarea ${dataset} name="${name}" type="text" spellcheck="false" autocomplete="off">${value}</textarea>
        </div>`;

    return this.generateCommonItems(configs, renderItem);
  },
  generateCommonItems(baseConfigs, renderItem) {
    const getDataset = (attrs = [], host) =>
      attrs.length ? attrs.map((key) => `data-${key}="${key === "host" ? host : true}"`).join(" ") : Consts.EMPTY;

    const filteredConfigs = baseConfigs.filter(({ isHide }) => !isHide);
    const processedConfigs = filteredConfigs.map((config) => {
      const { cache, attrs, useHost } = config;
      const host = useHost ? location.host : Consts.EMPTY;
      const value = useHost ? cache.get(location.host) : cache.get();

      const _attrs = Array.isArray(attrs) ? [...attrs] : [];
      if (useHost && !_attrs.includes("host")) _attrs.push("host");

      return { ...config, value, host, dataset: getDataset(_attrs, location.host) };
    });

    // 生成HTML字符串
    const html = processedConfigs.map((config) => renderItem(config)).join(Consts.EMPTY);

    // name-cache 关系映射
    const cacheMap = Object.fromEntries(processedConfigs.map((item) => [item.name, item.cache]));

    return { html, cacheMap };
  },
};
