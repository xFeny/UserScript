import URLBlacklist from "../lib/URLBlacklist";
import Storage from "../common/Storage";

/**
 * 处理：自动网页全屏时忽略的网址
 */
export default {
  setupIgnoreUrlsChangeListener() {
    GM_addValueChangeListener(Storage.IGNORE_URLS.name, (_, oldVal, newVal) => {
      if (oldVal !== newVal) this.initializeIgnoreUrls();
    });
  },
  initializeIgnoreUrls() {
    this.urlFilter = new URLBlacklist(this.getIgnoreUrls());
  },
  isIgnoreUrl() {
    if (!this.urlFilter) this.initializeIgnoreUrls();
    return this.urlFilter?.isBlocked(this.topWin.url);
  },
  getIgnoreUrls() {
    const urlsStr = Storage.IGNORE_URLS.get(this.topWin.host);
    return urlsStr.split(/[;\n]/).filter((url) => url.trim());
  },
};
