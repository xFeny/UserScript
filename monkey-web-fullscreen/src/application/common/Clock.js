/**
 * 实时显示当前时间
 */
export default class Clock {
  static state = { start: "start", stop: "stop" };
  options = { color: null, clss: "Clock", coexist: false };

  constructor(container, options) {
    if (!container) return;
    this.options = Object.assign(this.options, options);

    this.container = container;
    this.animationId = null;
    this.isRunning = false;

    this.initClockElement();
    this.start();
  }

  initClockElement() {
    const { color, clss, coexist } = this.options;
    if (!coexist && this.isInDOM()) this.destroy();
    this.element = document.createElement("div");
    if (color) this.element.style.setProperty("color", color);
    this.element.classList.add(clss);
    this.container.prepend(this.element);
  }

  isInDOM() {
    return document.contains(this.element);
  }

  setCustomColor(color) {
    if (!color) return this.element?.style.removeProperty("color");
    this.element?.style.setProperty("color", color);
  }

  formatTime(date) {
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return [h, m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
  }

  update() {
    this.isRunning = true;
    const now = new Date();
    this.element.textContent = this.formatTime(now);
    this.animationId = requestAnimationFrame(() => this.update());
  }

  start() {
    if (this.isRunning) return;
    this.element.style.setProperty("display", "unset");
    this.update();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.isRunning = false;
    this.element?.style.setProperty("display", "none");
  }

  destroy() {
    this.stop();
    this.element?.remove();
    this.container = null;
    this.element = null;
  }
}
