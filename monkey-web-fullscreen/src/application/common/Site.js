import Consts from "./Consts";

// 获取脚本@match匹配规则
const matches = GM_info.script.matches
  .filter((match) => match !== "*://*/*")
  .map((match) => new RegExp(match.replace(/\*/g, "\\S+")));

/**
 * 网站信息相关
 */
export default {
  isAcFun: () => /acfun.cn\/v/.test(location.href),
  isTencent: () => /v.qq.com\/x/.test(location.href),
  isQiyi: () => /iqiyi.com\/v_*/.test(location.href),
  isDouyu: () => /v.douyu.com\/show/.test(location.href),
  isBiliLive: () => location.host === "live.bilibili.com",
  isBili: () => /bilibili.com\/(video|list)/.test(location.href),
  isLivePage: () => !location.host.endsWith("live") && /\blive\b/.test(location.href),
  isMatch: () => matches.some((match) => match.test(location.href.replace(location.search, Consts.EMPTY))),
};
