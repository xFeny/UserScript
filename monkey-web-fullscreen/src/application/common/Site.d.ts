/**
 * 站点检测与图标选择器管理类
 */
declare const Site: {
  /**
   * 图标类型常量
   * @readonly
   */
  readonly icons: {
    full: "full";
    next: "next";
    webFull: "webFull";
    danmaku: "danmaku";
  };

  /**
   * 获取当前域名对应的图标选择器
   * @param domain 域名（默认：location.host）
   * @returns 对应站点的选择器配置 | undefined
   */
  getIcons(domain?: string): Record<string, string> | undefined;

  /**
   * 当前URL是否匹配GM脚本的@match规则
   * @returns 是否匹配
   */
  isMatch(): boolean;

  /** 是否为腾讯视频页 */
  isTencent(): boolean;

  /** 是否为AcFun视频页 */
  isAcFun(): boolean;

  /** 是否为爱奇艺视频页 */
  isQiyi(): boolean;

  /** 是否为芒果TV视频页 */
  isMgtv(): boolean;

  /** 是否为斗鱼视频页 */
  isDouyu(): boolean;

  /** 是否为B站视频页 */
  isBili(): boolean;

  /** 是否为B站直播页 */
  isBiliLive(): boolean;
};

export default Site;
