import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import storage from "../common/Storage";
import keyboard from "../common/Keyboard";
import constants from "../common/Constants";
import selectorConfig from "../common/SelectorConfig";
const { PLAY_RATE_STEP, VIDEO_SKIP_INTERVAL, ZERO_KEY_SKIP_INTERVAL } = storage;

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
      if (!data?.source?.includes(constants.MSG_SOURCE)) return;
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
    if (!this.video) Tools.postMsgToFrames(data);
    if (data?.key) this.execHotKeyActions(data.key.toUpperCase());
  },
  execHotKeyActions(key) {
    // Tools.log("按下的键：", { key });
    const mapping = {
      Z: () => this.defaultPlaybackRate(),
      P: () => (webSite.inMatches() ? this.triggerIconElement("webfull", 1) : this.enhance()),
      N: () => (webSite.inMatches() ? this.triggerIconElement("next") : this.switchEpisode()),
      ARROWLEFT: () => this.isOverrideKeyboard() && this.adjustVideoTime(-VIDEO_SKIP_INTERVAL.get()),
      ARROWRIGHT: () => this.isOverrideKeyboard() && this.adjustVideoTime(VIDEO_SKIP_INTERVAL.get()),
      SPACE: () => this.isOverrideKeyboard() && this.playOrPause(this.video),
      0: () => this.adjustVideoTime(ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
      D: () => this.triggerIconElement("danmaku", 3),
      F: () => this.triggerIconElement("full", 0),
      KEYR: () => this.videoRotateOrMirror(true),
      R: () => this.videoRotateOrMirror(),
    };
    [keyboard.A, keyboard.ADD].forEach((key) => (mapping[key] = () => this.adjustPlaybackRate(PLAY_RATE_STEP.get())));
    [keyboard.S, keyboard.SUB].forEach((key) => (mapping[key] = () => this.adjustPlaybackRate(-PLAY_RATE_STEP.get())));

    mapping[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
  },
  triggerIconElement(name, index) {
    webSite.isBiliLive()
      ? this.getBiliLiveIcons()?.[index]?.click()
      : Tools.query(selectorConfig[location.host]?.[name])?.click();
  },
};
