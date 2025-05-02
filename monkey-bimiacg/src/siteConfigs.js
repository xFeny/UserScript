// 封装通用的获取元素列表的函数
const queryElements = (self, selector) => Array.from(self.querys(selector));

// 定义不同网站的切换路线配置
export default {
  // E站配置
  ezSite: {
    getRoutes: (self) => queryElements(self, "div[class*='line_button']"),
    getCurrentRoute: (self) => self.query("div[class*='line_button'][style*='rgb']"),
    switchRoute: (routes, currentRoute) => {
      routes.find((route) => route !== currentRoute)?.click();
    },
  },
  // P站配置
  pili: {
    getRoutes: (self) => queryElements(self, ".c-player-episode ul"),
    getCurrentEpisode: () => document.querySelector(`a[class*="current"][href="${location.pathname}"]`),
    switchRoute: (routes, currentEpisode, self) => {
      const currentRouteIndex = routes.findIndex((route) => route === currentEpisode.parentElement);
      let nextRouteIndex = currentRouteIndex + 1;
      if (nextRouteIndex >= routes.length) nextRouteIndex = 0;
      const currentEpisodeIndex = self.index(currentEpisode);
      const episodes = self.querys("a", routes[nextRouteIndex]);
      episodes[currentEpisodeIndex]?.click();
    },
  },
  // 饭团动漫配置
  fanTuan: {
    getCurrentRoute: (self) => self.query(".anime-episode.active"),
    switchRoute: (currentRoute, self) => {
      let nextRoute = currentRoute?.nextElementSibling;
      if (!nextRoute) nextRoute = currentRoute.parentElement.firstElementChild;
      const index = self.index(self.query("a[class*='btn-episode active']"));
      nextRoute.children[index].click();
    },
  },
  // 哔咪动漫配置
  bimi: {
    getRoutes: (self) => queryElements(self, ".play_box"),
    getCurrentEpisode: () => document.querySelector(`a[href="${location.pathname}"]`)?.parentElement,
    switchRoute: (routes, currentEpisode, self) => {
      const currentRouteIndex = routes.findIndex((route) => route.classList.contains("show"));
      let nextRouteIndex = currentRouteIndex + 1;
      if (nextRouteIndex >= routes.length) nextRouteIndex = 0;
      const currentEpisodeIndex = self.index(currentEpisode);
      const episodes = self.querys("li", routes[nextRouteIndex]);
      episodes[currentEpisodeIndex]?.firstElementChild?.click();
    },
  },
};
