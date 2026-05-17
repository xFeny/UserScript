import Tools from "./Tools";
import Consts from "./Consts";
import Store from "./Store";

export default class Site {
  static icons = { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" };
  static selectors = {
    "live.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
    "v.douyu.com": { webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
    "v.youku.com": { webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
    "www.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
    "www.mgtv.com": { webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
    "www.iqiyi.com": { webFull: "[class*=videofullBtn]", danmaku: "[class*=danmuBtnSet] div", next: "[class*=playNext]" },
    "www.bilibili.com": { full: ".bpx-player-ctrl-full", webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
    "v.qq.com": { full: ".txp_btn_fullscreen", webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
  };

  static _siteRegExps = {
    acFun: /acfun.cn\/v/,
    qiyi: /iqiyi.com\/v_*/,
    bili: /bilibili.com\/video/,
    biliLive: /live.bilibili.com\/.*/,
  };

  static {
    const selectors = Store.ICONS_SELECTOR.get();
    selectors ? (this.selectors = selectors) : this.#loadRemote();
    Tools.microTask(() => (this.#createSiteTests(), this.#convertGmMatch()));
  }

  static #loadRemote() {
    const url = "https://gitee.com/xfeny/UserScript/raw/dev/monkey-web-fullscreen/src/IconsSelector.json";
    GM.xmlHttpRequest({ url, timeout: 3000 })
      .then((res) => {
        const remoteConf = JSON.parse(res.responseText ?? "{}");
        this.selectors = { ...this.selectors, ...remoteConf };
        Store.ICONS_SELECTOR.set(this.selectors, Consts.EMPTY, 1 / 3); // 缓存8小时
      })
      .catch((e) => console.warn("加载远程配置失败", e));
  }

  /**
   * 将 GM 脚本的 @match 规则转换为 JS 正则表达式数组
   */
  static #convertGmMatch() {
    const matches = GM_info.scriptMetaStr.match(/(?<=\/\/\s*@match\s)(?!.*:\/\/\*\/\*).+/gm);
    this.gmMatches = matches.map((m) => new RegExp(m.trim().replace(/\*/g, ".*")));
  }

  /**
   * 动态生成站点检测方法（统一为 isXXX 格式）
   * 如：isMgtv()、isDouyu()、isBili()、isBiliLive() 等
   */
  static #createSiteTests() {
    Object.entries(this._siteRegExps).forEach(([name, regex]) => {
      const method = `is${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      this[method] ??= () => regex.test(this.getCleanUrl());
    });
  }

  static getIcons(domain = location.host) {
    if (!Store.ICONS_SELECTOR.get()) this.#loadRemote();
    return this.selectors[domain];
  }

  static isGmMatch() {
    return this.gmMatches.some((m) => m.test(this.getCleanUrl()));
  }

  static getCleanUrl = () => location.origin + location.pathname;
}
