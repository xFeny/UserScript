import Draggable from "draggable/src/draggable.js";

/**
 * 通用悬浮迷你小窗
 * 内部职责：拖拽、显隐切换、元素迁移还原、尺寸管理、样式控制
 * 交叉监听、触发时机 全部由外部实现
 */
export default class NanoFloatWindow {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.target 需挂载的目标DOM
   * @param {number} [options.width] 默认宽度
   * @param {number} [options.height] 默认高度
   */
  constructor(options = {}) {
    Object.assign(this, { width: 500, height: 300 }, options);
    this.#init();
  }

  /**
   * 初始化容器、缓存原始位置
   */
  #init() {
    if (!this.target) return;

    this.#cacheOrigin();
    this.#createElement();
    this.#bindDraggable();
    this.activate(false);
    this.setSize();
    return this;
  }

  /**
   * 缓存元素原始父级与后置兄弟，用于还原
   */
  #cacheOrigin() {
    this.originParent = this.target.parentElement;
    this.originNext = this.target.nextSibling;
  }

  #newEle = (tag, attrs) => Object.assign(document.createElement(tag), attrs);

  /**
   * 创建小窗DOM结构
   */
  #createElement() {
    if (this.wrap) return;

    this.header = this.#buildHeader();
    this.content = this.#newEle("div", { className: "vc-nano-content" });
    this.wrap = this.#newEle("div", { className: "vc-nano-wrap" });

    this.wrap.append(this.header, this.content);
    document.body.prepend(this.wrap);
  }

  /**
   * 构建头部 + 关闭按钮
   */
  #buildHeader() {
    const close = this.#newEle("span", { title: "关闭", className: "vc-nano-close", onclick: () => this.#close() });
    const back = this.#newEle("span", { title: "返回", className: "vc-nano-back", onclick: () => this.#goBack() });
    const header = this.#newEle("div", { className: "vc-nano-header" });
    header.append(close, back);
    return header;
  }

  #close() {
    const y = window.scrollY;
    this.activate(false);
    window.scrollTo(0, y);
  }

  #goBack() {
    this.activate(false);
    if (!this.target?.isConnected) return;
    this.target.scrollIntoView({ block: "center" });
  }

  /**
   * 绑定拖拽
   */
  #bindDraggable() {
    if (!this.header || !this.content) return;
    new Draggable(this.header, {
      setPosition: false,
      onDrag: (_, x, y) => {
        this.content.style.left = `${x}px`;
        this.content.style.top = `${y + this.header.offsetHeight}px`;
      },
    });
  }

  /**
   * 设置小窗尺寸
   * @param {number} w 宽度
   * @param {number} h 高度
   */
  setSize(w = this.width, h = this.height) {
    if (!this.content) return;
    this.header.style.width = this.content.style.width = `${w > 0 ? w : this.width}px`;
    this.content.style.height = `${h > 0 ? h : this.height}px`;
  }

  /**
   * 核心：切换小窗状态
   * @param {boolean} show true=开启小窗 / false=还原原位
   */
  activate(show) {
    const { target } = this;
    if (!this.wrap || !target) return;

    try {
      // 移动元素到指定元素内
      const parent = show ? this.content : this.originParent;
      if (!target?.isConnected || !parent?.isConnected) return;
      parent?.moveBefore(target, show ? null : this.originNext);

      // 添加class
      target.classList.toggle("vc-nano-player", show);
      this.wrap.classList.toggle("active", show);
    } catch (err) {
      console.warn("页内小窗切换异常：", err);
      this.#resetContent();
    }
  }

  /**
   * 更新目标元素
   * @param {HTMLElement} target
   * @returns
   */
  setTarget(target) {
    if (!(target instanceof HTMLElement)) return;
    if (this.target === target) return;

    this.#resetContent();
    this.target = target;
    this.#cacheOrigin();
  }

  #resetContent() {
    try {
      this.content?.replaceChildren();
      this.wrap?.classList.remove("active");
      this.target?.classList.remove("vc-nano-player");
      this.target = null;
    } catch (e) {}
  }
}
