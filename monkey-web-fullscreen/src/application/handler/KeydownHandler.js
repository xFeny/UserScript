import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import keyboard from "../common/Keyboard";
import SiteIcons from "../common/SiteIcons";
import Keyboard from "../common/Keyboard";

/**
 * 快捷键逻辑处理
 */
export default {
  preventDefault(event, { code } = event) {
    const preventKeys = [Keyboard.KeyM, Keyboard.KeyP].includes(code); // 要阻止事件传递的键
    const isNumberKey = Tools.isNumber(event.key) && !this.isDisablePlaybackRate();
    const overrideKey = [keyboard.Space, keyboard.Left, keyboard.Right]; // 空格 ◀▶ 键
    const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(code);

    if (!isNumberKey && !isOverrideKey && !preventKeys) return;
    Tools.preventDefault(event);
  },
  processkeystrokes({ key, code, ctrlKey, shiftKey, altKey }) {
    const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[A-Za-z0-9]/.test(key) ? key : code];
    return keys.filter(Boolean).join("_");
  },
  setupKeydownListener() {
    window.addEventListener("keyup", (event) => this.preventDefault(event), true); // 腾讯视频
    window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
    window.addEventListener("message", ({ data }) => {
      // Tools.log(location.href, "接收到消息：", data);
      if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
      if (data?.videoInfo) return this.setParentVideoInfo(data.videoInfo);
      if (data?.topInfo) window.topInfo = this.topInfo = data.topInfo;
      if (data?.defaultPlaybackRate) this.defPlaybackRate();
      this.processEvent(data);
    });
  },
  keydownHandler(event, { key, code } = event) {
    // Tools.log("键盘事件：", event);
    const target = event.composedPath()[0];
    const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName);
    if (this.normalSite() || isInput || target?.isContentEditable) return;
    if (!Object.values(keyboard).includes(code) && !Tools.isNumber(key)) return;

    this.preventDefault(event);
    key = this.processkeystrokes(event);
    if ([keyboard.P, keyboard.N].includes(key)) return Tools.postMessage(window.top, { key });
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
      M: () => this.videoMuted(),
      R: () => this.videoRotate(),
      Z: () => this.defPlaybackRate(),
      L: () => this.freezeVideoFrame(),
      K: () => this.freezeVideoFrame(true),
      ALT_NUMPADADD: () => this.videoZoom(),
      ALT_NUMPADSUBTRACT: () => this.videoZoom(true),
      D: () => this.triggerIconElement(SiteIcons.name.danmaku),
      N: () => (Site.isMatch() ? this.triggerIconElement(SiteIcons.name.next) : this.switchEpisode()),
      P: () => (Site.isMatch() ? this.triggerIconElement(SiteIcons.name.webFull) : this.webFullEnhance()),
      ARROWLEFT: () => this.isOverrideKeyboard() && this.adjustVideoTime(-Storage.SKIP_INTERVAL.get()),
      ARROWRIGHT: () => this.isOverrideKeyboard() && this.adjustVideoTime(Storage.SKIP_INTERVAL.get()),
      0: () => this.adjustVideoTime(Storage.ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
      SPACE: () => this.isOverrideKeyboard() && this.playOrPause(this.player),
      SHIFT_P: () => this.togglePictureInPicture(),
      CTRL_ALT_A: () => this.videoScreenshot(),
      SHIFT_R: () => this.videoMirrorFlip(),
      CTRL_Z: () => this.restTransform(),
    };

    // 倍速加减
    const step = Storage.PLAY_RATE_STEP.get();
    [keyboard.A, keyboard.Add.toUpperCase()].forEach((k) => (dict[k] = () => this.adjustPlaybackRate(step)));
    [keyboard.S, keyboard.Sub.toUpperCase()].forEach((k) => (dict[k] = () => this.adjustPlaybackRate(-step)));

    // 视频上下左右移动
    ["ALT_ARROWUP", "ALT_ARROWDOWN", "ALT_ARROWLEFT", "ALT_ARROWRIGHT"].forEach((k) => (dict[k] = () => this.moveVideo(k)));

    // 执行函数
    dict[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
  },
  triggerIconElement(name) {
    if (Tools.isTooFrequent("icon")) return;
    const index = Object.values(SiteIcons.name).indexOf(name);
    if (!Site.isBiliLive()) return Tools.query(SiteIcons[location.host]?.[name])?.click();
    SiteIcons.name.webFull === name ? this.liveWebFullScreen() : this.getBiliLiveIcons()?.[index]?.click();
  },
};
