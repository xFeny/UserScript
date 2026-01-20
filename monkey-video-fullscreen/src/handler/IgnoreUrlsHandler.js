import Storage from "../common/Storage";

/**
 * 处理：自动网页全屏时忽略的网址
 */
export default {
  initIgnoreUrls: () => (App.urlFilter = App.getIgnoreUrls()),
  setupIgnoreChangeListener() {
    GM_addValueChangeListener(Storage.IGNORE_URLS.name, (_, oldVal, newVal) => oldVal !== newVal && this.initIgnoreUrls());
  },
  isIgnoreUrl() {
    if (!this.urlFilter) this.initIgnoreUrls();
    return this.isBlocked(this.urlFilter);
  },
  getIgnoreUrls() {
    const urlsStr = Storage.IGNORE_URLS.get(this.topWin.host);
    return urlsStr.match(/[^\s;]+/g) || [];
  },
  isBlocked(urls = []) {
    const { href, pathname } = new URL(this.topWin.url);
    return pathname === "/" || urls.some((u) => href.startsWith(u));
  },
};
