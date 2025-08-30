import Storage from "../common/Storage";
import Consts from "../common/Consts";
import Tools from "../common/Tools";
import Site from "../common/Site";
import Swal from "sweetalert2";

const { ENABLE_THIS_SITE_AUTO: ENABLE_THIS, CURR_EPISODE_SELECTOR: EPISODE_SELECTOR } = Storage;

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  isDisableAuto: () => Storage.DISABLE_AUTO.get(),
  isDisableZoom: () => Storage.DISABLE_ZOOM_MOVE.get(),
  isOverrideKeyboard: () => Storage.OVERRIDE_KEYBOARD.get(),
  isDisablePlaybackRate: () => Storage.CLOSE_PLAY_RATE.get(),
  isDisableScreenshot: () => Storage.DISABLE_SCREENSHOT.get(),
  isEnableSiteAuto: () => ENABLE_THIS.get(Tools.isTopWin() ? location.host : window?.topWin?.host),
  setupScriptMenuCommand() {
    if (this.hasMenu || !Tools.isTopWin() || Tools.isFrequent("menu")) return;
    this.setupMenuChangeListener();
    this.registMenuCommand();
    this.hasMenu = true;
  },
  setupMenuChangeListener() {
    const host = location.host;
    [ENABLE_THIS.name + host, EPISODE_SELECTOR.name + host].forEach((key) =>
      GM_addValueChangeListener(key, () => this.registMenuCommand())
    );
  },
  registMenuCommand() {
    const host = location.host;
    const isEnable = this.isEnableSiteAuto();
    const siteFun = ({ cache }) => cache.set(host, !cache.get(host));
    const delPicker = () => Storage.CURR_EPISODE_SELECTOR.del(host) & Storage.REL_EPISODE_SELECTOR.del(host);
    const resetSetting = () => GM_listValues().forEach((key) => GM_deleteValue(key));

    // 菜单配置项
    const configs = [
      { title: `此站${isEnable ? "禁" : "启"}用自动网页全屏`, cache: ENABLE_THIS, isHidden: Site.isMatched(), fn: siteFun },
      { title: "删除此站剧集选择器", cache: EPISODE_SELECTOR, isHidden: !EPISODE_SELECTOR.get(host), fn: delPicker },
      { title: "快捷键说明", cache: { name: "SHORTCUTKEY" }, isHidden: false, fn: () => this.shortcutKeysPopup() },
      { title: "更多设置", cache: { name: "SETTING" }, isHidden: false, fn: () => this.settingPopup() },
      // { title: "重置设置", cache: { name: "RESET" }, isHidden: false, fn: resetSetting },
    ];

    // 注册菜单项
    configs.forEach(({ title, cache, isHidden, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      if (isHidden) return;

      this[id] = GM_registerMenuCommand(title, () => {
        if (fn) return fn.call(this, { cache, title });

        const input = prompt(title, cache.get());
        if (!isNaN(input) && cache.parser(input)) cache.set(input);
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
      { key: "D", desc: "弹幕显/隐" },
      { key: "Z", desc: "恢复正常倍速" },
      { key: "L / K", desc: "下一帧/上一帧" },
      { key: "Shift R", desc: "水平镜像" },
      { key: "Shift P", desc: "画中画切换" },
      { key: "Ctrl Z", desc: "复位缩放移动" },
      { key: "Ctrl 1-5", desc: "预设常用倍速" },
      { key: "Ctrl Alt A", desc: "截图 (默认禁用)" },
      { key: "Alt ➕ / ➖", desc: "缩放 (默认禁用)" },
      { key: "A / S 或 ➕ / ➖", desc: "倍速 ±0.25" },
      { key: "Alt ◀️🔼🔽▶️", desc: "移动画面 (默认禁用)" },
      { key: "◀️▶️", desc: "快退/进 (默认禁用)" },
      { key: "空格", desc: "播放/暂停 (默认禁用)" },
      { key: "1️ - 9️", desc: "1️ - 9️ 倍速" },
      { key: "数字 0️", desc: "快进 30 秒" },
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
            const isCheckbox = this.type === "checkbox";
            this.dataset.send && Tools.postMessage(window, { [`disable_${this.name}`]: this.checked });
            setTimeout(() => {
              const host = this.dataset.host;
              const cache = cacheMap[this.name];
              const value = isCheckbox ? this.checked : this.value;
              host ? cache.set(host, value) : cache.set(value);
            }, 100);
          });
        });
      },
    });
  },
  genBasicsItems() {
    const configs = [
      { name: "speed", text: "禁用 倍速调节", cache: Storage.CLOSE_PLAY_RATE, sendMsg: true },
      { name: "memory", text: "禁用 记忆倍速", cache: Storage.DISABLE_MEMORY_SPEED, sendMsg: true },
      { name: "time", text: "禁用 记忆播放位置", cache: Storage.DISABLE_MEMORY_TIME, sendMsg: false },
      { name: "fit", text: "禁用 自动网页全屏", cache: Storage.DISABLE_AUTO, isHidden: !Site.isMatched() },
      { name: "volume", text: "禁用 音量默认百分百", cache: Storage.DISABLE_DEF_MAX_VOLUME },
      { name: "next", text: "启用 自动切换至下集", cache: Storage.ENABLE_AUTO_NEXT_EPISODE },
    ].filter(({ isHidden }) => !isHidden);

    const renderItem = ({ text, sendMsg, name, value }) => `
        <label class="__menu">${text}
          <input ${sendMsg ? 'data-send="true"' : ""} ${value ? "checked" : ""} name="${name}" type="checkbox"/>
          <span class="toggle-track"></span>
        </label>`;

    return this.generateCommonItems(configs, renderItem);
  },
  genAssistItems() {
    const configs = [
      { name: "pic", text: "禁用 视频截图", cache: Storage.DISABLE_SCREENSHOT },
      { name: "zoom", text: "禁用 缩放移动", cache: Storage.DISABLE_ZOOM_MOVE, sendMsg: true },
      { name: "tabs", text: "禁用 不可见时暂停", cache: Storage.DISABLE_INVISIBLE_PAUSE, sendMsg: false },
      { name: "clock", text: "禁用 全屏时显示时间", cache: Storage.DISABLE_CLOCK, sendMsg: false },
      { name: "always", text: "启用 非全屏显示时间", cache: Storage.UNFULL_CLOCK, sendMsg: true },
      { name: "override", text: "启用 空格◀️▶️ 控制", cache: Storage.OVERRIDE_KEYBOARD },
    ].filter(({ isHidden }) => !isHidden);

    const renderItem = ({ text, sendMsg, name, value }) => `
        <label class="__menu">${text}
          <input ${sendMsg ? 'data-send="true"' : ""} ${value ? "checked" : ""} name="${name}" type="checkbox"/>
          <span class="toggle-track"></span>
        </label>`;

    return this.generateCommonItems(configs, renderItem);
  },
  genParamsItems() {
    const configs = [
      { name: "step", text: "倍速步进", cache: Storage.PLAY_RATE_STEP },
      { name: "skip", text: "快进/退秒数", cache: Storage.SKIP_INTERVAL },
      { name: "zeroSkip", text: "零键快进秒数", cache: Storage.ZERO_KEY_SKIP_INTERVAL },
      { name: "advance", text: "自动下集提前秒数", cache: Storage.AUTO_NEXT_ADVANCE_SEC },
      { name: "days", text: "播放进度保存天数", cache: Storage.STORAGE_DAYS },
      { name: "percent", text: "缩放百分比", cache: Storage.ZOOM_PERCENT },
      { name: "move", text: "移动距离", cache: Storage.MOVING_DISTANCE },
      { name: "color", text: "时间颜色", cache: Storage.CLOCK_COLOR },
      { name: "preset", text: "常用倍速", cache: Storage.PRESET_SPEED },
    ];

    const renderItem = ({ text, name, value }) => `
        <label class="__menu">${text}
          <input value="${value}" name="${name}" type="text" autocomplete="off"/>
        </label>`;

    return this.generateCommonItems(configs, renderItem);
  },
  genIgnoreItems() {
    const host = location.host;
    const configs = [
      { name: "customFit", text: "自定义此站网页全屏规则", cache: Storage.CUSTOM_WEB_FULL, isHidden: Site.isMatched(), host },
      { name: "nextIgnore", text: "自动切换下集时忽略的网址列表（分号隔开）", cache: Storage.NEXT_IGNORE_URLS },
      { name: "fitIgnore", text: "自动网页全屏时忽略的网址列表（分号隔开）", cache: Storage.FULL_IGNORE_URLS },
    ];

    const renderItem = ({ text, host, name, value }) => `
        <div class="others-sett"><p>${text}</p>
          <textarea ${
            host ? `data-host="${host}"` : ""
          } name="${name}" type="text" spellcheck="false" autocomplete="off">${value}</textarea>
        </div>`;

    return this.generateCommonItems(configs, renderItem);
  },
  generateCommonItems(baseConfigs, renderItem) {
    // 过滤要隐藏的项
    const filteredConfigs = baseConfigs.filter(({ isHidden }) => !isHidden);

    // 处理缓存值，有`host`取`host`的缓存
    const processedConfigs = filteredConfigs.map((config) => ({
      value: config.host ? config.cache.get(config.host) : config.cache.get(),
      ...config,
    }));

    // 生成HTML字符串
    const html = processedConfigs.map((config) => renderItem(config)).join(Consts.EMPTY);

    // name-cache 关系映射
    const cacheMap = Object.fromEntries(processedConfigs.map((item) => [item.name, item.cache]));

    return { html, cacheMap };
  },
};
