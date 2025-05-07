import douyu from "./DouyuHandler";
import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import storage from "../common/Storage";
import constants from "../common/Constants";
import eventCode from "../common/EventCode";
import selectorConfig from "../common/SelectorConfig";
const { VIDEO_TIME_STEP, VIDEO_FASTFORWARD_DURATION } = storage;
const { EMPTY, SYMBOL, MSG_SOURCE } = constants;

/**
 * 快捷键逻辑处理
 */
export default {
  preventDefault(event) {
    // Tools.log(event);
    const overrideKey = [eventCode.Space, eventCode.ArrowLeft, eventCode.ArrowRight]; // 空格 ◀▶ 键
    const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(event.code);
    const isNumberKey = Tools.isNumber(event.key) && !this.isClosedPlayRate();
    if (!isNumberKey && !isOverrideKey) return;
    Tools.preventDefault(event);
  },
  setupKeydownListener() {
    window.addEventListener("keyup", (event) => this.preventDefault(event), true);
    window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
    window.addEventListener("message", (event) => {
      const { data } = event;
      // Tools.log(location.href, "接收到消息：", data);
      if (!data?.source || !data.source.includes(MSG_SOURCE)) return;
      if (data?.videoInfo) return this.setParentVideoInfo(data.videoInfo);
      if (data?.defaultPlaybackRate) this.defaultPlaybackRate();
      if (data?.topWinInfo) this.topWinInfo = data.topWinInfo;
      this.processEvent(data);
    });
  },
  keydownHandler(event) {
    // Tools.log("键盘事件：", event);
    if (this.normalWebsite()) return;
    let key = event.key.toUpperCase();
    const { code, target, shiftKey } = event;
    if (["INPUT", "TEXTAREA", "DEMAND-SEARCH-BOX"].includes(target.tagName)) return;
    if (!Object.keys(eventCode).includes(code) && !Tools.isNumber(key)) return;
    this.preventDefault(event);
    if (eventCode.Space === code) key = eventCode.Space.toUpperCase();
    if (shiftKey && eventCode.NumpadAdd === code) key = SYMBOL.MULTIPLY; // shift + 组合快捷键
    if (shiftKey && eventCode.NumpadSubtract === code) key = SYMBOL.DIVIDE; // shift - 组合快捷键
    if (!Tools.isTopWin() && [eventCode.KeyP, eventCode.KeyN].includes(code)) {
      return Tools.postMessage(window.top, { key });
    }
    this.processEvent({ key });
  },
  processEvent(data) {
    // video可能在iframe中，向iframe传递事件
    if (!this.video) Tools.postMsgToFrames(data);
    if (data?.key) this.execHotKeyActions(data.key);
  },
  execHotKeyActions(key) {
    // Tools.log("按下的键：", { key });
    if (this.normalWebsite()) return;
    const keyMapping = this.getKeyMapping();
    if (keyMapping[key]) return keyMapping[key]();
    if (Tools.isNumber(key)) this.setPlaybackRate(key); // 倍速
  },
  getKeyMapping() {
    return {
      Z: () => this.defaultPlaybackRate(),
      A: () => this.adjustPlaybackRate(SYMBOL.ADD),
      S: () => this.adjustPlaybackRate(SYMBOL.SUBTRACT),
      [SYMBOL.ADD]: () => this.adjustPlaybackRate(SYMBOL.ADD),
      [SYMBOL.DIVIDE]: () => this.adjustPlaybackRate(SYMBOL.DIVIDE),
      [SYMBOL.SUBTRACT]: () => this.adjustPlaybackRate(SYMBOL.SUBTRACT),
      [SYMBOL.MULTIPLY]: () => this.adjustPlaybackRate(SYMBOL.MULTIPLY),
      N: () => (webSite.inMatches() ? this.triggerIconElement("next") : this.switchNextEpisode()),
      ARROWLEFT: () => (this.isOverrideKeyboard() ? this.adjustVideoTime(SYMBOL.SUBTRACT) : null),
      ARROWRIGHT: () => (this.isOverrideKeyboard() ? this.adjustVideoTime() : null),
      0: () => this.adjustVideoTime(VIDEO_FASTFORWARD_DURATION.get()),
      P: () => {
        if (!webSite.inMatches()) return this.enhance();
        webSite.isBiliLive() ? this.biliLiveWebFullScreen() : this.triggerIconElement("webfull");
      },
      SPACE: () => {
        if (!this.video || !this.isOverrideKeyboard()) return;
        if (webSite.isDouyu()) return this.video.paused ? douyu.play() : douyu.pause();
        this.video.paused ? this.video.play() : this.video.pause();
      },
      F: () => this.triggerIconElement("full", 0),
      D: () => this.triggerIconElement("danmaku", 3),
    };
  },
  triggerIconElement(name, index) {
    if (!webSite.inMatches()) return;
    if (webSite.isBiliLive()) return this.getBiliLiveIcons()?.[index]?.click();
    Tools.query(selectorConfig[location.host]?.[name])?.click();
  },
  adjustVideoTime(second = VIDEO_TIME_STEP.get(), _symbol) {
    if (!this.video || !Tools.validDuration(this.video)) return;
    if (_symbol && ![SYMBOL.ADD, SYMBOL.SUBTRACT].includes(_symbol)) return;
    if (Object.is(typeof second, typeof EMPTY) && !_symbol) {
      _symbol = second;
      second = VIDEO_TIME_STEP.get();
    }
    second = Object.is(SYMBOL.SUBTRACT, _symbol) ? -second : second;
    const currentTime = this.video.currentTime + second;
    this.video.currentTime = Math.max(0, currentTime);
  },
};
