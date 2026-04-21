import BasicStorage from "./lib/BasicStorage";

/**
 * 脚本存储键值配置
 */
export default {
  /** 是否为深色主题 */
  DARK_THEME: new BasicStorage("DARK_THEME", true, Boolean),
  /** 记录拖动的位置信息 */
  DRAG_POSITION: new BasicStorage("DRAG_POSITION_", { x: 0, y: 0 }),
  /** 不支持文档画中画 */
  NOT_SUPPORTED: new BasicStorage("NOT_SUPPORTED", false),
};
