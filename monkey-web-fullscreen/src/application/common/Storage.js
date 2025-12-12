import { StorageItem, TimedStorage } from "./lib/StorageUtils";

/**
 * 脚本存储键值配置
 */
export default unsafeWindow.FyStorage = {
  /** 缓存远端`@match`网址的相关图标选择器 */
  ICONS_SELECTOR: new TimedStorage("ICONS_SELECTOR", ""),

  /** 网页全屏相关：自定义此站网页全屏规则 */
  CUSTOM_WEB_FULL: new TimedStorage("CUSTOM_WEB_FULL_", ""),
  /** 网页全屏相关：禁用`@match`网址自动网页全屏 */
  IS_AUTO_DEF: new StorageItem("DISABLE_DEFAULT_AUTO", false, false, Boolean),
  /** 网页全屏相关：此站启/禁用自动网页全屏 */
  IS_SITE_AUTO: new TimedStorage("ENABLE_THIS_SITE_AUTO_", false, false, Boolean),

  /** 倍速相关：倍速步进 */
  SPEED_STEP: new StorageItem("PLAY_RATE_STEP", 0.25, false, parseFloat),
  /** 倍速相关：禁用倍速调节 */
  DISABLE_SPEED: new StorageItem("CLOSE_PLAY_RATE", false, false, Boolean),
  /** 倍速相关：常显倍速 */
  RATE_KEEP_SHOW: new StorageItem("RATE_KEEP_SHOW", false, false, Boolean),
  /** 倍速相关：禁用记忆倍速 */
  NOT_CACHE_SPEED: new StorageItem("DISABLE_MEMORY_SPEED", false, false, Boolean),
  /** 倍速相关：记忆的倍速 */
  CACHED_SPEED: new StorageItem("FENY_SCRIPTS_V_PLAYBACK_RATE", 1, true, parseFloat),
  /** 倍速相关：预设的倍速数组 */
  PRESET_SPEED: new StorageItem("PRESET_SPEED", "1.15,1.45,1.75", false, (value) => value.split(",")),

  /** 快进秒数相关：快进/退秒数 */
  SKIP_INTERVAL: new StorageItem("VIDEO_SKIP_INTERVAL", 5, false, Number),
  /** 快进秒数相关：零键快进秒数 */
  ZERO_KEY_SKIP_INTERVAL: new StorageItem("ZERO_KEY_SKIP_INTERVAL", 30, false, Number),
  /** 快进秒数相关：启用 空格 ◀▶ 键控制 */
  OVERRIDE_KEY: new StorageItem("OVERRIDE_KEYBOARD", false, false, Boolean),

  /** 缩放和移动相关：禁用缩放和移动 */
  DISABLE_ZOOM_MOVE: new StorageItem("DISABLE_ZOOM_MOVE", true, false, Boolean),
  /** 缩放和移动相关：移动距离 */
  MOVING_DISTANCE: new StorageItem("MOVING_DISTANCE", 10, false, Number),
  /** 缩放和移动相关：缩放百分比 */
  ZOOM_PERCENT: new StorageItem("ZOOM_PERCENT", 10, false, Number),

  /** 下集切换相关：启用自动切换至下集 */
  IS_AUTO_NEXT: new StorageItem("ENABLE_AUTO_NEXT_EPISODE", false, false, Boolean),
  /** 下集切换相关：自动下集提前秒数 */
  NEXT_ADVANCE_SEC: new StorageItem("AUTO_NEXT_ADVANCE_SECONDS", 75, false, Number),
  /** 下集切换相关：自定义下集切换—当前播放集数 拾取的CSS选择器 */
  RELATIVE_EPISODE: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", ""),
  /** 下集切换相关：自定义下集切换—集数列表中的任意一集 拾取的CSS选择器 */
  CURRENT_EPISODE: new TimedStorage("CURRENT_EPISODE_SELECTOR_", ""),

  /** 时间显示相关：小字号显示时间 */
  USE_SMALL_FONT: new StorageItem("USE_SMALLER_FONT", false, false, Boolean),
  /** 时间显示相关：禁用全屏时间显示 */
  DISABLE_CLOCK: new StorageItem("DISABLE_CLOCK", false, false, Boolean),
  /** 时间显示相关：非全屏模式下显示时间 */
  PAGE_CLOCK: new StorageItem("UNFULL_CLOCK", false, false, Boolean),
  /** 时间显示相关：时间颜色 */
  CLOCK_COLOR: new StorageItem("CLOCK_COLOR", "#e0e0e0"),

  /** 播放进度相关：禁用播放进度记录 */
  NOT_CACHE_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, Boolean),
  /** 播放进度相关：播放进度保存天数 */
  STORAGE_DAYS: new StorageItem("STORAGE_DAYS", 7, false, parseFloat),
  /** 播放进度相关：记录的视频播放进度 */
  PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true),

  /** 忽略网址相关：自动切换下集时忽略的网址列表 */
  NEXT_IGNORE_URLS: new StorageItem("NEXT_IGNORE_URLS", ""),
  /** 忽略网址相关：自动网页全屏时忽略的网址列表 */
  FULL_IGNORE_URLS: new StorageItem("FULL_IGNORE_URLS", ""),

  /** 其他：禁用标签页隐藏暂停 */
  IS_INVISIBLE_PAUSE: new StorageItem("DISABLE_INVISIBLE_PAUSE", false, false, Boolean),
  /** 其他：禁用音量默认百分百 */
  IS_MAX_VOLUME: new StorageItem("DISABLE_DEF_MAX_VOLUME", false, false, Boolean),
  /** 其他：禁用视频截图 */
  DISABLE_SCREENSHOT: new StorageItem("DISABLE_SCREENSHOT", true, false, Boolean),
};
