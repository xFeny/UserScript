import "./style.css";
import siteConfigs from "./siteConfigs";

function getTitle() {
  let title = document.title;
  title = title.substring(0, title.lastIndexOf("|")).trim();
  title = title.substring(0, title.lastIndexOf(" ")).trim();
  return title;
}
const MSG_SOURCE = "FENY_SCRIPTS_ANIME";
const settings = { volume: 1, opacity: 0.88, autoPlay: true, defaultWide: true };
// https://www.moduzy7.com/search/-------------/?wd=${getTitle()}
const searchAnime = `https://www.ezdmw.site/Index/search.html?searchText=${getTitle()}`;
const App = {
  init() {
    this.videoSetting();
    this.setupMutationObserver();
    this.setupKeydownListener();
  },
  setupMutationObserver() {
    const observer = new MutationObserver(() => {
      this.autoPlay();
      const ok = this.webFullScreen();
      if (ok || this.video) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  },
  query: (selector, context) => (context || document).querySelector(selector),
  querys: (selector, context) => (context || document).querySelectorAll(selector),
  isPili: () => location.host.includes("pili"),
  isFanTuan: () => location.host.includes("ft"),
  isEzSite: () => location.host.includes("ezdmw"),
  isBimi: () => location.host.includes("bimiacg"),
  getFrame() {
    return this.query("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])");
  },
  postMessage: (data) => parent?.postMessage({ source: MSG_SOURCE, ...data }, "*"),
  autoPlay() {
    if (this.isBimi()) return;
    this.video = this.query("video");
    if (!this.video) return;
    this.video.addEventListener("canplay", () => {
      this.video.play().catch(() => this.postMessage({ reloadFrame: true }));
    });
  },
  reloadVideoFrame() {
    if (this.isReloaded) return;
    const frame = this.getFrame();
    frame.src = frame.src;
    this.webFullScreen();
    this.isReloaded = true;
  },
  webFullScreen() {
    if (location.pathname === "/") return true;
    this.query(".line_button2")?.remove();
    const frame = this.getFrame();
    if (!frame) return false;
    frame.setAttribute("allow", "autoplay");
    frame.addEventListener("load", () => this.toggleClass());
    return true;
  },
  videoSetting() {
    settings.theme = this.isBimi() ? "bilibili" : "YouTube";
    const storage = JSON.parse(localStorage.getItem("html5Settings"));
    localStorage.setItem("html5Settings", JSON.stringify(Object.assign({}, storage, settings)));
  },
  setupKeydownListener() {
    window.addEventListener("keydown", (event) => {
      const hotKey = event.key.toUpperCase();
      const tagName = event.target.tagName;
      if (["INPUT", "TEXTAREA"].includes(tagName)) return;
      if (window.top !== window) return this.postMessage({ hotKey }, "*");
      this.execHotKeyActions(hotKey);
    });
    window.addEventListener("message", (event) => {
      const { data } = event;
      if (!data?.source) return;
      if (!data.source.includes(MSG_SOURCE)) return;
      if (data?.reloadFrame) return this.reloadVideoFrame();
      if (data?.hotKey) this.execHotKeyActions(data.hotKey);
    });
  },
  execHotKeyActions(key) {
    const actions = this.getKeyMapping();
    if (actions[key]) actions[key]();
  },
  getKeyMapping() {
    return {
      V: () => (this.isBimi() ? GM_openInTab(searchAnime) : null),
      F: () => this.toggleWebFullScreen(),
      "[": () => this.switchEpisodes(true),
      "]": () => this.switchEpisodes(),
      T: () => {
        // E站切换逻辑
        if (this.isEzSite()) {
          const routes = siteConfigs.ezSite.getRoutes(this);
          const currentRoute = siteConfigs.ezSite.getCurrentRoute(this);
          siteConfigs.ezSite.switchRoute(routes, currentRoute);
        }
        // P站切换逻辑
        if (this.isPili()) {
          const routes = siteConfigs.pili.getRoutes(this);
          const currentEpisode = siteConfigs.pili.getCurrentEpisode();
          siteConfigs.pili.switchRoute(routes, currentEpisode, this);
        }
        // 饭团动漫切换逻辑
        if (this.isFanTuan()) {
          const currentRoute = siteConfigs.fanTuan.getCurrentRoute(this);
          siteConfigs.fanTuan.switchRoute(currentRoute, this);
        }
        // 哔咪动漫切换逻辑
        if (this.isBimi()) {
          const routes = siteConfigs.bimi.getRoutes(this);
          const currentEpisode = siteConfigs.bimi.getCurrentEpisode();
          siteConfigs.bimi.switchRoute(routes, currentEpisode, this);
        }
      },
    };
  },
  toggleWebFullScreen() {
    const player = this.query(":is(.player, .ty-play)");
    window.scrollTo({ top: player?.getBoundingClientRect().top || 0 });
    this.toggleClass();
  },
  switchEpisodes(isPrev = false) {
    if (this.isBimi()) return this.query(isPrev ? ".pre" : ".next")?.click();
    const episode = this.query(`a[href="${location.pathname}"]`);
    if (this.isEzSite()) return (isPrev ? episode?.nextElementSibling : episode?.previousElementSibling).click();
    (isPrev ? episode?.previousElementSibling : episode?.nextElementSibling).click();
  },
  index(element) {
    if (!element) return;
    const parentEle = element.parentElement;
    if (!parentEle) return -1;
    const children = Array.from(parentEle.children);
    return children.indexOf(element);
  },
  toggleClass() {
    const selector = "webFullScreen";
    this.getFrame()?.classList.toggle(selector);
    this.query(".MacPlayer")?.classList.toggle(selector);
  },
};

App.init();
