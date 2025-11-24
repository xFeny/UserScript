import Site from "../common/Site";
import Tools from "../common/Tools";
import SiteIcons from "../common/SiteIcons";

/**
 * `@match`网站网页全屏处理
 */
export default {
  triggerIconElement(name) {
    if (Tools.isFrequent("icon")) return;
    const index = Object.values(SiteIcons.name).indexOf(name);
    if (!Site.isBiliLive()) return Tools.query(SiteIcons[location.host]?.[name])?.click();
    SiteIcons.name.webFull === name ? this.liveWebFullscreen() : this.getBiliLiveIcons()?.[index]?.click();
  },
  liveWebFullscreen() {
    unsafeWindow.top.scrollTo({ top: 70 });
    const el = Tools.query(":is(.lite-room, #player-ctnr)", top.document);
    if (el) unsafeWindow.top.scrollTo({ top: Tools.getElementRect(el)?.top });

    if (!Tools.hasCls(document.body, "hide-asida-area") && unsafeWindow.top?.livePlayer) {
      unsafeWindow.top.livePlayer.volume(100); // 声音100%
      unsafeWindow.top.livePlayer.switchQualityAsync("10000"); // 原画画质
      localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0); // 关闭全屏礼物栏
      Tools.addCls(document.body, "hide-asida-area", "hide-aside-area"); // 关闭侧边聊天栏
    }

    const icons = this.getBiliLiveIcons();
    return Tools.triggerClick(icons?.[1]);
  },
  getBiliLiveIcons() {
    // 图标从右到左：全屏、网页全屏、弹幕设置、弹幕开关、小窗模式，即下标[0]是全屏图标
    Tools.triggerMousemove(this.getVideo());
    return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
  },
};
