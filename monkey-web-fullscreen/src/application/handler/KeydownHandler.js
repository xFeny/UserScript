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
  processKeystrokes({ key, code, ctrlKey, shiftKey, altKey }) {
    code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
    const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
    return keys.filter(Boolean).join("_");
  },
  setupKeydownListener() {
    window.addEventListener("keyup", (event) => this.preventDefault(event), true); // 腾讯视频
    window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
    window.addEventListener("message", ({ data }) => {
      // Tools.log(location.href, "接收到消息：", data);
      if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
      if (data?.videoInfo) return this.setParentWinVideoInfo(data.videoInfo);
      if (data?.topWin) window.topWin = this.topWin = data.topWin;
      if (data?.disable_rate) this.resetToDefaultPlayRate();
      this.processEvent(data);
    });
  },
  keydownHandler(event, { key, code } = event) {
    // Tools.log("键盘事件：", { key, code });
    const target = event.composedPath()[0];
    const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName);
    if (this.isNormalSite() || isInput || target?.isContentEditable) return;
    if (!Object.values(Keyboard).includes(code) && !Tools.isNumber(key)) return;

    this.preventDefault(event);
    key = this.processKeystrokes(event);
    if ([Keyboard.N, Keyboard.P].includes(code)) return Tools.postMessage(window.top, { key });
    this.processEvent({ key });
  },
  processEvent(data) {
    // video在iframe中，向iframe传递事件
    if (!this.player) Tools.sendToIFrames(data);
    if (data?.key) this.execHotKeyActions(data.key.toUpperCase());
  },
  execHotKeyActions(key) {
    // Tools.log("按下的键：", { key });
    const dict = {
      M: () => this.toggleMute(),
      R: () => this.rotateVideo(),
      L: () => this.freezeVideoFrame(),
      K: () => this.freezeVideoFrame(true),
      Z: () => this.resetToDefaultPlayRate(),
      D: () => Site.isMatched() && this.triggerIconElement(SiteIcons.name.danmaku),
      N: () => (Site.isMatched() ? this.triggerIconElement(SiteIcons.name.next) : this.switchEpisode()),
      P: () => (Site.isMatched() ? this.triggerIconElement(SiteIcons.name.webFull) : this.webFullEnhance()),
      LEFT: () => this.isOverrideKeyboard() && this.adjustPlayProgress(-Storage.SKIP_INTERVAL.get()),
      RIGHT: () => this.isOverrideKeyboard() && this.adjustPlayProgress(Storage.SKIP_INTERVAL.get()),
      0: () => this.adjustPlayProgress(Storage.ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
      SPACE: () => this.isOverrideKeyboard() && this.togglePlayPause(this.player),
      SHIFT_P: () => this.togglePictureInPicture(),
      SHIFT_L: () => this.toggleNativeControls(),
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

    // CTRL_[0-6] 设置10-16x倍速
    Array.from({ length: 7 }, (_, i) => (dict[`CTRL_${i}`] = () => this.setPlaybackRate(10 + i)));

    // 视频移动
    ["ALT_UP", "ALT_DOWN", "ALT_LEFT", "ALT_RIGHT"].forEach((k) => (dict[k] = () => this.moveVideoPosition(k)));

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
