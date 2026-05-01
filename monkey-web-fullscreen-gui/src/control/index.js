import tippy from "tippy.js";
import Draggable from "draggable/dist/draggable.min.js";
import Store from "../common/Store";
import Utils from "../common/Utils";

export default {
  FS: null,
  init() {
    if (!unsafeWindow.GM_E9X_FS) return console.warn("未安装依赖，无法正常运行！！");

    this.host = location.host;
    this.FS = unsafeWindow.GM_E9X_FS;
    this.hookAddEventListener();
    this.setupPlayerListener();
    this.setupFunctionHooks();
  },
  setupPlayerListener() {
    unsafeWindow.addEventListener("load", () => this.initControlPanel());
    document.addEventListener("setPlayer", () => this.initControlPanel());
  },
  setupFunctionHooks() {
    Utils.onBefore(this.FS, "ratechange", () => this.renderRateToPanel());
    Utils.onBefore(this.FS, "onFullChange", () => (document.fullscreenElement ?? document.body).prepend(this.wrapper ?? ""));
  },
  renderRateToPanel() {
    if (!this.FS.player || !this.panel) return;
    this.rate.textContent = this.slider.value = this.FS.player.playbackRate;
  },
  initControlPanel() {
    if (!this.FS.player || this.wrapper) return;
    try {
      this.createPanelWrapper();
      this.setControlPanelTheme();
      this.setupPanelTrigger();
      this.setupDraggable();
    } catch (err) {
      console.warn(err);
    }
  },

  // ====================⇓⇓⇓ 深/浅色皮肤相关逻辑 ⇓⇓⇓====================
  /**
   * 设置并缓存主题
   */
  setControlPanelTheme(isDark = Store.DARK_THEME.get()) {
    this.wrapper.classList.toggle("light-mode", !isDark);
    Store.DARK_THEME.set(isDark);
  },
  // ====================⇑⇑⇑ 深/浅色皮肤相关逻辑 ⇑⇑⇑====================

  /**
   * 鼠标移入⚙️时显示控制面板
   */
  setupPanelTrigger() {
    tippy(this.panelTrigger, {
      arrow: false,
      duration: 500,
      interactive: true,
      placement: "left",
      appendTo: "parent",
      theme: "vc-panel-wrapper",
      onBeforeUpdate: (instance) => {
        const content = FyTools.query(".tippy-content", instance.popper);
        if (!content || FyTools.isExecuted("tippy-content", content)) return;
        GM_FVEnh.defineProperty(content, "innerHTML", { set: (html, setter) => setter(FyTools.safeHTML(html)) });
      },
      onTrigger: (instance) => {
        instance.setContent(this.createControlPanel());
        if (this.panel) this.renderRateToPanel();
      },
    });
  },

  // ====================⇓⇓⇓ 拖拽相关逻辑 ⇓⇓⇓====================
  /**
   * 设置元素可拖拽功能
   */
  setupDraggable() {
    const cache = Store.DRAG_POSITION;
    const { x, y } = cache.get(this.host);

    const onDragEnd = (_, x, y) => cache.set({ x, y }, this.host);
    new Draggable(this.panelTrigger, { onDragEnd, setPosition: false, limit: this.getDragBounds() }).set(x, y);
  },
  /**
   * 允许的拖拽范围
   * @returns {x ,y}
   */
  getDragBounds() {
    const { top, left, bottom, width } = FyTools.getRect(this.wrapper);
    return { x: [-left, width / 2], y: [-top, top + bottom] };
  },
  // ====================⇑⇑⇑ 拖拽相关逻辑 ⇑⇑⇑====================
  hookAddEventListener() {
    window.evts = new Map();
    const addEvent = EventTarget.prototype.addEventListener;
    const removeEvent = EventTarget.prototype.removeEventListener;

    EventTarget.prototype.addEventListener = function (...args) {
      if ([document, unsafeWindow].includes(this)) window.evts.get(this)?.push(args) || window.evts.set(this, [args]);
      return addEvent.call(this, ...args);
    };
  },
};
