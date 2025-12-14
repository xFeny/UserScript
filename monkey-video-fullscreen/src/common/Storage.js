import { StorageItem, SuffixStorage } from "../lib/StorageUtils";

/**
 * 脚本存储键值配置
 */
export default unsafeWindow.FyStorage = {
  /** 网页全屏相关：自定义此站视频容器选择器 */
  CUSTOM_CONTAINER: new SuffixStorage("CUSTOM_CONTAINER", ""),
  /** 网页全屏相关：此站启/禁用自动网页全屏 */
  THIS_SITE_AUTO: new SuffixStorage("THIS_SITE_AUTO_", false, false, Boolean),
  /** 网页全屏相关：自动网页全屏忽略的网址 */
  IGNORE_URLS: new SuffixStorage("IGNORE_URLS_", ""),

  /** 倍速相关：倍速步进 */
  SPEED_STEP: new StorageItem("PLAY_RATE_STEP", 0.25, false, Number),
  /** 倍速相关：记忆的倍速 */
  CACHED_SPEED: new StorageItem("V_PLAYBACK_RATE", 1, true, Number),
};
