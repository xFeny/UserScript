import Utils from "../common/Utils";
import Store from "../common/Store";
import FloatWindow from "../common/lib/FloatWindow";

export default {
  FS: null,
  init() {
    if (!Element.prototype.moveBefore) return console.warn("浏览器不支持！！");
    if (!unsafeWindow.GM_E9X_FS) return console.warn("未安装依赖，无法正常运行！！");
    this.FS = unsafeWindow.GM_E9X_FS;
    this.setupNavigateListener();
    this.setupTopWinListener();
    this.lockedWebFullscreen();
    this.host = location.host;
  },
  /**
   * url发生变化时隐藏小窗
   */
  setupNavigateListener() {
    navigation.addEventListener("navigate", () => {
      if (!this.nano) return;
      this.activateNano(false, true);
      FyTools.scrollTop(0);
    });
  },
  /**
   * 小窗显示时禁止切换(网页)全屏
   */
  lockedWebFullscreen() {
    Utils.around(this.FS, "processEvent", (originFn, args) => {
      if (this.nano?.isActive() && ["P", "ENTER"].includes(args[0]?.key)) return;
      return originFn(...args);
    });
  },
  setupTopWinListener() {
    Utils.onBefore(this.FS, "syncMetaToParentWin", () => this.setupNanoFeatures());
    unsafeWindow.addEventListener("load", () => this.FS.topWin && this.setupNanoFeatures());
  },
  setupNanoFeatures() {
    try {
      this.initMenuCmds();
      this.createNanoObserver();
    } catch (err) {
      console.warn(err);
    }
  },
  createNanoObserver() {
    if (this.nano) this.activateNano(false);
    const target = this.FS.getVideoHostContainer();
    if (!target?.isConnected) return console.warn("元素不存在或已销毁");

    // 创建小窗或更新小窗目标视频元素
    this.nano ??= new FloatWindow({ target });
    if (this.observer) this.nano.setTarget(target);

    // 设置可视观察元素
    const obsNode = this.getInter(target, FyTools.getParent(target));
    this.setupNanoObserver(obsNode);
  },
  /**
   * 初始化迷你播放器交叉观察器
   * 监听目标元素与视口的可见性，离开视口时自动启用迷你播放器，进入视口时恢复正常
   * 监测目标：优先使用配置的自定义元素，无配置则默认使用视频父容器
   */
  setupNanoObserver(obsNode) {
    if (!obsNode) return;

    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!obsNode?.isConnected) return this.createNanoObserver();
        if (this.isBlackUrl() || !Store.ENABLE_NANO.get(this.host)) return;

        this.activateNano(!entry.isIntersecting);
        this.setNanoStyleSize();
      },
      { root: null, threshold: 0 }
    );

    this.observer.observe(obsNode);
  },
  getInter(ctx, defVal) {
    const selector = Store.INTERSECT_ELEMENT.get(this.host);
    return selector ? (ctx?.closest(selector) ?? FyTools.query(selector)) : defVal;
  },
  /**
   *   设置小窗宽高
   */
  setNanoStyleSize() {
    const [w, h] = Store.NANO_SIZE.get();
    this.nano?.setSize(w, h);
  },
  /**
   * 切换视频DOM位置
   * @param {Boolean} active true=小窗 / false=还原
   */
  activateNano(active) {
    this.nano?.activate(active);
    (this.isNotFirst || this.nano?.isActive()) && this.FS.sendToVideoIFrame({ key: "P" });
    this.isNotFirst = true;
  },
  isBlackUrl() {
    const { href, pathname } = location;
    const uris = Store.IGNORE_URLS.get(this.host);
    const isBlack = uris.some((prefix) => prefix && href.startsWith(prefix));
    return isBlack || Object.is(pathname, "/");
  },
};
