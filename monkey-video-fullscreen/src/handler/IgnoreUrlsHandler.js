import Storage from "../common/Storage";

/**
 * 处理：自动网页全屏时忽略的网址
 */
export default {
  setupIgnoreUrlsChangeListener() {
    GM_addValueChangeListener(Storage.IGNORE_URLS.name, (_, oldVal, newVal) => oldVal !== newVal && this.initIgnoreUrls());
  },
  initIgnoreUrls() {
    this.urlFilter = this.getIgnoreUrls();
  },
  isIgnoreUrl() {
    if (!this.urlFilter) this.initIgnoreUrls();
    return this.isBlocked(this.urlFilter);
  },
  async getIgnoreUrls() {
    const urlsStr = Storage.IGNORE_URLS.get(this.topWin.host);
    return urlsStr.split(/[;\n]/).filter((url) => url.trim());
  },
  isBlocked(urls = []) {
    const { href, pathname } = new URL(this.topWin.url);
    return pathname === "/" || urls.some((u) => href.startsWith(u));
  },
};
