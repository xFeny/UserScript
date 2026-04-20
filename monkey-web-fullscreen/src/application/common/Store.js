import BasicStorage from "./lib/BasicStorage";

/**
 * 脚本存储键值配置
 */
export default unsafeWindow.FyStorage = {
  /** 脚本菜单 */
  SITE_AUTO: new BasicStorage("SITE_AUTO_", false, false, Boolean, true), // 此站 启/禁用自动网页全屏
  DETACH_THRESHOLD: new BasicStorage("DETACH_THRESHOLD_", 20, false, Number, true), // 此站脱离式全屏阈值

  /** 更多设置-控制 */
  NO_AUTO_DEF: new BasicStorage("NO_AUTO_DEF", false, false, Boolean), // 禁用 默认自动
  DISABLE_RATE: new BasicStorage("DISABLE_RATE", false, false, Boolean), // 禁用 倍速调节
  FORGET_RATE: new BasicStorage("FORGET_RATE", false, false, Boolean), // 禁用 记忆倍速
  INVIS_PAUSE: new BasicStorage("DISABLE_INVISIBLE_PAUSE", false, false, Boolean), // 禁用 不可见暂停
  NEXT_AUTO: new BasicStorage("NEXT_AUTO", false, false, Boolean), // 启用 自动切换下集
  CLOCK_WEB: new BasicStorage("CLOCK_WEB", false, false, Boolean), // 启用 非全屏显时间
  RATE_SHOW: new BasicStorage("RATE_KEEP_SHOW", false, false, Boolean), // 启用 左上角常显倍速
  OVERRIDE_KEY: new BasicStorage("OVERRIDE_KEYBOARD", false, false, Boolean), // 启用 空格 ◀▶ 键控制

  /** 更多设置-参数 */
  RATE_STEP: new BasicStorage("RATE_STEP", 0.25, false, parseFloat), // 倍速步进
  SKIP_INTERVAL: new BasicStorage("SKIP_INTERVAL", 5, false, Number), // 快进/退秒数
  ZERO_KEY_SKIP: new BasicStorage("ZERO_KEY_SKIP_INTERVAL", 30, false, Number), // 零键快进秒数
  NEXT_ADVANCE: new BasicStorage("NEXT_ADVANCE", 75, false, Number), // 自动下集提前秒数
  ZOOM_PERCENT: new BasicStorage("ZOOM_PERCENT", 10, false, Number), // 缩放百分比
  MOVE_DIST: new BasicStorage("MOVE_DIST", 10, false, Number), // 移动距离
  CLOCK_COLOR: new BasicStorage("CLOCK_COLOR", "#e0e0e0"), // 时间颜色
  PRESET_RATE: new BasicStorage("PRESET_SPEED", "1.15,1.45,1.75", false, (value) => value.split(",")), // 预设的常用倍速

  /** 更多设置-忽略 */
  NEXT_IGNORE_URLS: new BasicStorage("NEXT_IGNORE_URLS", ""), // 下集
  FULL_IGNORE_URLS: new BasicStorage("FULL_IGNORE_URLS", ""), // 网页全屏

  /** 更多设置-全屏 */
  V_WRAPPER: new BasicStorage("V_WRAPPER_", "", false, String, true), // 视频容器
  FS_CODE: new BasicStorage("FULL_CHANGE_CODE_", "", false, String, true), // 全屏切换执行代码

  /** 更多设置-下集 */
  NEXT_CUR_EP: new BasicStorage("CURRENT_EPISODE_SELECTOR_", "", false, String, true), // 当前集选择器
  NEXT_REL_EP: new BasicStorage("RELATIVE_EPISODE_SELECTOR_", "", false, String, true), // 全部集选择器

  /** 更多设置-高级 */
  LOAD_CODE: new BasicStorage("LOAD_EVT_CODE_", "", false, String, true), // load 事件执行代码
  VIDEO_CODE: new BasicStorage("VIDEO_EVT_CODE_", "", false, String, true), // video 事件执行代码

  /** 其他缓存键名 */
  ICONS_SELECTOR: new BasicStorage("ICONS_SELECTOR", null), // 缓存远端默认`@match`图标选择器
  CACHED_RATE: new BasicStorage("FENY_SCRIPTS_V_PLAYBACK_RATE", 1, true, parseFloat), // 记忆的倍速
  STORAGE_DAYS: new BasicStorage("STORAGE_DAYS", 8, false, parseFloat), // 播放进度保存天数
  V_TIME: new BasicStorage("PLAY_TIME_", 0, true, Number, true), // 视频播放进度
};
