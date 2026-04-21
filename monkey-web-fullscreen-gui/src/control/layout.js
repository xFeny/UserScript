import Store from "../common/Store";
import Utils from "../common/Utils";

/**
 * 初始化控制面板元素
 */
export default {
  createPanelWrapper() {
    if (this.wrapper) return;
    this.panelTrigger = FyTools.newEle("div", { textContent: "⚙️", className: "vc-trigger" });
    this.wrapper = FyTools.newEle("div", { className: "vc-panel-wrapper" });
    this.wrapper.append(this.panelTrigger);
    document.body.prepend(this.wrapper);
  },

  /**
   * 创建播放控制面板
   */
  createControlPanel() {
    if (this.panel) return this.panel;

    const els = ["Fullscreen", "Operation", "Transform", "Rate"].map((name) => this[`create${name}Controls`]());
    this.panel = FyTools.newEle("div", { className: "vc-control-panel" });
    this.panel.append(this.createPanelHeader(), ...els);

    return this.panel;
  },
  /**
   * 创建面板头部（标题 + 主题切换）
   */
  createPanelHeader() {
    const title = FyTools.newEle("b", { textContent: "🎬 播放控制" });
    const onclick = () => this.setControlPanelTheme(!Store.DARK_THEME.get());
    const theme = FyTools.newEle("b", { className: "vc-theme-btn", onclick });

    const header = FyTools.newEle("div", { className: "vc-panel-header" });
    header.append(title, theme);
    return header;
  },
  /**
   * 创建全屏控制功能
   * @example
   * <div class="vc-func-group">
   *   <div class="vc-control-item"><b>▣</b>画中画</div>
   *   <div class="vc-control-item"><b>⤢</b>网页全屏</div>
   *   <div class="vc-control-item"><b>⛶</b>全屏</div>
   * </div>
   */
  createFullscreenControls() {
    const pip = () => document.exitPictureInPicture().catch(() => this.FS.player?.requestPictureInPicture());

    const config = [
      { text: "画中画", icon: "▣", action: () => this.picInPic() },
      { text: "网页全屏", icon: "⤢", params: ["P", { isTrusted: true }], action: this.FS.dispatchShortcut },
      { text: "全屏", icon: "⛶", params: ["ENTER"], action: this.FS.dispatchShortcut },
    ];
    return this.createControlGroup(config);
  },
  /**
   * 创建操作控制功能
   */
  createOperationControls() {
    const config = [
      { text: "截图", icon: "⎙", action: this.FS.screenshot },
      { text: "旋转", icon: "⟳", action: this.FS.rotateVideo },
      { text: "镜像", icon: "][", action: this.FS.horizFlip },
      { text: "上一帧", icon: "‹‹", params: [-1], action: this.FS.freezeFrame },
      { text: "播放", icon: "▷", action: () => this.FS.player?.play() },
      { text: "下一帧", icon: "››", action: this.FS.freezeFrame },
    ];
    return this.createControlGroup(config);
  },
  /**
   * 创建变换控件功能
   */
  createTransformControls() {
    const config = [
      { text: "放大", icon: "+", action: this.FS.zoomVideo },
      { text: "上移", icon: "‹‹", params: ["UP"], action: this.FS.moveVideo },
      { text: "左移", icon: "‹‹", params: ["LEFT"], action: this.FS.moveVideo },
      { text: "缩小", icon: "-", params: [-1], action: this.FS.zoomVideo },
      { text: "下移", icon: "››", params: ["DOWN"], action: this.FS.moveVideo },
      { text: "右移", icon: "››", params: ["RIGHT"], action: this.FS.moveVideo },
    ];
    return this.createControlGroup(config);
  },
  /**
   * 创建控制功能组
   * @param {Array} confs
   */
  createControlGroup(confs) {
    const nodes = confs.map(({ text, icon, params = [], action = () => {} }) => {
      const el = FyTools.newEle("div", { className: "vc-control-item", onclick: () => action.apply(this.FS, params) });
      el.append(FyTools.newEle("b", { title: text, textContent: icon }), text);
      return el;
    });

    const container = FyTools.newEle("div", { className: "vc-func-group" });
    container.append(...nodes);
    return container;
  },
  /**
   * 创建倍速滑块功能组
   * @example
   * <div class="vc-slider-control">
   *   <div class="vc-slider-label">
   *     <span class="vc-slider-rate">倍速: 1.45x</span>
   *     <div class="vc-preset-rate">
   *       <span>1.15</span><span>1.45</span><span>1.75</span>
   *     </div>
   *   </div>
   *   <div class="vc-slider-row">
   *     <button>-</button>
   *     <input min="0.1" max="16" step="0.25" type="range" class="vc-slider">
   *     <button>+</button>
   *     <button>↺</button>
   *   </div>
   * </div>
   */
  createRateControls() {
    const step = FyStorage?.RATE_STEP?.get() ?? 0.25;
    const setRate = (value) => this.FS.setPlaybackRate(value);
    const adjustRate = (plus = 1) => this.FS.adjustPlayRate(plus * step);

    // =================⇓⇓⇓ 当前倍速、常用倍速相关 ⇓⇓⇓=================
    // 当前倍速，支持输入值
    const inputRate = Utils.debounce((e) => setRate(e.target.textContent), 500);
    this.rate = FyTools.newEle("span", { contentEditable: true, textContent: "1", oninput: inputRate });

    const rateWrap = FyTools.newEle("span", { className: "vc-slider-rate" });
    rateWrap.append("倍速: ", this.rate, "x");

    // 预设的常用倍速
    const preset = FyTools.newEle("div", { className: "vc-preset-rate" });
    FyStorage?.PRESET_RATE?.get()?.map((rate) => {
      if (rate) preset.append(FyTools.newEle("span", { textContent: rate.trim(), onclick: () => setRate(rate) }));
    });

    // 当前倍速、常用倍速 容器
    const label = FyTools.newEle("div", { className: "vc-slider-label" });
    label.append(rateWrap, preset);
    // =================⇑⇑⇑ 当前倍速、常用倍速相关 ⇑⇑⇑=================

    // =================⇓⇓⇓ 倍速滑块相关 ⇓⇓⇓=================
    const reset = FyTools.newEle("button", { textContent: "↺", onclick: () => setRate(1) });
    const plus = FyTools.newEle("button", { textContent: "+", onclick: () => adjustRate() });
    const minus = FyTools.newEle("button", { textContent: "-", onclick: () => adjustRate(-1) });

    // 倍速滑块
    const attrs = { min: 0.1, max: 16, value: 1, step, type: "range", className: "vc-slider" };
    this.slider = FyTools.newEle("input", { ...attrs, oninput: (e) => setRate(e.target.value) });

    // 倍速滑块滑块组
    const row = FyTools.newEle("div", { className: "vc-slider-row" });
    row.append(minus, this.slider, plus, reset);
    // =================⇑⇑⇑ 倍速滑块相关 ⇑⇑⇑=================

    // 创建容器
    const container = FyTools.newEle("div", { className: "vc-slider-control" });
    container.append(label, row);

    return container;
  },
};
