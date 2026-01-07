import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Keyboard from "../common/Keyboard";

/**
 * 快捷键和消息相关逻辑处理
 */
export default {
  isInputFocus: (event) => Tools.isInputable(event.composedPath()[0]),
  preventDefault(event, { code, altKey } = event) {
    const isNumKeys = Tools.isNumber(event.key) && !this.isDisRate();
    const isOverrideKeys = this.isOverrideKey() && [Keyboard.Space, Keyboard.Left, Keyboard.Right].includes(code);
    const isPreventKeys = [Keyboard.K, Keyboard.L, Keyboard.M, Keyboard.N, Keyboard.P, Keyboard.R].includes(code);
    const isZoomKeys = altKey && !this.isDisZoom() && [Keyboard.Up, Keyboard.Down, Keyboard.Left, Keyboard.Right].includes(code);
    if (isNumKeys || isOverrideKeys || isPreventKeys || isZoomKeys) Tools.preventDefault(event);
  },
  dispatchShortcutKey(code, { bypass = false, isTrusted = false } = {}) {
    const key = this.processShortcutKey({ code });
    Tools.postMessage(window.top, { key, bypass, isTrusted });
  },
  processShortcutKey({ key, code, ctrlKey, shiftKey, altKey }) {
    code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
    const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
    return keys.filter(Boolean).join("_").toUpperCase();
  },
  setupKeydownListener() {
    unsafeWindow.addEventListener("keyup", (event) => this.preventDefault(event), true);
    unsafeWindow.addEventListener("keydown", (event) => this.handleKeydown(event), true);
    unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
  },
  handleKeydown(event, { key, code, isTrusted } = event) {
    // Tools.log("键盘事件：", { key, code });
    if (this.noVideo() || this.isInputFocus(event)) return;
    if (!Object.values(Keyboard).includes(code) && !Tools.isNumber(key)) return;

    this.preventDefault(event);
    key = this.processShortcutKey(event);
    const specialKeys = [Keyboard.N, Keyboard.P, Keyboard.Enter, Keyboard.NumEnter];
    if (specialKeys.includes(code)) return Tools.postMessage(window.top, { key, isTrusted });
    this.processEvent({ key, isTrusted });
  },
  processEvent(data) {
    // video在iframe中，向iframe传递事件
    if (!this.player) Tools.sendToIFrames(data);
    if (data?.key) this.execHotKeyActions(data);
  },
  execHotKeyActions({ key, isTrusted, bypass }) {
    // Tools.log("按下的键：", { key, isTrusted });
    const dict = {
      M: () => this.toggleMute(),
      R: () => this.rotateVideo(),
      L: () => this.freezeVideoFrame(),
      K: () => this.freezeVideoFrame(true),
      D: () => Site.isGmMatch() && this.triggerIconElement(Site.icons.danmaku),
      N: () => (Site.isGmMatch() ? this.triggerIconElement(Site.icons.next) : this.switchEpisode()),
      ENTER: () => (Site.isGmMatch() ? this.triggerIconElement(Site.icons.full) : this.toggleFullscreen()),
      P: () => (Site.isGmMatch() ? this.triggerIconElement(Site.icons.webFull) : this.toggleWebFullscreen(isTrusted)),
      LEFT: () => (bypass || this.isOverrideKey()) && this.skipPlayback(-Storage.SKIP_INTERVAL.get()),
      RIGHT: () => (bypass || this.isOverrideKey()) && this.skipPlayback(Storage.SKIP_INTERVAL.get()),
      SPACE: () => (bypass || this.isOverrideKey()) && this.playToggle(this.player),
      0: () => this.skipPlayback(Storage.ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
      SHIFT_A: () => this.toggleAutoNextEnabled(),
      CTRL_ALT_A: () => this.captureScreenshot(),
      CTRL_Z: () => this.resetVideoTransform(),
      SHIFT_R: () => this.toggleMirrorFlip(),
      ALT_SUB: () => this.zoomVideo(true),
      ALT_ADD: () => this.zoomVideo(),
    };

    // 倍速加减
    const step = Storage.SPEED_STEP.get();
    ["A", "S", "ADD", "SUB"].forEach((k, i) => (dict[k] = () => this.adjustPlaybackRate((i % 2 ? -1 : 1) * step)));

    // 视频移动
    ["ALT_UP", "ALT_DOWN", "ALT_LEFT", "ALT_RIGHT"].forEach((k) => (dict[k] = () => this.moveVideoPosition(k)));

    // 预设常用倍速值
    for (let i = 1; i < 6; i++) dict[`CTRL_${i}`] = () => this.setPlaybackRate(Storage.PRESET_SPEED.get()[i - 1]);

    // 执行函数
    dict[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
  },
  handleMessage(data) {
    // Tools.log(location.href, "接收到消息：", data);
    if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
    if (data?.videoInfo) return this.setParentWinVideoInfo(data.videoInfo);
    if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
    if (data?.topWin) window.topWin = this.topWin = data.topWin;

    // 处理设置时传递过来的消息
    this.handleSettMessage(data);

    // 处理键盘按键消息和继续分发消息
    this.processEvent(data);
  },
  handleSettMessage(data) {
    // 处理在 “更多设置” 中操作功能切换（启用/禁用）时发来的消息
    if ("sw_rateKeep" in data) this.playbackRateKeepDisplay(); // 左上角常显倍速
    if ("sw_clockAlw" in data) setTimeout(() => this.changeTimeElementDisplay(), 30); // 非全屏显示时间
    if ("sw_color" in data) this.setTimeElementColor(data.sw_color); // 时间颜色
    if ("sw_edgeClk" in data) this.removeEdgeClickElements(); // 禁用侧边触发网页全屏

    if (data?.sw_memory) this.delCachedRate(); // 禁用记忆倍速
    if (data?.sw_zoom) this.resetVideoTransform(); // 禁用缩放
    if (data?.sw_speed) this.setPlaybackRate(Consts.DEF_SPEED); // 禁用倍速调节
  },
};
