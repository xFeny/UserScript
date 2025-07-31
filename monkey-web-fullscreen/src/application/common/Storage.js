/**
 * 基础存储项类，提供通用的存储操作
 */
class StorageItem {
  constructor(name, defaultValue, useLocalStorage = false, valueParser = null) {
    this.name = name;
    this.valueParser = valueParser;
    this.defaultValue = defaultValue;
    this.useLocalStorage = useLocalStorage;
  }

  set(value) {
    this.setItem(this.name, value);
  }

  setItem(key, value) {
    this.useLocalStorage ? localStorage.setItem(key, value) : GM_setValue(key, value);
  }

  get() {
    return this.parser(this.getItem(this.name) ?? this.defaultValue);
  }

  getItem(key) {
    const value = this.useLocalStorage ? localStorage.getItem(key) : GM_getValue(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  parser(value) {
    return this.valueParser ? this.valueParser(value) : value;
  }

  del() {
    this.removeItem(this.name);
  }

  removeItem(key) {
    this.useLocalStorage ? localStorage.removeItem(key) : GM_deleteValue(key);
  }

  fuzzyGet(pattern) {
    const result = {};
    this.fuzzyMatch(pattern, (key) => (result[key] = this.get(key)));
    return result;
  }

  fuzzyDel(pattern) {
    this.fuzzyMatch(pattern, (key) => this.removeItem(key));
  }

  fuzzyMatch(pattern, callback) {
    const keys = this.useLocalStorage ? Object.keys(localStorage) : GM_listValues();
    keys.forEach((key) => {
      const isMatch = pattern instanceof RegExp ? pattern.test(key) : key.includes(pattern);
      if (isMatch) callback.call(this, key);
    });
  }
}

/**
 * 带过期时间的存储项类，用于需要动态键的存储操作
 */
class TimedStorage extends StorageItem {
  constructor(name, defaultValue, useLocalStorage, valueParser) {
    super(name, defaultValue, useLocalStorage, valueParser);
    this.cleanupExpiredData();
  }

  set(suffix, value, expires) {
    const key = this.name + suffix;
    // if (expires) expires = Date.now() + expires * 1000; // 转换为毫秒 单位：秒
    if (expires) expires = Date.now() + expires * 864e5; // 转换为毫秒 单位：天
    expires ? this.setItem(key, JSON.stringify({ value, expires })) : this.setItem(key, value);
  }

  get(suffix) {
    const storage = this.getItem(this.name + suffix);
    if (!storage?.value) return this.parser(storage ?? this.defaultValue);
    return storage.expires > Date.now() ? this.parser(storage.value) : this.defaultValue;
  }

  del(suffix) {
    this.removeItem(this.name + suffix);
  }

  cleanupExpiredData() {
    this.fuzzyMatch(this.name, (key) => {
      const storage = this.getItem(key);
      if (storage?.expires && storage.expires < Date.now()) this.removeItem(key);
    });
  }
}

/**
 * 缓存的 key-value
 * PLAY_RATE_STEP  倍速步进
 * CACHED_PLAY_RATE  用户设置的播放倍速
 * CLOSE_PLAY_RATE  禁用视频倍速调节
 * SKIP_INTERVAL  设置快进/退秒数
 * OVERRIDE_KEYBOARD  启用 空格 ◀▶ 键控制
 * DISABLE_AUTO  禁用`@match`网址自动网页全屏
 * ZERO_KEY_SKIP_INTERVAL  设置零键快进时长
 *
 * ENABLE_THIS_SITE_AUTO  此站启/禁用自动网页全屏
 * DISABLE_MEMORY_TIME  禁用播放进度记录
 * DISABLE_ZOOM_MOVE  禁用缩放和移动
 * DISABLE_SCREENSHOT  禁用视频截图
 * REL_EPISODE_SELECTOR  通用切换下集—集数列表中的任意一集 拾取的CSS选择器
 * CURR_EPISODE_SELECTOR  通用切换下集—当前播放集数 拾取的CSS选择器
 * STORAGE_DAYS 视频播放进度要保存的天数
 * PLAY_TIME  记录的播放进度
 */
export default {
  PLAY_RATE_STEP: new StorageItem("PLAY_RATE_STEP", 0.25, false, parseFloat),
  CACHED_PLAY_RATE: new StorageItem("FENY_SCRIPTS_V_PLAYBACK_RATE", 1, true, parseFloat),
  CLOSE_PLAY_RATE: new StorageItem("CLOSE_PLAY_RATE", false, false, (value) => Boolean(value)),
  SKIP_INTERVAL: new StorageItem("VIDEO_SKIP_INTERVAL", 5, false, (value) => parseInt(value, 10)),
  OVERRIDE_KEYBOARD: new StorageItem("OVERRIDE_KEYBOARD", false, false, (value) => Boolean(value)),
  DISABLE_AUTO: new StorageItem("CLOSE_AUTO_WEB_FULL_SCREEN", false, false, (value) => Boolean(value)),
  ZERO_KEY_SKIP_INTERVAL: new StorageItem("ZERO_KEY_SKIP_INTERVAL", 30, false, (value) => parseInt(value, 10)),
  ENABLE_THIS_SITE_AUTO: new TimedStorage("ENABLE_THIS_SITE_AUTO_", false, false, (value) => Boolean(value)),
  DISABLE_MEMORY_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, (value) => Boolean(value)),
  DISABLE_ZOOM_MOVE: new StorageItem("DISABLE_ZOOM_MOVE", true, false, (value) => Boolean(value)),
  DISABLE_SCREENSHOT: new StorageItem("DISABLE_ZOOM", true, false, (value) => Boolean(value)),
  CURR_EPISODE_SELECTOR: new TimedStorage("CURRENT_EPISODE_SELECTOR_", null),
  REL_EPISODE_SELECTOR: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", null),
  STORAGE_DAYS: new StorageItem("STORAGE_DAYS", 7, false, parseFloat),
  PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true, parseFloat),
};
