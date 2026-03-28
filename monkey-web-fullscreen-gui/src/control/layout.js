import Storage from "../common/Storage";

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

    const els = ["FullScreen", "Operation", "Transform", "Rate"].map((name) => this[`create${name}Controls`]());
    this.panel = FyTools.newEle("div", { className: "vc-control-panel" });
    this.panel.append(this.createPanelHeader(), ...els);

    return this.panel;
  },
  /**
   * 创建面板头部（标题 + 主题切换）
   */
  createPanelHeader() {
    const title = FyTools.newEle("b", { textContent: "🎬 播放控制" });
    const onclick = () => this.setControlPanelTheme(!Storage.IS_DARK_THEME.get());
    this.theme = FyTools.newEle("b", { className: "vc-theme-btn", textContent: "🌙", onclick });

    const header = FyTools.newEle("div", { className: "vc-panel-header" });
    header.append(title, this.theme);
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
  createFullScreenControls() {
    const pip = () => document.exitPictureInPicture().catch(() => this.FS.player?.requestPictureInPicture());

    const config = [
      { text: "画中画", icon: "▣", action: pip },
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
      { text: "上移", icon: "‹‹", params: ["ALT_UP"], action: this.FS.moveVideo },
      { text: "左移", icon: "‹‹", params: ["ALT_LEFT"], action: this.FS.moveVideo },
      { text: "缩小", icon: "-", params: [-1], action: this.FS.zoomVideo },
      { text: "下移", icon: "››", params: ["ALT_DOWN"], action: this.FS.moveVideo },
      { text: "右移", icon: "››", params: ["ALT_RIGHT"], action: this.FS.moveVideo },
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
      el.append(FyTools.newEle("b", { textContent: icon }), text);
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
   *   <label class="vc-slider-label">倍速: 1.45x</label>
   *     <div class="vc-slider-row">
   *       <button>-</button>
   *       <input min="0.1" max="16" step="0.15" type="range" class="vc-slider" />
   *       <button>+</button>
   *       <button>↺</button>
   *   </div>
   * </div>
   */
  createRateControls() {
    const step = FyStorage.SPEED_STEP.get();
    const setRate = (value) => this.FS.setPlaybackRate(value);
    const adjustRate = (plus = 1) => this.FS.adjustPlayRate(plus * step);

    const reset = FyTools.newEle("button", { textContent: "↺", onclick: () => setRate(1) });
    const plus = FyTools.newEle("button", { textContent: "+", onclick: () => adjustRate() });
    const minus = FyTools.newEle("button", { textContent: "-", onclick: () => adjustRate(-1) });

    // 倍速滑块
    const attrs = { min: 0.1, max: 16, value: 1, step, type: "range", className: "vc-slider" };
    this.slider = FyTools.newEle("input", { ...attrs, oninput: (e) => setRate(e.target.value) });

    // 倍速滑块滑块组
    const row = FyTools.newEle("div", { className: "vc-slider-row" });
    row.append(minus, this.slider, plus, reset);

    // 创建容器
    this.label = FyTools.newEle("label", { className: "vc-slider-label", textContent: "倍速: 1x" });
    const container = FyTools.newEle("div", { className: "vc-slider-control" });
    container.append(this.label, row);

    return container;
  },
};
