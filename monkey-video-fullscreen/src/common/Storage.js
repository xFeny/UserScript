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
  IGNORE_URLS: new StorageItem("IGNORE_URLS", ""),
};
