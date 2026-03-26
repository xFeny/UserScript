import BasicStorage from "./lib/BasicStorage";

/**
 * 脚本存储键值配置
 */
export default {
  /** 是否为深色主题 */
  IS_DARK_THEME: new BasicStorage("IS_DARK_THEME", true, Boolean),
  /** 是否为深色主题 */
  DRAG_POSITION: new BasicStorage("DRAG_POSITION_", { x: 0, y: 0 }),
};
