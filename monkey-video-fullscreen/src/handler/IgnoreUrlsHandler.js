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
    const urls = this.processIgnoreUrls(Storage.IGNORE_URLS);
    this.urlFilter = new URLBlacklist(urls);
  },
  isIgnoreUrl() {
    const isBlocked = this.urlFilter?.isBlocked(this.topWin?.url ?? location.href);
    return isBlocked || location.pathname == "/";
  },
  processIgnoreUrls(cache) {
    const urlsStr = cache.get(this.topWin?.host ?? location.host) ?? "";
    const existUrls = urlsStr.split(/[;\n]/).filter((e) => e.trim());

    // 返回用户配置的URL
    return existUrls.length ? existUrls : [];
  },
};
