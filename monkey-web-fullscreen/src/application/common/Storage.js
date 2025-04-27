// localStorage或GM_setValue缓存
const setStorage = function (value) {
  GM_setValue(this.name, value);
};
const getStorage = function (defaultValue) {
  return GM_getValue(this.name, defaultValue);
};
export default {
  CACHED_PLAY_RATE: Object.freeze({
    name: "FENY_SCRIPTS_V_PLAYBACK_RATE",
    set(value) {
      localStorage.setItem(this.name, value); // 缓存倍速
    },
    get() {
      return localStorage.getItem(this.name);
    },
  }),
  PLAY_RATE_STEP: Object.freeze({
    name: "PLAY_RATE_STEP",
    set: setStorage,
    get() {
      return Number.parseFloat(getStorage.bind(this, 0.25)()); //  倍速步进
    },
  }),
  CLOSE_PLAY_RATE: Object.freeze({
    name: "CLOSE_PLAY_RATE",
    set: setStorage,
    get() {
      return getStorage.bind(this, false)(); //  是否关闭倍速设置功能
    },
  }),
  VIDEO_FASTFORWARD_DURATION: Object.freeze({
    name: "VIDEO_FASTFORWARD_DURATION",
    set: setStorage,
    get() {
      return Number.parseInt(getStorage.bind(this, 30)()); //  数字零键的快进秒数
    },
  }),
  VIDEO_TIME_STEP: Object.freeze({
    name: "VIDEO_TIME_STEP",
    set: setStorage,
    get() {
      return Number.parseInt(getStorage.bind(this, 5)()); // 快进、快退的秒数
    },
  }),
  CLOSE_AUTO_WEB_FULL: Object.freeze({
    name: "CLOSE_AUTO_WEB_FULL_SCREEN",
    set: setStorage,
    get() {
      return getStorage.bind(this, false)(); // 是否关闭自动网页全屏
    },
  }),
  OVERRIDE_KEYBOARD: Object.freeze({
    name: "OVERRIDE_KEYBOARD",
    set: setStorage,
    get() {
      return getStorage.bind(this, false)(); // 是否开启空格 ◀▶ 键控制
    },
  }),
};
