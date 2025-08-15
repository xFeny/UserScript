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

    // 菜单配置项
    const configs = [
      { title: `此站${isEnable ? "禁" : "启"}用自动网页全屏`, cache: ENABLE_THIS, isHidden: Site.isMatched(), fn: siteFun },
      { title: "删除此站剧集选择器", cache: EPISODE_SELECTOR, isHidden: !EPISODE_SELECTOR.get(host), fn: delPicker },
      { title: "快捷键说明", cache: { name: "SHORTCUTKEY" }, isHidden: false, fn: () => this.shortcutKeysPopup() },
      { title: "更多设置", cache: { name: "SETTING" }, isHidden: false, fn: () => this.settingPopup() },
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
      { key: "P", desc: "切换网页全屏" },
      { key: "N", desc: "切换下集视频" },
      { key: "Z", desc: "恢复正常倍速" },
      { key: "R", desc: "画面旋转 90 度" },
      { key: "M", desc: "静音 / 取消静音" },
      { key: "D", desc: "显示 / 隐藏 弹幕" },
      { key: "L / K", desc: "下一帧 / 上一帧" },
      { key: "Ctrl Z", desc: "复位缩放与移动" },
      { key: "Shift L", desc: "显示原生控制栏" },
      { key: "Shift R", desc: "视频水平镜像翻转" },
      { key: "Shift P", desc: "进入 / 退出 画中画" },
      { key: "Ctrl Alt A", desc: "视频截图 (默认禁用)" },
      { key: "Alt ➕ / ➖", desc: "视频缩放 (默认禁用)" },
      { key: "A / S 或 ➕ / ➖", desc: "播放倍速 ±0.25" },
      { key: "Alt ◀️🔼🔽▶️", desc: "移动视频画面 (默认禁用)" },
      { key: "◀️▶️", desc: "快退 / 快进 5秒 (默认禁用)" },
      { key: "空格", desc: "播放 / 暂停 (默认禁用)" },
      { key: "1️ 至 9️", desc: "1️ 至 9️ 倍速" },
      { key: "数字 0️", desc: "快进 30 秒" },
    ];

    const rows = shortcutKeys.map(({ key, desc }) => `<tr><td>${key}</td><td>${desc}</td></tr>`).join(Consts.EMPTY);

    Swal.fire({
      width: 600,
      title: "快捷键说明",
      showCancelButton: true,
      cancelButtonText: "关闭",
      showConfirmButton: false,
      customClass: { container: "monkey-web-fullscreen" },
      html: Tools.safeHTML(`<table><tr><th>快捷键</th><th>说明</th></tr>${rows}</table>`),
    });
  },
  settingPopup() {
    const { html: disableHtml, cacheMap: disableMap } = this.genDisableItems();
    const { html: paramsHtml, cacheMap: paramsMap } = this.genParamsItems();
    const { html: ignoreHtml, cacheMap: ignoreMap } = this.genIgnoreItems();
    const cacheMap = { ...disableMap, ...paramsMap, ...ignoreMap };
    const modalHtml = `
        <div class="swal2-tabs">
          <!-- Tabs 标题栏 -->
          <div class="swal2-tabs-header">
              <div class="swal2-tab active" data-tab="tab1">禁用设置</div>
              <div class="swal2-tab" data-tab="tab2">参数设置</div>
              <div class="swal2-tab" data-tab="tab3">其他设置</div>
          </div>
          <!-- Tabs 内容区 -->
          <div class="swal2-tabs-content">
            <div class="swal2-tab-panel active" id="tab1">${disableHtml}</div>
            <div class="swal2-tab-panel" id="tab2">${paramsHtml}</div>
            <div class="swal2-tab-panel" id="tab3">${ignoreHtml}</div>
          </div>
        </div>`;

    Swal.fire({
      width: 400,
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
            }, 50);
          });
        });
      },
    });
  },
  genDisableItems() {
    const configs = [
      { name: "pic", text: "禁用视频截图", cache: Storage.DISABLE_SCREENSHOT },
      { name: "zoom", text: "禁用缩放与移动", cache: Storage.DISABLE_ZOOM_MOVE, sendMsg: true },
      { name: "speed", text: "禁用视频倍速调节", cache: Storage.CLOSE_PLAY_RATE, sendMsg: true, isHidden: this.isLive() },
      { name: "time", text: "禁用播放进度记录", cache: Storage.DISABLE_MEMORY_TIME, isHidden: this.isLive() },
      { name: "fit", text: "禁用自动网页全屏", cache: Storage.DISABLE_AUTO, isHidden: !Site.isMatched() },
      { name: "tabs", text: "禁用标签页隐藏暂停", cache: Storage.DISABLE_INVISIBLE_PAUSE },
      { name: "next", text: "启用自动切换至下集", cache: Storage.ENABLE_AUTO_NEXT_EPISODE },
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
      { name: "percent", text: "缩放百分比", cache: Storage.PERCENT_OF_ZOOM },
      { name: "move", text: "移动距离", cache: Storage.MOVING_DISTANCE },
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
