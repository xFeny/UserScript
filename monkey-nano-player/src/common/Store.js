import BasicStorage from "./lib/BasicStorage";

/**
 * 脚本存储键值配置
 */
export default {
  /** 启用页内小窗 */
  ENABLE_NANO: new BasicStorage("ENABLE_NANO_PLAYER_", false),
  /** 可视监测元素 */
  INTERSECT_ELEMENT: new BasicStorage("INTERSECT_ELEMENT_", ""),
  /** 页内小窗大小 */
  NANO_SIZE: new BasicStorage("ENABLE_NANO", "500,300", (v) => v.split(",")),
  /** 指定前缀忽略显示小窗 */
  IGNORE_URLS: new BasicStorage("IGNORE_URLS_", "", (v) => v.split(/[,;]/).map((s) => s.trim())),
};
