// 定义不同网站的切换路线配置
export default {
  index(element) {
    const children = Array.from(element?.parentElement?.children ?? []);
    return children.indexOf(element);
  },
  // E站配置
  ezSite: {
    getRoutes: () => Array.from(document.querySelectorAll("div[class*='line_button']")),
    getCurrentRoute: () => document.querySelector("div[class*='line_button'][style*='rgb']"),
    switchRoute: (routes, currentRoute) => routes.find((route) => route !== currentRoute)?.click(),
  },
  // 饭团动漫配置
  fanTuan: {
    getCurrentRoute: () => document.querySelector(".anime-episode.active"),
    switchRoute(currentRoute, self) {
      let nextRoute = currentRoute?.nextElementSibling;
      if (!nextRoute) nextRoute = currentRoute.parentElement.firstElementChild;
      const index = self.index(document.querySelector("a[class*='btn-episode active']"));
      nextRoute.children[index].click();
    },
  },
  // 哔咪动漫配置
  bimi: {
    getRoutes: () => Array.from(document.querySelectorAll(".play_box")),
    getCurrentEpisode: () => document.querySelector(`a[href="${location.pathname}"]`)?.parentElement,
    switchRoute(routes, currentEpisode, self) {
      const currentRouteIndex = routes.findIndex((route) => route.classList.contains("show"));
      let nextRouteIndex = currentRouteIndex + 1;
      if (nextRouteIndex >= routes.length) nextRouteIndex = 0;
      const currentEpisodeIndex = self.index(currentEpisode);
      const episodes = routes[nextRouteIndex]?.querySelectorAll("li");
      episodes[currentEpisodeIndex]?.firstElementChild?.click();
    },
  },
};
