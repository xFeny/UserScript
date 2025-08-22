import Site from "./Site";

/**
 * 脚本`@match`的网站 网页全屏、弹幕、下一集css选择器配置
 */
const IconsSelector = {
  name: { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" },
  "live.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
  "tv.sohu.com": { webFull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
  "v.douyu.com": { webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
  "v.youku.com": { webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
  "www.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
  "www.mgtv.com": { webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
  "www.iqiyi.com": { webFull: "[class*=videofullBtn]", danmaku: "[class*=danmuBtnSet] div", next: "[class*=playNext]" },
  "www.bilibili.com": { full: ".bpx-player-ctrl-full", webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
  "v.qq.com": { full: ".txp_btn_fullscreen", webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
};

export default await (async () => {
  if (!Site.isMatched()) return IconsSelector;

  try {
    const url = "https://gitee.com/xfeny/UserScript/raw/dev/monkey-web-fullscreen/src/IconsSelector.json";
    const res = await GM.xmlHttpRequest({ url });
    const remoteSelector = JSON.parse(res.responseText ?? "{}");
    return { ...IconsSelector, ...remoteSelector };
  } catch (e) {
    console.error("加载远程配置失败", e);
    return IconsSelector;
  }
})();
