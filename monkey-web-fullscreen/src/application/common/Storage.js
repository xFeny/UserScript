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
    this.fuzzyMatch(pattern, (key) => (result[key] = this.getItem(key)));
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
    requestIdleCallback(() => this.cleanupExpiredData());
  }

  set(suffix, value, expires) {
    const key = this.name + suffix;
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
 * PLAY_RATE_STEP  设置倍速步长
 * CACHED_PLAY_RATE  记忆用户设置的播放倍速
 * CLOSE_PLAY_RATE  禁用视频倍速调节
 * SKIP_INTERVAL  设置快进/退秒数
 * OVERRIDE_KEYBOARD  启用 空格 ◀▶ 键控制
 * DISABLE_AUTO  禁用`@match`网址自动网页全屏
 * ZERO_KEY_SKIP_INTERVAL  设置零键快进时长
 * DISABLE_INVISIBLE_PAUSE  禁用标签页隐藏暂停
 * ENABLE_AUTO_NEXT_EPISODE   启用自动切换至下集
 * AUTO_NEXT_ADVANCE_SEC  设置自动下集的提前秒数
 * ENABLE_THIS_SITE_AUTO  此站启/禁用自动网页全屏
 * DISABLE_DEF_MAX_VOLUME  禁用音量默认百分百
 * DISABLE_MEMORY_TIME  禁用播放进度记录
 * DISABLE_ZOOM_MOVE  禁用缩放和移动
 * PERCENT_OF_ZOOM    缩放百分比
 * MOVING_DISTANCE    移动距离
 * DISABLE_SCREENSHOT  禁用视频截图
 * CURR_EPISODE_SELECTOR  通用切换下集—当前播放集数 拾取的CSS选择器
 * REL_EPISODE_SELECTOR   通用切换下集—集数列表中的任意一集 拾取的CSS选择器
 * STORAGE_DAYS   设置播放进度保存天数
 * NEXT_IGNORE_URLS  自动切换下集时忽略的网址列表
 * FULL_IGNORE_URLS   自动网页全屏时忽略的网址列表
 * CUSTOM_WEB_FULL    自定义此站网页全屏容器
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
  DISABLE_INVISIBLE_PAUSE: new StorageItem("DISABLE_INVISIBLE_PAUSE", false, false, (value) => Boolean(value)),
  ENABLE_AUTO_NEXT_EPISODE: new StorageItem("ENABLE_AUTO_NEXT_EPISODE", false, false, (value) => Boolean(value)),
  AUTO_NEXT_ADVANCE_SEC: new StorageItem("AUTO_NEXT_ADVANCE_SECONDS", 75, false, (value) => parseInt(value, 10)),
  ENABLE_THIS_SITE_AUTO: new TimedStorage("ENABLE_THIS_SITE_AUTO_", false, false, (value) => Boolean(value)),
  DISABLE_DEF_MAX_VOLUME: new StorageItem("DISABLE_DEF_MAX_VOLUME", false, false, (value) => Boolean(value)),
  DISABLE_MEMORY_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, (value) => Boolean(value)),
  DISABLE_ZOOM_MOVE: new StorageItem("DISABLE_ZOOM_MOVE", true, false, (value) => Boolean(value)),
  PERCENT_OF_ZOOM: new StorageItem("PERCENT_OF_ZOOM", 10, false, (value) => parseInt(value, 10)),
  MOVING_DISTANCE: new StorageItem("MOVING_DISTANCE", 10, false, (value) => parseInt(value, 10)),
  DISABLE_SCREENSHOT: new StorageItem("DISABLE_ZOOM", true, false, (value) => Boolean(value)),
  CURR_EPISODE_SELECTOR: new TimedStorage("CURRENT_EPISODE_SELECTOR_", null),
  REL_EPISODE_SELECTOR: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", null),
  STORAGE_DAYS: new StorageItem("STORAGE_DAYS", 7, false, parseFloat),
  NEXT_IGNORE_URLS: new StorageItem("NEXT_IGNORE_URLS", "", false),
  FULL_IGNORE_URLS: new StorageItem("FULL_IGNORE_URLS", "", false),
  CUSTOM_WEB_FULL: new TimedStorage("CUSTOM_WEB_FULL_", "", false),
  PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true, parseFloat),
};
