import constants from "./Constants";
const { EMPTY, QQ_VID_REG, BILI_VID_REG, IQIYI_VID_REG, ACFUN_VID_REG } = constants;

// 获取脚本@match匹配规则
const matches = GM_info.script.matches
  .filter((match) => match !== "*://*/*")
  .map((match) => new RegExp(match.replace(/\*/g, "\\S+")));

/**
 *网站相关
 */
export default {
  isDouyu: () => location.host === "v.douyu.com",
  isBili: () => BILI_VID_REG.test(location.href),
  isTencent: () => QQ_VID_REG.test(location.href),
  isIqiyi: () => IQIYI_VID_REG.test(location.href),
  isAcFun: () => ACFUN_VID_REG.test(location.href),
  isLivePage: () => location.href.includes("live"),
  isBiliLive: () => location.host === "live.bilibili.com",
  inMatches: () => matches.some((matche) => matche.test(location.href.replace(location.search, EMPTY))),
};
