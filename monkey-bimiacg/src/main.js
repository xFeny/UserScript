import "./style.css";
import siteConfigs from "./siteConfigs";

const MSG_SOURCE = "FENY_SCRIPTS_ANIME";
const settings = { volume: 1, opacity: 0.88, autoPlay: true, defaultWide: true };
const App = {
  init() {
    this.videoSetting();
    this.setupKeydownListener();
  },
  isFanTuan: () => location.host.includes("ft"),
  isEzSite: () => location.host.includes("ezdmw"),
  isBimi: () => location.host.includes("bimiacg"),
  postMessage: (data) => parent?.postMessage({ source: MSG_SOURCE, ...data }, "*"),
  videoSetting() {
    settings.theme = this.isBimi() ? "bilibili" : "YouTube";
    const storage = JSON.parse(localStorage.getItem("html5Settings"));
    localStorage.setItem("html5Settings", JSON.stringify(Object.assign({}, storage, settings)));
  },
  setupKeydownListener() {
    window.addEventListener("keydown", (event) => {
      const hotKey = event.key.toUpperCase();
      if (["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
      if (window.top !== window) return this.postMessage({ hotKey }, "*");
      this.execHotKeyActions(hotKey);
    });
    window.addEventListener("message", ({ data }) => {
      if (!data?.source?.includes(MSG_SOURCE)) return;
      if (data?.hotKey) this.execHotKeyActions(data.hotKey);
    });
  },
  execHotKeyActions(key) {
    const actions = this.getKeyMapping();
    if (actions[key]) actions[key]();
  },
  getKeyMapping() {
    return {
      T: () => {
        // E站切换逻辑
        if (this.isEzSite()) {
          const routes = siteConfigs.ezSite.getRoutes();
          const currentRoute = siteConfigs.ezSite.getCurrentRoute();
          siteConfigs.ezSite.switchRoute(routes, currentRoute);
        }
        // 饭团动漫切换逻辑
        if (this.isFanTuan()) {
          const currentRoute = siteConfigs.fanTuan.getCurrentRoute();
          siteConfigs.fanTuan.switchRoute(currentRoute, siteConfigs);
        }
        // 哔咪动漫切换逻辑
        if (this.isBimi()) {
          const routes = siteConfigs.bimi.getRoutes();
          const currentEpisode = siteConfigs.bimi.getCurrentEpisode();
          siteConfigs.bimi.switchRoute(routes, currentEpisode, siteConfigs);
        }
      },
    };
  },
};

App.init();
