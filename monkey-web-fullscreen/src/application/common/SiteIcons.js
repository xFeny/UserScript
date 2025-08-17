/**
 * 脚本`@match`的网站 网页全屏、弹幕、下一集css选择器配置
 */
export default {
  "live.acfun.cn": { full: ".fullscreen-screen", webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
  "www.bilibili.com": { full: ".bpx-player-ctrl-full", webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
  "v.youku.com": { full: "#fullscreen-icon", webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
  "v.douyu.com": { full: ".ControllerBar-WindowFull-Icon", webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
  "www.acfun.cn": { full: ".fullscreen-screen", webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
  "www.mgtv.com": { full: ".fullscreenBtn i", webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
  "www.iqiyi.com": { full: "[class*=fullScreenBtn]", webFull: "[class*=videofullBtn]", danmaku: "[class*=danmuBtnSet] div", next: "[class*=buttons_playNext]" },
  "v.qq.com": { full: ".txp_btn_fullscreen", webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
  "tv.sohu.com": { full: ".x-fullscreen-btn", webFull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
  name: { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" },
};
