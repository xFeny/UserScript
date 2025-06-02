/**
 * 脚本`@match`网站全屏、网页全屏、弹幕、下一集css选择器配置
 */
export default {
  "live.bilibili.com": { webfull: "#businessContainerElement" },
  "www.bilibili.com": { webfull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
  "live.acfun.cn": { full: ".fullscreen-screen", webfull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
  "tv.sohu.com": { full: ".x-fullscreen-btn", webfull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
  "haokan.baidu.com": { full: ".art-icon-fullscreen", webfull: ".art-control-fullscreenWeb", next: ".art-control-next" },
  "v.qq.com": { full: ".txp_btn_fullscreen", webfull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
  "v.pptv.com": { full: ".w-zoom-container > div", webfull: ".w-expand-container > div", danmaku: ".w-barrage", next: ".w-next" },
  "v.youku.com": { full: "#fullscreen-icon", webfull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
  "www.iqiyi.com": { full: ".iqp-btn-fullscreen", webfull: ".iqp-btn-webscreen", danmaku: "#barrage_switch", next: ".iqp-btn-next" },
  "v.douyu.com": { full: ".ControllerBar-WindowFull-Icon", webfull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
  "www.acfun.cn": { full: ".fullscreen-screen", webfull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
  "www.mgtv.com": { full: ".fullscreenBtn i", webfull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
};
