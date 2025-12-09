/**
 * 基础存储项类，提供通用的存储操作
 */
class StorageItem {
  constructor(name, defVal, useLocalStore = false, parser = null) {
    this.name = name;
    this.defVal = defVal;
    this.parser = parser;
    this.useLocalStore = useLocalStore;
    this.storage = useLocalStore ? localStorage : { getItem: GM_getValue, setItem: GM_setValue, removeItem: GM_deleteValue };
  }

  set(value) {
    this.storage.setItem(this.name, value);
  }

  get() {
    return this.getValue(this.name);
  }

  getValue(key) {
    const value = this.storage.getItem(key);
    const pv = (() => {
      try {
        return JSON.parse(value) ?? this.defVal;
      } catch {
        return value ?? this.defVal;
      }
    })();
    return this.parser?.(pv) ?? pv;
  }

  del() {
    this.storage.removeItem(this.name);
  }

  fuzzyGet(pattern) {
    const result = {};
    this.fuzzyMatch(pattern, (key) => (result[key] = this.storage.getItem(key)));
    return result;
  }

  fuzzyDel(pattern) {
    this.fuzzyMatch(pattern, (key) => this.storage.removeItem(key));
  }

  fuzzyMatch(pattern, callback) {
    const keys = this.useLocalStore ? Object.keys(localStorage) : GM_listValues();
    keys.filter((key) => (pattern instanceof RegExp ? pattern.test(key) : key.includes(pattern))).forEach(callback);
  }
}

/**
 * 带过期时间的存储项类，用于需要动态键的存储操作
 */
class TimedStorage extends StorageItem {
  constructor(name, defVal, useLocalStore, parser) {
    super(name, defVal, useLocalStore, parser);
    requestIdleCallback(() => this.cleanupExpiredData());
  }

  set(suffix, value, expires) {
    if ([null, undefined].includes(suffix)) throw new Error("TimedStorage 设置值时 suffix 不能为空");

    const key = this.name + suffix;
    if (expires) expires = Date.now() + expires * 864e5; // 转换为毫秒 单位: 天
    expires ? this.storage.setItem(key, JSON.stringify({ value, expires })) : this.storage.setItem(key, value);
  }

  get(suffix = "") {
    const data = this.getValue(this.name + suffix);
    return !data?.value ? data : data.expires > Date.now() ? data.value : this.defVal;
  }

  del(suffix = "") {
    this.storage.removeItem(this.name + suffix);
  }

  cleanupExpiredData() {
    this.fuzzyMatch(this.name, (key) => {
      const data = this.getValue(key);
      if (data?.expires && data.expires < Date.now()) this.storage.removeItem(key);
    });
  }
}

/**
 * 缓存的 key-value
 *
 * ICONS_SELECTOR 缓存远端`@match`网址的相关图标选择器
 *
 * 网页全屏相关
 * CUSTOM_WEB_FULL: 自定义此站网页全屏规则
 * DISABLE_AUTO: 禁用`@match`网址自动网页全屏
 * ENABLE_THIS_SITE_AUTO: 此站启/禁用自动网页全屏
 *
 * 倍速相关
 * RATE_KEEP_SHOW: 常显倍速
 * PLAY_RATE_STEP: 倍速步进
 * CLOSE_PLAY_RATE: 禁用倍速调节
 * DISABLE_MEMORY_SPEED: 禁用记忆倍速
 * CACHED_PLAY_RATE: 记忆的倍速
 * PRESET_SPEED: 预设的倍速数组
 *
 * 快进秒数相关
 * SKIP_INTERVAL: 快进/退秒数
 * ZERO_KEY_SKIP_INTERVAL: 零键快进秒数
 * OVERRIDE_KEYBOARD: 启用 空格 ◀▶ 键控制
 *
 * 缩放和移动相关
 * DISABLE_ZOOM_MOVE: 禁用缩放和移动
 * MOVING_DISTANCE: 移动距离
 * ZOOM_PERCENT: 缩放百分比
 *
 * 下集切换相关
 * ENABLE_AUTO_NEXT_EPISODE: 启用自动切换至下集
 * AUTO_NEXT_ADVANCE_SEC: 自动下集提前秒数
 * CURR_EPISODE_SELECTOR: 自定义下集切换—当前播放集数 拾取的CSS选择器
 * REL_EPISODE_SELECTOR: 自定义下集切换—集数列表中的任意一集 拾取的CSS选择器
 *
 * 时间显示相关
 * USE_SMALLER_FONT: 小字号显示时间
 * DISABLE_CLOCK: 禁用全屏时间显示
 * UNFULL_CLOCK: 非全屏模式下显示时间
 * CLOCK_COLOR: 时间颜色
 *
 * 播放进度相关
 * DISABLE_MEMORY_TIME: 禁用播放进度记录
 * STORAGE_DAYS: 播放进度保存天数
 * PLAY_TIME: 记录的视频播放进度
 *
 * 忽略网址相关
 * NEXT_IGNORE_URLS: 自动切换下集时忽略的网址列表
 * FULL_IGNORE_URLS: 自动网页全屏时忽略的网址列表
 *
 * 其他
 * DISABLE_INVISIBLE_PAUSE: 禁用标签页隐藏暂停
 * DISABLE_DEF_MAX_VOLUME: 禁用音量默认百分百
 * DISABLE_SCREENSHOT: 禁用视频截图
 * PARENT_DEPTH: 此站网页全屏层级数
 */
export default {
  ICONS_SELECTOR: new TimedStorage("ICONS_SELECTOR", ""),

  CUSTOM_WEB_FULL: new TimedStorage("CUSTOM_WEB_FULL_", ""),
  DISABLE_AUTO: new StorageItem("CLOSE_AUTO_WEB_FULL_SCREEN", false, false, Boolean),
  ENABLE_THIS_SITE_AUTO: new TimedStorage("ENABLE_THIS_SITE_AUTO_", false, false, Boolean),

  RATE_KEEP_SHOW: new StorageItem("RATE_KEEP_SHOW", false, false, Boolean),
  PLAY_RATE_STEP: new StorageItem("PLAY_RATE_STEP", 0.25, false, parseFloat),
  CLOSE_PLAY_RATE: new StorageItem("CLOSE_PLAY_RATE", false, false, Boolean),
  DISABLE_MEMORY_SPEED: new StorageItem("DISABLE_MEMORY_SPEED", false, false, Boolean),
  CACHED_PLAY_RATE: new StorageItem("FENY_SCRIPTS_V_PLAYBACK_RATE", 1, true, parseFloat),
  PRESET_SPEED: new StorageItem("PRESET_SPEED", "1.15,1.45,1.75", false, (value) => value.split(",")),

  SKIP_INTERVAL: new StorageItem("VIDEO_SKIP_INTERVAL", 5, false, Number),
  ZERO_KEY_SKIP_INTERVAL: new StorageItem("ZERO_KEY_SKIP_INTERVAL", 30, false, Number),
  OVERRIDE_KEYBOARD: new StorageItem("OVERRIDE_KEYBOARD", false, false, Boolean),

  DISABLE_ZOOM_MOVE: new StorageItem("DISABLE_ZOOM_MOVE", true, false, Boolean),
  MOVING_DISTANCE: new StorageItem("MOVING_DISTANCE", 10, false, Number),
  ZOOM_PERCENT: new StorageItem("ZOOM_PERCENT", 10, false, Number),

  ENABLE_AUTO_NEXT_EPISODE: new StorageItem("ENABLE_AUTO_NEXT_EPISODE", false, false, Boolean),
  AUTO_NEXT_ADVANCE_SEC: new StorageItem("AUTO_NEXT_ADVANCE_SECONDS", 75, false, Number),
  CURR_EPISODE_SELECTOR: new TimedStorage("CURRENT_EPISODE_SELECTOR_", ""),
  REL_EPISODE_SELECTOR: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", ""),

  USE_SMALLER_FONT: new StorageItem("USE_SMALLER_FONT", false, false, Boolean),
  DISABLE_CLOCK: new StorageItem("DISABLE_CLOCK", false, false, Boolean),
  UNFULL_CLOCK: new StorageItem("UNFULL_CLOCK", false, false, Boolean),
  CLOCK_COLOR: new StorageItem("CLOCK_COLOR", "#e0e0e0"),

  DISABLE_MEMORY_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, Boolean),
  STORAGE_DAYS: new StorageItem("STORAGE_DAYS", 7, false, parseFloat),
  PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true),

  NEXT_IGNORE_URLS: new StorageItem("NEXT_IGNORE_URLS", ""),
  FULL_IGNORE_URLS: new StorageItem("FULL_IGNORE_URLS", ""),

  DISABLE_INVISIBLE_PAUSE: new StorageItem("DISABLE_INVISIBLE_PAUSE", false, false, Boolean),
  DISABLE_DEF_MAX_VOLUME: new StorageItem("DISABLE_DEF_MAX_VOLUME", false, false, Boolean),
  DISABLE_SCREENSHOT: new StorageItem("DISABLE_ZOOM", true, false, Boolean),
};
