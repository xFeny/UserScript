import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import keyboard from "../common/Keyboard";
import SiteIcons from "../common/SiteIcons";

/**
 * 快捷键逻辑处理
 */
export default {
  preventDefault(event) {
    // Tools.log(event);
    const overrideKey = [keyboard.Space, keyboard.ArrowLeft, keyboard.ArrowRight]; // 空格 ◀▶ 键
    const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(event.code);
    const isNumberKey = Tools.isNumber(event.key) && !this.isDisablePlaybackRate();
    if (!isNumberKey && !isOverrideKey) return;
    Tools.preventDefault(event);
  },
  setupKeydownListener() {
    window.addEventListener("keyup", (event) => this.preventDefault(event), true); // 腾讯视频
    window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
    window.addEventListener("message", ({ data }) => {
      // Tools.log(location.href, "接收到消息：", data);
      if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
      if (data?.videoInfo) return this.setParentVideoInfo(data.videoInfo);
      if (data?.topInfo) window.topInfo = this.topInfo = data.topInfo;
      if (data?.defaultPlaybackRate) this.defaultPlaybackRate();
      this.processEvent(data);
    });
  },
  keydownHandler(event, { key, code, ctrlKey, shiftKey } = event) {
    // Tools.log("键盘事件：", event);
    const target = event.composedPath()[0];
    const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName);
    if (this.normalSite() || isInput || target?.isContentEditable) return;
    if (!Object.keys(keyboard).includes(code) && !Tools.isNumber(key)) return;
    this.preventDefault(event);
    if (keyboard.Space === code || (shiftKey && keyboard.KeyR === code)) key = code;
    if ([keyboard.KeyP, keyboard.KeyN].includes(code)) return Tools.postMessage(window.top, { key });
    this.processEvent({ key });
  },
  processEvent(data) {
    // video可能在iframe中，向iframe传递事件
    if (!this.video) Tools.sendToIFrames(data);
    if (data?.key) this.execHotKeyActions(data.key.toUpperCase());
  },
  execHotKeyActions(key) {
    // Tools.log("按下的键：", { key });
    const mapping = {
      N: () => (Site.isMatch() ? this.triggerIconElement(SiteIcons.name.next) : this.switchEpisode()),
      P: () => (Site.isMatch() ? this.triggerIconElement(SiteIcons.name.webFull) : this.webFullEnhance()),
      ARROWLEFT: () => this.isOverrideKeyboard() && this.adjustVideoTime(-Storage.SKIP_INTERVAL.get()),
      ARROWRIGHT: () => this.isOverrideKeyboard() && this.adjustVideoTime(Storage.SKIP_INTERVAL.get()),
      0: () => this.adjustVideoTime(Storage.ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
      SPACE: () => this.isOverrideKeyboard() && this.playOrPause(this.video),
      D: () => this.triggerIconElement(SiteIcons.name.danmaku),
      F: () => this.triggerIconElement(SiteIcons.name.full),
      KEYR: () => this.videoRotateOrMirror(true),
      R: () => this.videoRotateOrMirror(),
      Z: () => this.defaultPlaybackRate(),
    };
    [keyboard.A, keyboard.ADD].forEach((key) => (mapping[key] = () => this.adjustPlaybackRate(Storage.PLAY_RATE_STEP.get())));
    [keyboard.S, keyboard.SUB].forEach((key) => (mapping[key] = () => this.adjustPlaybackRate(-Storage.PLAY_RATE_STEP.get())));

    mapping[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
  },
  triggerIconElement(name) {
    const index = Object.values(SiteIcons.name).indexOf(name);
    if (!Site.isBiliLive()) return Tools.query(SiteIcons[location.host]?.[name])?.click();
    SiteIcons.name.webFull === name ? this.liveWebFullScreen() : this.getBiliLiveIcons()?.[index]?.click();
  },
};
