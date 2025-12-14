import URLBlacklist from "../lib/URLBlacklist";
import Storage from "../common/Storage";

/**
 * 处理：自动网页全屏时忽略的网址
 */
export default {
  setupIgnoreUrlsChangeListener() {
    this.initializeIgnoreUrls();
    [Storage.IGNORE_URLS.name].forEach((key) =>
      GM_addValueChangeListener(key, (_, oldVal, newVal) => {
        if (oldVal === newVal) return; // 防止无限循环
        this.initializeIgnoreUrls();
      })
    );
  },
  initializeIgnoreUrls() {
    // 「自动网页全屏」忽略URL处理
    const fullUrls = this.processIgnoreUrls(Storage.IGNORE_URLS);
    this.fullUrlFilter = new URLBlacklist(fullUrls);
  },
  isIgnoreUrl() {
    const isHomePage = location.pathname == "/";
    const isBlocked = this.fullUrlFilter?.isBlocked(this.topWin.url);
    return this.topWin ? isBlocked || isHomePage : false;
  },
  processIgnoreUrls(cache) {
    const urlsStr = cache.get() ?? "";
    const existUrls = urlsStr.split(/[;\n]/).filter((e) => e.trim());

    // 返回用户配置的URL
    return existUrls.length ? existUrls : [];
  },
};
