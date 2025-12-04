/**
 * 实时显示当前时间
 */
export default class Clock {
  static state = { start: "start", stop: "stop" };
  options = { color: null, clss: "Clock" };

  constructor(container, options) {
    if (!container) throw new Error("时钟初始化失败：container不能为空");
    this.options = Object.assign(this.options, options);

    this.container = container;
    this.animationId = null;
    this.isRunning = false;

    this.initClockElement();
    this.start();
  }

  initClockElement() {
    if (this.element) return;
    const { color, clss } = this.options;

    this.element = document.createElement("div");
    if (color) this.element.style.setProperty("color", color);
    this.element.classList.add(clss);

    this.container.prepend(this.element);
  }

  setContainer(container) {
    if (!container || this.container === container) return this;
    if (this.element && !container.contains(this.element)) container.prepend(this.element);
    this.container = container;

    return this;
  }

  setCustomColor(color) {
    if (!color) return this.element?.style.removeProperty("color");
    this.element?.style.setProperty("color", color);

    return this;
  }

  formatTime(date) {
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  update() {
    this.isRunning = true;
    const now = new Date();
    this.element.textContent = this.formatTime(now);
    if (!this.container.contains(this.element)) this.container.prepend(this.element);
    this.animationId = requestAnimationFrame(() => this.update());
  }

  start() {
    if (this.isRunning) return;
    this.element.style.setProperty("display", "unset");
    this.update();
  }

  stop(hide = false) {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.isRunning = false;
    if (hide) this.element?.style.setProperty("display", "none");
  }

  destroy() {
    this.stop();
    this.element?.remove();
    this.container = null;
    this.element = null;
  }
}
