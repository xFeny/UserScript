import tippy from "tippy.js";
import Draggable from "draggable/dist/draggable.min.js";
import Store from "../common/Store";
import Utils from "../common/Utils";

export default {
  FS: null,
  init() {
    Utils.waitFor(() => unsafeWindow.GM_E9X_FS)
      .then(() => {
        this.host = location.host;
        this.FS = unsafeWindow.GM_E9X_FS;
        this.setupFunctionHooks();
        this.watchPlayerChange();
      })
      .catch(() => console.error("未安装关联的脚本"));
  },
  watchPlayerChange() {
    Object.defineProperty(this.FS, "player", {
      set: (value) => ((this.FS.$player = value), this.initControlPanel(value)),
      get: () => this.FS.$player,
    });
  },
  setupFunctionHooks() {
    Utils.onBefore(this.FS, "ratechange", () => this.renderRateToPanel());
    Utils.onBefore(this.FS, "onFullChange", () => (document.fullscreenElement ?? document.body).prepend(this.wrapper ?? ""));
  },
  renderRateToPanel() {
    if (!this.FS.player || !this.panel) return;
    this.slider.value = this.FS.player.playbackRate;
    this.rate.textContent = `倍速: ${this.FS.player.playbackRate}x`;
  },
  initControlPanel(video) {
    if (!video || this.wrapper) return;

    this.createPanelWrapper();
    this.setControlPanelTheme();
    this.setupPanelTrigger();
    this.setupDraggable();
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
      allowHTML: true,
      interactive: true,
      placement: "left",
      appendTo: "parent",
      theme: "vc-panel-wrapper",
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
};
