import BasicStorage from "../lib/BasicStorage";

/**
 * 脚本存储键值配置
 */
export default {
  /** 此站启/禁用自动网页全屏 */
  IS_AUTO: new BasicStorage("IS_AUTO_", false, Boolean),
  /** 脱离原结构网页全屏的阈值 */
  DETACH_THRESHOLD: new BasicStorage("DETACH_THRESHOLD_", 20, Number),
  /** 自定义此站视频容器 */
  CUSTOM_CTN: new BasicStorage("CUSTOM_CTN_", ""),
  /** 自动网页全屏忽略的网址 */
  IGNORE_URLS: new BasicStorage("IGNORE_URLS_", ""),
  /** 全屏时要隐藏的元素 */
  HIDE_ELEMENTS: new BasicStorage("HIDE_ELEMENTS_", ""),
};
