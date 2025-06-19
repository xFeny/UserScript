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
}

/**
 * 带过期时间的存储项类，用于需要动态键的存储操作
 */
class TimedStorage extends StorageItem {
  constructor(name, defaultValue, useLocalStorage, valueParser) {
    super(name, defaultValue, useLocalStorage, valueParser);
    this.clearExpired();
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

  clearExpired() {
    const keys = this.useLocalStorage ? Object.keys(localStorage) : GM_listValues();
    keys
      .filter((key) => key.includes(this.name))
      .forEach((key) => {
        const storage = this.getItem(key);
        if (storage?.expires && storage.expires < Date.now()) this.removeItem(key);
      });
  }
}

/**
 * 缓存的 key-value
 * PLAY_RATE_STEP  倍速步进
 * CACHED_PLAY_RATE  用户设置的播放倍速
 * CLOSE_PLAY_RATE  禁用倍速播放功能
 * OVERRIDE_KEYBOARD  启用空格 ◀▶ 键控制
 * DISABLE_AUTO  禁用自动网页全屏
 * SKIP_INTERVAL  设置快进/退的时长
 * ZERO_KEY_SKIP_INTERVAL  设置零键的快进时长
 *
 * DISABLE_MEMORY_TIME  禁用记忆播放进度
 * ENABLE_THIS_SITE_AUTO  此站启用自动网页全屏
 * USE_ALTERNATIVE  不使用外部`网页全屏`脚本，使用自带网页全屏样式
 * REL_EPISODE_SELECTOR  切换下集—所有集数中的某一集 CSS选择器
 * CURR_EPISODE_SELECTOR  切换下集—当前集 CSS选择器
 * PLAY_TIME  播放进度
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
  CURR_EPISODE_SELECTOR: new TimedStorage("CURRENT_EPISODE_SELECTOR_", null),
  REL_EPISODE_SELECTOR: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", null),
  PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true, parseFloat),
};
