import douyu from "./DouyuHandler";
import Tools from "../common/Tools";
import storage from "../common/Storage";
import constants from "../common/Constants";
import eventCode from "../common/EventCode";
import selectorConfig from "../common/SelectorConfig";
const { VIDEO_TIME_STEP, VIDEO_FASTFORWARD_DURATION } = storage;
const { EMPTY, SYMBOL, MSG_SOURCE } = constants;

// 快捷键逻辑处理
export default {
  preventDefault(event) {
    // Tools.log(event);
    const overrideKey = [eventCode.Space, eventCode.ArrowLeft, eventCode.ArrowRight]; // 空格 ◀▶ 键
    const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(event.code);
    if (!Tools.isNumber(event.key) && !isOverrideKey) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  },
  setupKeydownListener() {
    window.addEventListener("keyup", (event) => this.preventDefault(event), true);
    window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
    window.addEventListener("message", (event) => {
      const { data } = event;
      // Tools.log("接收到消息：", data, location.href);
      if (!data?.source || !data.source.includes(MSG_SOURCE)) return;
      if (data?.videoCenterPoint) return this.setParentFrameSrc(data.videoCenterPoint);
      this.processEvent(data);
    });
  },
  keydownHandler(event) {
    // Tools.log(event);
    if (this.normalWebsite()) return;
    let key = event.key.toUpperCase();
    const { code, target, shiftKey } = event;
    if (["INPUT", "TEXTAREA", "DEMAND-SEARCH-BOX"].includes(target.tagName)) return;
    if (!Object.keys(eventCode).includes(code) && !Tools.isNumber(key)) return;
    this.preventDefault(event);
    if (eventCode.Space === code) key = eventCode.Space.toUpperCase();
    if (shiftKey && eventCode.NumpadAdd === code) key = SYMBOL.MULTIPLY; // shift + 组合快捷键
    if (shiftKey && eventCode.NumpadSubtract === code) key = SYMBOL.DIVIDE; // shift - 组合快捷键
    if (!Tools.isTopWin() && eventCode.KeyP === code) return Tools.postMessage(window.top, { key });
    this.processEvent({ key });
  },
  processEvent(data) {
    // video可能在iframe中，向iframe传递事件
    if (!this.video) Tools.postMsgToFrames(data);
    if (data?.key) this.execHotKeyActions(data.key);
  },
  execHotKeyActions(key) {
    // console.log({ key });
    if (this.normalWebsite()) return;
    const keyMapping = this.getKeyMapping();
    if (keyMapping[key]) return keyMapping[key]();
    if (Tools.isNumber(key)) this.setPlayRate(key) && this.playRateToast(); // 倍速
  },
  getKeyMapping() {
    return {
      N: () => this.triggerIconElement("next"),
      A: () => this.adjustPlayRate(SYMBOL.ADD),
      S: () => this.adjustPlayRate(SYMBOL.SUBTRACT),
      [SYMBOL.ADD]: () => this.adjustPlayRate(SYMBOL.ADD),
      [SYMBOL.SUBTRACT]: () => this.adjustPlayRate(SYMBOL.SUBTRACT),
      [SYMBOL.MULTIPLY]: () => this.adjustPlayRate(SYMBOL.MULTIPLY),
      [SYMBOL.DIVIDE]: () => this.adjustPlayRate(SYMBOL.DIVIDE),
      Z: () => this.setPlayRate(1) && this.showToast("已恢复正常倍速播放"),
      F: () => (this.isDouyu() ? douyu.getFullIcon().click() : this.triggerIconElement("full", 0)),
      D: () => (this.isDouyu() ? douyu.getDanmakuIcon().click() : this.triggerIconElement("danmaku", 3)),
      ARROWLEFT: () => (this.isOverrideKeyboard() ? this.adjustVideoTime(SYMBOL.SUBTRACT) : null),
      ARROWRIGHT: () => (this.isOverrideKeyboard() ? this.adjustVideoTime() : null),
      0: () => this.adjustVideoTime(VIDEO_FASTFORWARD_DURATION.get()),
      P: () => {
        if (!this.inMatches()) return this.enhance();
        if (this.isDouyu()) return douyu.getWebfullIcon().click();
        this.isBiliLive() ? this.biliLiveWebFullScreen() : this.triggerIconElement("webfull");
      },
      SPACE: () => {
        if (!this.video || !this.isOverrideKeyboard()) return;
        if (this.isDouyu()) return this.video.paused ? douyu.play() : douyu.pause();
        this.video.paused ? this.video.play() : this.video.pause();
      },
    };
  },
  triggerIconElement(name, index) {
    if (!this.inMatches()) return;
    if (this.isBiliLive()) return this.getBiliLiveIcons()?.[index]?.click();
    Tools.query(selectorConfig[location.host]?.[name])?.click();
  },
  adjustVideoTime(second = VIDEO_TIME_STEP.get(), _symbol) {
    if (!this.video || !Tools.validVideoDur(this.video)) return;
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
