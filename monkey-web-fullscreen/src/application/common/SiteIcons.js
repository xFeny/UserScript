/**
 * 脚本`@match`的网站 网页全屏、弹幕、下一集css选择器配置
 */
export default {
  "live.bilibili.com": { webFull: "#businessContainerElement" },
  "live.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
  "www.bilibili.com": { webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
  "v.douyu.com": { webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
  "www.iqiyi.com": { webFull: "[class*=videofullBtn]", danmaku: "[class*=danmuBtnSet] div", next: "[class*=buttons_playNext]" },
  "v.youku.com": { webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
  "www.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
  "www.mgtv.com": { webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
  "v.qq.com": { webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
  "tv.sohu.com": { webFull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
  name: { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" },
};
