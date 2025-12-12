import Consts from "./Consts";
import Storage from "./Storage";

export default class SiteIcons {
  static name = { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" };

  static selectors = {
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

  static {
    const selectors = Storage.ICONS_SELECTOR.get();
    selectors ? (this.selectors = selectors) : this.loadRemote();
  }

  static loadRemote() {
    const url = "https://gitee.com/xfeny/UserScript/raw/dev/monkey-web-fullscreen/src/IconsSelector.json";
    GM.xmlHttpRequest({ url, timeout: 3000 })
      .then((res) => {
        const remoteSelector = JSON.parse(res.responseText ?? "{}");
        this.selectors = { ...this.selectors, ...remoteSelector };
        Storage.ICONS_SELECTOR.set(Consts.EMPTY, this.selectors, 1 / 3); // 缓存8小时
      })
      .catch((e) => console.error("加载远程配置失败", e));
  }

  static getIcons(domain) {
    if (Storage.ICONS_SELECTOR.get()) this.loadRemote();
    return this.selectors[domain];
  }
}
