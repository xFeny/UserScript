import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import HotKey from "../common/HotKey";
import Store from "../common/Store";

/**
 * 快捷键和消息相关逻辑处理
 */
export default {
  isInputFocus: (e) => Tools.isInputable(e.composedPath()[0]),
  isUndefinedKey: ({ key, code }) => !Object.values(HotKey).includes(code) && !Tools.isNumber(key),
  skipKeyEvent: (e) => App.isNoVideo() || App.isInputFocus(e) || App.isUndefinedKey(e),
  preventEvent(e, { code, altKey } = e) {
    const isNum = Tools.isNumber(e.key) && !this.unUsedRate();
    const isOverride = this.isOverrideKey() && [HotKey.Space, HotKey.Left, HotKey.Right].includes(code);
    const isBlock = [HotKey.K, HotKey.L, HotKey.M, HotKey.N, HotKey.P, HotKey.R].includes(code);
    const isMove = altKey && [HotKey.Up, HotKey.Down, HotKey.Left, HotKey.Right].includes(code);
    if (isNum || isOverride || isBlock || isMove) Tools.preventEvent(e);
  },
  dispatchShortcut(code, isTrusted = false) {
    const data = { key: this.processShortcutKey({ code }), isTrusted };
    Tools.isTopWin() ? this.processEvent(data) : Tools.postMessage(window.top, data);
  },
  processShortcutKey({ key, code, ctrlKey, shiftKey, altKey }) {
    code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
    const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
    return keys.filter(Boolean).join("_").toUpperCase();
  },
  setupKeydownListener() {
    unsafeWindow.addEventListener("keydown", (e) => this.handleKeydown(e), true);
    unsafeWindow.addEventListener("keyup", (e) => !this.skipKeyEvent(e) && this.preventEvent(e), true);
    unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
  },
  handleKeydown(e, { key, code, isTrusted } = e) {
    // Tools.log("键盘事件：", { key, code });
    if (this.skipKeyEvent(e)) return;

    this.preventEvent(e);
    const emitKeys = [HotKey.N, HotKey.P, HotKey.Enter, HotKey.NumEnter];
    if (emitKeys.includes(code)) return this.dispatchShortcut(key, { isTrusted });
    this.processEvent({ key: this.processShortcutKey(e), isTrusted });
  },
  processEvent(data) {
    // 规避父窗口视频对 iframe 内视频网页全屏的干扰
    if (this.vMeta?.iFrame && this.player) delete this.player;

    // 视频可能在 iframe 中，向 iframe 传递操作
    if (!this.player) this.sendToVideoIFrame(data);
    if (data?.key) this.execKeyActions(data);
  },
  execKeyActions({ key, isTrusted }) {
    // Tools.log("按下的键：", { key, isTrusted });
    const dict = {
      M: () => this.muteVideo(),
      R: () => this.rotateVideo(),
      L: () => this.freezeFrame(),
      K: () => this.freezeFrame(-1),
      ENTER: () => this.toggleFullscreen(),
      P: () => this.toggleWebFullscreen(isTrusted),
      D: () => Site.isGmMatch() && this.triggerIcon(Site.icons.danmaku),
      N: () => (Site.isGmMatch() ? this.triggerIcon(Site.icons.next) : this.switchEpisode()),
      SPACE: () => this.isOverrideKey() && this.playToggle(this.player),
      0: () => this.skipPlayback(Store.ZERO_KEY_SKIP.get(), !0) || 0,
      LEFT: () => this.skipPlayback(-Store.SKIP_INTERVAL.get()),
      RIGHT: () => this.skipPlayback(Store.SKIP_INTERVAL.get()),
      SHIFT_A: () => this.autoNextEnabled(),
      CTRL_ALT_S: () => this.screenshot(),
      ALT_SUB: () => this.zoomVideo(-1),
      ALT_ADD: () => this.zoomVideo(),
      SHIFT_R: () => this.horizFlip(),
      CTRL_Z: () => this.resetTsr(),
    };

    // 倍速加减
    ["A", "S", "ADD", "SUB"].forEach((k, i) => (dict[k] = () => this.adjustPlayRate([1, -1][i % 2] * Store.RATE_STEP.get())));

    // 预设常用倍速值
    for (let i = 1; i < 6; i++) dict[`CTRL_${i}`] = () => this.setPlaybackRate(Store.PRESET_RATE.get()[i - 1]);

    // 视频移动
    ["ALT_UP", "ALT_DOWN", "ALT_LEFT", "ALT_RIGHT"].forEach((k) => (dict[k] = () => this.moveVideo(k)));

    // 执行函数
    dict[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
  },
  handleMessage(data) {
    // Tools.log(location.href, "接收到消息：", data, Date.now());
    if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
    if (data?.vMeta) return this.syncMetaToParentWin(data.vMeta);
    if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
    if (data?.topWin) window.topWin = this.topWin = data.topWin;

    // 处理设置时传递过来的消息
    this.handleConfsMessage(data);

    // 处理键盘按键消息和继续分发消息
    this.processEvent(data);
  },
  handleConfsMessage(data) {
    // 处理在 “更多设置” 中操作功能切换（启用/禁用）时发来的消息
    if (data?.sw_memory) this.delCachedRate(); // 禁用记忆倍速
    if (data?.sw_lCode) Store.LOAD_CODE.set(data.sw_lCode, this.host);
    if (data?.sw_fsCode) Store.FS_CODE.set(data.sw_fsCode, this.host);
    if (data?.sw_vCode) Store.VIDEO_CODE.set(data.sw_vCode, this.host);
    if (data?.sw_vCode || data?.sw_fsCode) this.codeSnippetCache.clear(); // 清除缓存的代码片段
    if (data?.sw_speed) (this.setPlaybackRate(1), delete this.player?.playbackRate); // 禁用倍速调节

    if ("sw_sRate" in data) setTimeout(() => this.playbackRateDisplay(), 30); // 左上角常显倍速
    if ("sw_wClock" in data) setTimeout(() => this.changeTimeDisplay(), 30); // 非全屏显示时间
    if ("sw_color" in data) this.setTimeColor(data.sw_color); // 时间颜色
  },
};
