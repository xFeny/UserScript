import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Keyboard from "../common/Keyboard";
import SiteIcons from "../common/SiteIcons";

/**
 * 快捷键和消息相关逻辑处理
 */
export default {
  preventDefault(event, { code, altKey } = event) {
    const overrideKey = [Keyboard.Space, Keyboard.Left, Keyboard.Right];
    const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(code);
    const isNumberKey = Tools.isNumber(event.key) && !this.isDisablePlaybackRate();
    const preventKeys = [Keyboard.K, Keyboard.L, Keyboard.M, Keyboard.N, Keyboard.P, Keyboard.R].includes(code);
    const zoomKeys = !this.isDisableZoom() && [Keyboard.Up, Keyboard.Down, Keyboard.Left, Keyboard.Right].includes(code);
    if (isNumberKey || isOverrideKey || preventKeys || (altKey && zoomKeys)) Tools.preventDefault(event);
  },
  dispatchShortcutKey(code) {
    const key = this.processShortcutKey({ code });
    Tools.postMessage(window.top, { key });
  },
  processShortcutKey({ key, code, ctrlKey, shiftKey, altKey }) {
    code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
    const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
    return keys.filter(Boolean).join("_").toUpperCase();
  },
  setupKeydownListener() {
    window.addEventListener("keyup", (event) => this.preventDefault(event), true); // 腾讯视频
    window.addEventListener("keydown", (event) => this.handleKeydown.call(this, event), true);
    window.addEventListener("message", ({ data }) => this.handleMessage.call(this, data, true));
  },
  handleMessage(data) {
    // Tools.log(location.href, "接收到消息：", data);
    if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
    if (data?.videoInfo) return this.setParentWinVideoInfo(data.videoInfo);
    if ("disable_always" in data) setTimeout(() => this.createClock(), 100);
    if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
    if (data?.topWin) window.topWin = this.topWin = data.topWin;
    if (data?.disable_speed) this.resetToDefaultPlayRate();
    if (data?.disable_memory) this.deleteCachedPlayRate();
    if (data?.disable_zoom) this.resetVideoTransform();
    this.processEvent(data);
  },
  handleKeydown(event, { key, code, isTrusted } = event) {
    // Tools.log("键盘事件：", { key, code });
    const target = event.composedPath()[0];
    const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName);
    if (this.isNormalSite() || isInput || target?.isContentEditable) return;
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
  execHotKeyActions({ key, isTrusted }) {
    // Tools.log("按下的键：", { key, isTrusted });
    const dict = {
      M: () => this.toggleMute(),
      R: () => this.rotateVideo(),
      L: () => this.freezeVideoFrame(),
      K: () => this.freezeVideoFrame(true),
      Z: () => this.resetToDefaultPlayRate(),
      D: () => Site.isMatched() && this.triggerIconElement(SiteIcons.name.danmaku),
      N: () => (Site.isMatched() ? this.triggerIconElement(SiteIcons.name.next) : this.switchEpisode()),
      ENTER: () => (Site.isMatched() ? this.triggerIconElement(SiteIcons.name.full) : this.toggleFullscreen()),
      P: () => (Site.isMatched() ? this.triggerIconElement(SiteIcons.name.webFull) : this.webFullEnhance(isTrusted)),
      LEFT: () => this.isOverrideKeyboard() && this.adjustPlayProgress(-Storage.SKIP_INTERVAL.get()),
      RIGHT: () => this.isOverrideKeyboard() && this.adjustPlayProgress(Storage.SKIP_INTERVAL.get()),
      0: () => this.adjustPlayProgress(Storage.ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
      SPACE: () => this.isOverrideKeyboard() && this.togglePlayPause(this.player),
      SHIFT_P: () => this.togglePictureInPicture(),
      CTRL_ALT_A: () => this.captureScreenshot(),
      CTRL_Z: () => this.resetVideoTransform(),
      SHIFT_R: () => this.toggleMirrorFlip(),
      ALT_SUB: () => this.zoomVideo(true),
      ALT_ADD: () => this.zoomVideo(),
    };

    // 倍速加减
    const step = Storage.PLAY_RATE_STEP.get();
    ["A", "ADD"].forEach((k) => (dict[k] = () => this.adjustPlaybackRate(step)));
    ["S", "SUB"].forEach((k) => (dict[k] = () => this.adjustPlaybackRate(-step)));

    // 视频移动
    ["ALT_UP", "ALT_DOWN", "ALT_LEFT", "ALT_RIGHT"].forEach((k) => (dict[k] = () => this.moveVideoPosition(k)));

    // 预设常用倍速值
    for (let i = 1; i < 6; i++) {
      dict[`CTRL_${i}`] = () => this.setPlaybackRate(Storage.PRESET_SPEED.get()[i - 1]);
    }

    // 执行函数
    dict[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
  },
  triggerIconElement(name) {
    if (Tools.isFrequent("icon")) return;
    const index = Object.values(SiteIcons.name).indexOf(name);
    if (!Site.isBiliLive()) return Tools.query(SiteIcons[location.host]?.[name])?.click();
    SiteIcons.name.webFull === name ? this.liveWebFullscreen() : this.getBiliLiveIcons()?.[index]?.click();
  },
};
