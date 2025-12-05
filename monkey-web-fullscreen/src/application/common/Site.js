import Consts from "./Consts";

// 将脚本中`@match`的规则转换成 JS 正则表达式
const { matches, includes: excluded } = GM_info.script;
const isValid = (s) => s !== "*://*/*" && !excluded.includes(s);
const siteRegExp = matches.filter(isValid).map((s) => new RegExp(s.replace(/\*/g, "\\S+")));

/**
 * 网站信息相关
 */
export default {
  isAcFun: () => /acfun.cn\/v/.test(location.href),
  isTencent: () => /v.qq.com\/x/.test(location.href),
  isQiyi: () => /iqiyi.com\/v_*/.test(location.href),
  isMgtv: () => /www.mgtv.com\/b/.test(location.href),
  isDouyu: () => /v.douyu.com\/show/.test(location.href),
  isBili: () => /bilibili.com\/video/.test(location.href),
  isBiliLive: () => location.host === "live.bilibili.com",
  isMatch: () => siteRegExp.some((match) => match.test(location.href.replace(location.search, Consts.EMPTY))),
};
