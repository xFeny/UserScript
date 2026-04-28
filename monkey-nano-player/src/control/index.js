import Utils from "../common/Utils";
import Store from "../common/Store";
import FloatWindow from "../common/lib/FloatWindow";

export default {
  FS: null,
  init() {
    Utils.waitFor(() => unsafeWindow.GM_E9X_FS)
      .then(() => {
        this.host = location.host;
        this.FS = unsafeWindow.GM_E9X_FS;
        this.setupFunctionHooks();
      })
      .catch(() => console.warn("未安装依赖，脚本无法正常运行！！"));
  },
  setupFunctionHooks() {
    Utils.onBefore(this.FS, "syncMetaToParentWin", () => {
      this.createNanoObserver();
      this.initMenuCmds();
    });
  },
  createNanoObserver() {
    if (!FyTools.hasMoveBefore()) return console.warn("浏览器环境不支持，脚本无法显示页内小窗！！");

    this.activateNano(false);
    const target = this.FS.getVideoHostContainer();

    // 更新小窗内容
    this.nano ??= new FloatWindow({ target });
    if (this.observer) this.nano.setTarget(target);

    // 设置观察元素
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
        if (!Store.ENABLE_NANO.get(this.host)) return;
        this.activateNano(!entry.isIntersecting);
        this.setNanoStyleSize();
      },
      { root: null, threshold: 0 }
    );

    this.observer.observe(obsNode);
  },
  getInter(ctx, defVal) {
    const selector = Store.INTERSECT_ELEMENT.get(this.host);
    return selector ? (ctx.closest(selector) ?? FyTools.query(selector)) : defVal;
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
  },
};
