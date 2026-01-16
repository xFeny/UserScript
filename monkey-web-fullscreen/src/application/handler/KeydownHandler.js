import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Keyboard from "../common/Keyboard";

/**
 * 快捷键和消息相关逻辑处理
 */
export default {
  isInputFocus: (e) => Tools.isInputable(e.composedPath()[0]),
  preventKey(e, { code, altKey } = e) {
    const isNumKeys = Tools.isNumber(e.key) && !this.isDisRate();
    const isOverrideKeys = this.isOverrideKey() && [Keyboard.Space, Keyboard.Left, Keyboard.Right].includes(code);
    const isPreventKeys = [Keyboard.K, Keyboard.L, Keyboard.M, Keyboard.N, Keyboard.P, Keyboard.R].includes(code);
    const isZoomKeys = altKey && !this.isDisZoom() && [Keyboard.Up, Keyboard.Down, Keyboard.Left, Keyboard.Right].includes(code);
    if (isNumKeys || isOverrideKeys || isPreventKeys || isZoomKeys) Tools.preventDefault(e);
  },
  dispatchShortcut(code, { bypass = false, isTrusted = false } = {}) {
    const key = this.processShortcutKey({ code });
    Tools.postMessage(window.top, { key, bypass, isTrusted });
  },
  processShortcutKey({ key, code, ctrlKey, shiftKey, altKey }) {
    code = code.replace(/key|arrow|numpad|tract/gi, "");
    const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
    return keys.filter(Boolean).join("_").toUpperCase();
  },
  setupKeydownListener() {
    unsafeWindow.addEventListener("keyup", (e) => this.preventKey(e), true);
    unsafeWindow.addEventListener("keydown", (e) => this.handleKeydown(e), true);
    unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
  },
  handleKeydown(e, { key, code, isTrusted } = e) {
    // Tools.log("键盘事件：", { key, code });
    if (this.isNoVideo() || this.isInputFocus(e)) return;
    if (!Object.values(Keyboard).includes(code) && !Tools.isNumber(key)) return;

    this.preventKey(e);
    key = this.processShortcutKey(e);
    const specialKeys = [Keyboard.N, Keyboard.P, Keyboard.Enter, Keyboard.NumEnter];
    if (specialKeys.includes(code)) return this.dispatchShortcut(key, { isTrusted });
    this.processEvent({ key, isTrusted });
  },
  processEvent(data) {
    // 规避父窗口视频对 iframe 内视频网页全屏的干扰
    if (this.vMeta?.iFrame && this.player) delete this.player;

    // 视频可能在 iframe 中，向 iframe 传递操作
    if (!this.player) Tools.sendToIFrames(data);
    if (data?.key) this.execKeyActions(data);
  },
  execKeyActions({ key, bypass, isTrusted }) {
    // Tools.log("按下的键：", { key, isTrusted });
    const dict = {
      M: () => this.toggleMute(),
      R: () => this.rotateVideo(),
      L: () => this.freezeVideoFrame(),
      K: () => this.freezeVideoFrame(!0),
      ENTER: () => this.toggleFullscreen(),
      P: () => this.toggleWebFullscreen(isTrusted),
      D: () => Site.isGmMatch() && this.triggerIconElement(Site.icons.danmaku),
      N: () => (Site.isGmMatch() ? this.triggerIconElement(Site.icons.next) : this.switchEpisode()),
      SPACE: () => (bypass || this.isOverrideKey()) && this.playToggle(this.player),
      LEFT: () => this.skipPlayback(-Storage.SKIP_INTERVAL.get(), bypass),
      RIGHT: () => this.skipPlayback(Storage.SKIP_INTERVAL.get(), bypass),
      0: () => this.skipPlayback(Storage.ZERO_KEY_SKIP.get(), !0) || 0,
      SHIFT_A: () => this.autoNextEnabled(),
      SHIFT_R: () => this.flipHorizontal(),
      CTRL_ALT_A: () => this.screenshot(),
      ALT_SUB: () => this.zoomVideo(!0),
      ALT_ADD: () => this.zoomVideo(),
      CTRL_Z: () => this.resetTsr(),
    };

    // 倍速加减
    const step = Storage.SPEED_STEP.get();
    ["A", "S", "ADD", "SUB"].forEach((k, i) => (dict[k] = () => this.adjustPlaybackRate((i % 2 ? -1 : 1) * step)));

    // 视频移动
    ["ALT_UP", "ALT_DOWN", "ALT_LEFT", "ALT_RIGHT"].forEach((k) => (dict[k] = () => this.moveVideo(k)));

    // 预设常用倍速值
    for (let i = 1; i < 6; i++) dict[`CTRL_${i}`] = () => this.setPlaybackRate(Storage.PRESET_SPEED.get()[i - 1]);

    // 执行函数
    dict[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
  },
  handleMessage(data) {
    // Tools.log(location.href, "接收到消息：", data);
    if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
    if (data?.vMeta) return this.syncMetaToParentWin(data.vMeta);
    if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
    if (data?.topWin) window.topWin = this.topWin = data.topWin;

    // 处理设置时传递过来的消息
    this.handleSettMessage(data);

    // 处理键盘按键消息和继续分发消息
    this.processEvent(data);
  },
  handleSettMessage(data) {
    // 处理在 “更多设置” 中操作功能切换（启用/禁用）时发来的消息
    if (data?.sw_zoom) this.resetTsr(); // 禁用缩放
    if (data?.sw_memory) this.delCachedRate(); // 禁用记忆倍速
    if (data?.sw_speed) this.setPlaybackRate(1); // 禁用倍速调节

    if ("sw_rateKeep" in data) this.playbackRateDisplay(); // 左上角常显倍速
    if ("sw_clockAlw" in data) setTimeout(() => this.changeTimeDisplay(), 30); // 非全屏显示时间
    if ("sw_color" in data) this.setTimeColor(data.sw_color); // 时间颜色
    if ("sw_edgeClk" in data) this.removeEdgeElements(); // 禁用侧边触发网页全屏
  },
};
