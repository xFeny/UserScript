import Tools from "./Tools";
import Consts from "./Consts";
import Storage from "./Storage";

export default class Site {
  static icons = { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" };
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

  static _siteRegex = {
    acFun: /acfun.cn\/v/,
    tencent: /v.qq.com\/x/,
    qiyi: /iqiyi.com\/v_*/,
    mgtv: /www.mgtv.com\/b/,
    douyu: /v.douyu.com\/show/,
    bili: /bilibili.com\/video/,
    biliLive: /live.bilibili.com\/*/,
  };

  static {
    const selectors = Storage.ICONS_SELECTOR.get();
    selectors ? (this.selectors = selectors) : this._loadRemote();
    Tools.microTask(() => (this._createSiteTests(), this._convertGmMatchToRegex()));
  }

  static getIcons(domain = location.host) {
    if (!Storage.ICONS_SELECTOR.get()) this._loadRemote();
    return this.selectors[domain];
  }

  static isMatch() {
    return this.siteRegex.some((m) => m.test(location.href.replace(location.search, Consts.EMPTY)));
  }

  static _loadRemote() {
    const url = "https://gitee.com/xfeny/UserScript/raw/dev/monkey-web-fullscreen/src/IconsSelector.json";
    GM.xmlHttpRequest({ url, timeout: 3000 })
      .then((res) => {
        const remoteConf = JSON.parse(res.responseText ?? "{}");
        this.selectors = { ...this.selectors, ...remoteConf };
        Storage.ICONS_SELECTOR.set(Consts.EMPTY, this.selectors, 1 / 3); // 缓存8小时
      })
      .catch((e) => console.error("加载远程配置失败", e));
  }

  /**
   * 将 GM 脚本的 @match 规则转换为 JS 正则表达式数组
   */
  static _convertGmMatchToRegex() {
    const { matches, includes: excluded } = GM_info.script;
    const isValid = (s) => s !== "*://*/*" && !excluded.includes(s);
    this.siteRegex = matches.filter(isValid).map((s) => new RegExp(s.replace(/\*/g, "\\S+")));
  }

  /**
   * 动态生成站点检测方法（统一为 isXXX 格式）
   * 如：isMgtv()、isDouyu()、isBili()、isBiliLive() 等
   */
  static _createSiteTests() {
    Object.entries(this._siteRegex).forEach(([name, regex]) => {
      const methodName = `is${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      if (!this[methodName]) this[methodName] = () => regex.test(location.href);
    });
  }
}
