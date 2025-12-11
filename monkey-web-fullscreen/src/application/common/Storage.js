/**
 * 基础存储项类，提供通用的存储操作
 */
class StorageItem {
  constructor(name, defVal, useLocalStore = false, parser = (v) => v) {
    this.name = name;
    this.defVal = defVal;
    this.parser = parser;
    this.storage = useLocalStore ? localStorage : { getItem: GM_getValue, setItem: GM_setValue, removeItem: GM_deleteValue };
  }

  set(value, key = this.name) {
    this.storage.setItem(key, value);
  }

  get(key = this.name) {
    const value = this.storage.getItem(key);
    try {
      return this.parser(JSON.parse(value) ?? this.defVal);
    } catch {
      return this.parser(value ?? this.defVal);
    }
  }

  del(key = this.name) {
    this.storage.removeItem(key);
  }

  fuzzyGet(pattern) {
    const result = {};
    this.fuzzyHandle(pattern, (key) => (result[key] = this.storage.getItem(key)));
    return result;
  }

  fuzzyDel(pattern) {
    this.fuzzyHandle(pattern, (key) => this.storage.removeItem(key));
  }

  fuzzyHandle(pattern, callback) {
    const keys = Object.is(this.storage, localStorage) ? Object.keys(localStorage) : GM_listValues();
    const keyMatcher = pattern instanceof RegExp ? (key) => pattern.test(key) : (key) => key.includes(pattern);
    keys.filter(keyMatcher).forEach(callback);
  }
}

/**
 * 带过期时间的存储类（继承自基础存储类）
 * 1. 支持为存储值设置过期时间（按天计算）
 * 2. 全局唯一的过期数据清理逻辑（仅首次创建实例时触发）
 */
class TimedStorage extends StorageItem {
  static instances = [];

  constructor(name, defVal, useLocalStore, parser) {
    super(name, defVal, useLocalStore, parser);

    TimedStorage.instances.push(this);
    if (TimedStorage.instances.length === 1) requestIdleCallback(() => TimedStorage.cleanExpired());
  }

  set(suffix, value, expires) {
    if (suffix == null) throw new Error("suffix 不能为空");
    const val = expires ? JSON.stringify({ value, expires: Date.now() + expires * 864e5 }) : value;
    super.set(val, this.name + suffix);
  }

  get(suffix = "") {
    const data = super.get(this.name + suffix);
    return !data?.value ? data : data.expires > Date.now() ? data.value : this.defVal;
  }

  del(suffix = "") {
    super.del(this.name + suffix);
  }

  static cleanExpired() {
    // 清理每个实例对应的过期数据
    this.instances.forEach((instance) => {
      instance.fuzzyHandle(instance.name, (key) => {
        // 调用父类get方法获取原始数据
        const data = StorageItem.prototype.get.call(instance, key);
        if (data?.expires && data.expires < Date.now()) {
          StorageItem.prototype.del.call(instance, key);
        }
      });
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
 * IS_AUTO_DEF: 禁用`@match`网址自动网页全屏
 * IS_SITE_AUTO: 此站启/禁用自动网页全屏
 *
 * 倍速相关
 * SPEED_STEP: 倍速步进
 * DISABLE_SPEED: 禁用倍速调节
 * RATE_KEEP_SHOW: 常显倍速
 * NOT_CACHE_SPEED: 禁用记忆倍速
 * CACHED_SPEED: 记忆的倍速
 * PRESET_SPEED: 预设的倍速数组
 *
 * 快进秒数相关
 * SKIP_INTERVAL: 快进/退秒数
 * ZERO_KEY_SKIP_INTERVAL: 零键快进秒数
 * OVERRIDE_KEY: 启用 空格 ◀▶ 键控制
 *
 * 缩放和移动相关
 * DISABLE_ZOOM_MOVE: 禁用缩放和移动
 * MOVING_DISTANCE: 移动距离
 * ZOOM_PERCENT: 缩放百分比
 *
 * 下集切换相关
 * IS_AUTO_NEXT: 启用自动切换至下集
 * NEXT_ADVANCE_SEC: 自动下集提前秒数
 * CURRENT_EPISODE: 自定义下集切换—当前播放集数 拾取的CSS选择器
 * RELATIVE_EPISODE: 自定义下集切换—集数列表中的任意一集 拾取的CSS选择器
 *
 * 时间显示相关
 * USE_SMALL_FONT: 小字号显示时间
 * DISABLE_CLOCK: 禁用全屏时间显示
 * UNFULL_CLOCK: 非全屏模式下显示时间
 * CLOCK_COLOR: 时间颜色
 *
 * 播放进度相关
 * NOT_CACHE_TIME: 禁用播放进度记录
 * STORAGE_DAYS: 播放进度保存天数
 * PLAY_TIME: 记录的视频播放进度
 *
 * 忽略网址相关
 * NEXT_IGNORE_URLS: 自动切换下集时忽略的网址列表
 * FULL_IGNORE_URLS: 自动网页全屏时忽略的网址列表
 *
 * 其他
 * IS_INVISIBLE_PAUSE: 禁用标签页隐藏暂停
 * IS_MAX_VOLUME: 禁用音量默认百分百
 * DISABLE_SCREENSHOT: 禁用视频截图
 */
export default {
  ICONS_SELECTOR: new TimedStorage("ICONS_SELECTOR", ""),

  CUSTOM_WEB_FULL: new TimedStorage("CUSTOM_WEB_FULL_", ""),
  IS_AUTO_DEF: new StorageItem("DISABLE_DEFAULT_AUTO", false, false, Boolean),
  IS_SITE_AUTO: new TimedStorage("ENABLE_THIS_SITE_AUTO_", false, false, Boolean),

  SPEED_STEP: new StorageItem("PLAY_RATE_STEP", 0.25, false, parseFloat),
  DISABLE_SPEED: new StorageItem("CLOSE_PLAY_RATE", false, false, Boolean),
  RATE_KEEP_SHOW: new StorageItem("RATE_KEEP_SHOW", false, false, Boolean),
  NOT_CACHE_SPEED: new StorageItem("DISABLE_MEMORY_SPEED", false, false, Boolean),
  CACHED_SPEED: new StorageItem("FENY_SCRIPTS_V_PLAYBACK_RATE", 1, true, parseFloat),
  PRESET_SPEED: new StorageItem("PRESET_SPEED", "1.15,1.45,1.75", false, (value) => value.split(",")),

  SKIP_INTERVAL: new StorageItem("VIDEO_SKIP_INTERVAL", 5, false, Number),
  ZERO_KEY_SKIP_INTERVAL: new StorageItem("ZERO_KEY_SKIP_INTERVAL", 30, false, Number),
  OVERRIDE_KEY: new StorageItem("OVERRIDE_KEYBOARD", false, false, Boolean),

  DISABLE_ZOOM_MOVE: new StorageItem("DISABLE_ZOOM_MOVE", true, false, Boolean),
  MOVING_DISTANCE: new StorageItem("MOVING_DISTANCE", 10, false, Number),
  ZOOM_PERCENT: new StorageItem("ZOOM_PERCENT", 10, false, Number),

  IS_AUTO_NEXT: new StorageItem("ENABLE_AUTO_NEXT_EPISODE", false, false, Boolean),
  NEXT_ADVANCE_SEC: new StorageItem("AUTO_NEXT_ADVANCE_SECONDS", 75, false, Number),
  RELATIVE_EPISODE: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", ""),
  CURRENT_EPISODE: new TimedStorage("CURRENT_EPISODE_SELECTOR_", ""),

  USE_SMALL_FONT: new StorageItem("USE_SMALLER_FONT", false, false, Boolean),
  DISABLE_CLOCK: new StorageItem("DISABLE_CLOCK", false, false, Boolean),
  PAGE_CLOCK: new StorageItem("UNFULL_CLOCK", false, false, Boolean),
  CLOCK_COLOR: new StorageItem("CLOCK_COLOR", "#e0e0e0"),

  NOT_CACHE_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, Boolean),
  STORAGE_DAYS: new StorageItem("STORAGE_DAYS", 7, false, parseFloat),
  PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true),

  NEXT_IGNORE_URLS: new StorageItem("NEXT_IGNORE_URLS", ""),
  FULL_IGNORE_URLS: new StorageItem("FULL_IGNORE_URLS", ""),

  IS_INVISIBLE_PAUSE: new StorageItem("DISABLE_INVISIBLE_PAUSE", false, false, Boolean),
  IS_MAX_VOLUME: new StorageItem("DISABLE_DEF_MAX_VOLUME", false, false, Boolean),
  DISABLE_SCREENSHOT: new StorageItem("DISABLE_SCREENSHOT", true, false, Boolean),
};
