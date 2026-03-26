import tippy from "tippy.js";
import Draggable from "draggable/dist/draggable.min.js";
import Storage from "../common/Storage";
import Utils from "../common/Utils";

export default {
  FS: null,
  player: null,
  async init() {
    await Utils.waitFor(() => unsafeWindow.GM_E9X_FS).catch(() => console.error("未安装关联的脚本"));

    this.FS = unsafeWindow.GM_E9X_FS;
    this.onPlayerInstanceChange();
    this.onFullscreenChange();
    this.onPlayerRateChange();
    this.host = location.host;
  },
  onPlayerInstanceChange() {
    Object.defineProperty(this.FS, "player", {
      configurable: true,
      get: () => this.player,
      set: (value) => {
        this.player = value;
        FyTools.microTask(() => {
          this.initControlPanel();
          this.setControlPanelTheme();
          this.setupPanelTrigger();
          this.setupDraggable();
        });
      },
    });
  },
  onFullscreenChange() {
    const preExec = () => this.wrapper && (document.fullscreenElement ?? document.body).prepend(this.wrapper);
    Utils.hookBefore(this.FS, "handleFullscreenChange", preExec);
  },
  onPlayerRateChange() {
    Utils.hookBefore(this.FS, "ratechange", () => this.renderRateToPanel());
  },
  renderRateToPanel() {
    if (!this.player || !this.panel) return;
    this.label.textContent = `倍速: ${this.player.playbackRate}x`;
    this.slider.value = this.player.playbackRate;
  },

  // ====================⇓⇓⇓ 深/浅色皮肤相关逻辑 ⇓⇓⇓====================
  /**
   * 设置并缓存主题
   */
  setControlPanelTheme(isDark = Storage.IS_DARK_THEME.get()) {
    if (this.theme) this.theme.textContent = isDark ? "🌙" : "☀️";
    this.wrapper?.classList.toggle("light-mode", !isDark);
    Storage.IS_DARK_THEME.set(isDark);
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
      offset: innerWidth >= 3840 ? [0, 100] : [0, 10],
      onTrigger: (instance) => {
        instance.setContent(this.createControlPanelContent());
        if (this.panel) (this.renderRateToPanel(), this.setControlPanelTheme());
      },
    });
  },

  // ====================⇓⇓⇓ 拖拽相关逻辑 ⇓⇓⇓====================
  /**
   * 设置元素可拖拽功能
   */
  setupDraggable() {
    const cache = Storage.DRAG_POSITION;

    const onDragEnd = (_, x, y) => cache.set({ x, y }, this.host);
    const draggable = new Draggable(this.panelTrigger, { onDragEnd, setPosition: false, limit: this.getDragBounds() });

    const { x, y } = cache.get(this.host);
    draggable.set(x, y);
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
