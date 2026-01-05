import URLBlacklist from "../lib/URLBlacklist";
import Storage from "../common/Storage";

/**
 * 处理：自动网页全屏时忽略的网址
 */
export default {
  setupIgnoreUrlsChangeListener() {
    GM_addValueChangeListener(Storage.IGNORE_URLS.name, (_, oldVal, newVal) => {
      if (oldVal === newVal) return; // 防止无限循环
      this.initializeIgnoreUrls();
    });
  },
  initializeIgnoreUrls() {
    const urls = this.processIgnoreUrls(Storage.IGNORE_URLS);
    this.urlFilter = new URLBlacklist(urls);
  },
  isIgnoreUrl() {
    if (!this.urlFilter) this.initializeIgnoreUrls();
    return this.urlFilter?.isBlocked(this.topWin?.url ?? location.href);
  },
  processIgnoreUrls(cache) {
    const urlsStr = cache.get(this.topWin.host) ?? "";
    const existUrls = urlsStr.split(/[;\n]/).filter((e) => e.trim());
    return existUrls.length ? existUrls : [];
  },
};
