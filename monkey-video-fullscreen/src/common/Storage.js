import BasicStorage from "../lib/BasicStorage";

/**
 * 脚本存储键值配置
 */
export default {
  /** 网页全屏相关：脱离原结构网页全屏的阈值 */
  DETACH_THRESHOLD: new BasicStorage("DETACH_THRESHOLD_", 20, false, Number, true),
  /** 网页全屏相关：自定义此站视频容器 */
  CUSTOM_CONTAINER: new BasicStorage("CUSTOM_CONTAINER_", "", false, undefined, true),
  /** 网页全屏相关：此站启/禁用自动网页全屏 */
  THIS_SITE_AUTO: new BasicStorage("THIS_SITE_AUTO_", false, false, Boolean, true),
  /** 网页全屏相关：自动网页全屏忽略的网址 */
  IGNORE_URLS: new BasicStorage("IGNORE_URLS", ""),
};
