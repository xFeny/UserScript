import "./style.css";

function getTitle() {
  let title = document.title;
  title = title.substring(0, title.lastIndexOf("|")).trim();
  title = title.substring(0, title.lastIndexOf(" ")).trim();
  return title;
}
const settings = { volume: 1, opacity: 0.88, autoPlay: true, defaultWide: true };
const MSG_SOURCE = "FENY_SCRIPTS_ANIME";
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
    return this.query("iframe:not([src=''])");
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
      F: () => {
        // 切换网页全屏
        this.toggleClass();
        const player = this.query(":is(.player, .ty-play)");
        window.scrollTo({ top: player?.getBoundingClientRect().top || 0 });
      },
      "[": () => {
        // 上集
        if (this.isBimi()) return this.query(".pre")?.click();
        const episode = this.query(`a[href="${location.pathname}"]`);
        if (this.isEzSite()) return episode?.nextElementSibling.click();
        episode?.previousElementSibling.click();
      },
      "]": () => {
        // 下集
        if (this.isBimi()) return this.query(".next")?.click();
        const episode = this.query(`a[href="${location.pathname}"]`);
        if (this.isEzSite()) return episode?.previousElementSibling.click();
        episode?.nextElementSibling.click();
      },
      T: () => {
        // 切换路线
        // E站
        if (this.isEzSite()) {
          const routes = Array.from(this.querys("div[class*='line_button']"));
          const currRoute = this.query("div[class*='line_button'][style*='rgb']");
          routes.find((route) => route !== currRoute)?.click();
        }
        // P站
        if (this.isPili()) {
          const routes = Array.from(this.querys(".c-player-episode ul"));
          const currEpisode = this.query(`a[class*="current"][href="${location.pathname}"]`);
          const currRouteIndex = routes.findIndex((route) => route === currEpisode.parentElement);
          let nextRouteIndex = currRouteIndex + 1;
          if (nextRouteIndex >= routes.length) nextRouteIndex = 0;
          const currEpisodeIndex = this.index(currEpisode);
          const episodes = this.querys("a", routes[nextRouteIndex]);
          episodes[currEpisodeIndex]?.click();
        }
        // 饭团动漫
        if (this.isFanTuan()) {
          try {
            const currRoute = this.query(".anime-episode.active");
            let nextRoute = currRoute?.nextElementSibling;
            if (!nextRoute) nextRoute = currRoute.parentElement.firstElementChild;
            const index = this.index(this.query("a[class*='btn-episode active']"));
            nextRoute.children[index].click();
          } catch (e) {}
        }
        // 哔咪动漫
        if (this.isBimi()) {
          try {
            const routes = Array.from(this.querys(".play_box"));
            const currEpisode = this.query(`a[href="${location.pathname}"]`)?.parentElement;
            const currRouteIndex = routes.findIndex((route) => route.classList.contains("show"));
            let nextRouteIndex = currRouteIndex + 1;
            if (nextRouteIndex >= routes.length) nextRouteIndex = 0;
            const currEpisodeIndex = this.index(currEpisode);
            const episodes = this.querys("li", routes[nextRouteIndex]);
            episodes[currEpisodeIndex]?.firstElementChild?.click();
          } catch (e) {}
        }
      },
      V: () => {
        // 使用E站搜索视频
        if (!this.isBimi()) return;
        // https://www.moduzy7.com/search/-------------/?wd=${getTitle()}
        GM_openInTab(`https://www.ezdmw.site/Index/search.html?searchText=${getTitle()}`);
      },
    };
  },
  index(element) {
    if (!element) return;
    const parent = element.parentNode;
    if (!parent) return -1;
    const children = Array.from(parent.children);
    return children.indexOf(element);
  },
  toggleClass() {
    const selector = "webFullScreen";
    this.getFrame()?.classList.toggle(selector);
    this.query(".MacPlayer")?.classList.toggle(selector);
  },
};

App.init();
