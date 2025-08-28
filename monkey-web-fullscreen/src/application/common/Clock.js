/**
 * 实时显示当前时间
 */
export default class Clock {
  static state = { start: "start", stop: "stop" };
  options = { color: null };

  constructor(container, options) {
    if (!container) return;
    this.options = Object.assign(this.options, options);

    const { color } = this.options;
    this.container = container;
    this.animationId = null;
    this.isRunning = false;

    if (container.querySelector(".Clock")) this.destroy();
    this.clock = document.createElement("div");
    if (color) this.clock.style.setProperty("color", color);
    this.clock.classList.add("Clock");
    this.container.prepend(this.clock);
    this.start(); // 初始化时启动时钟
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
    this.clock.textContent = this.formatTime(now);
    this.animationId = requestAnimationFrame(() => this.update());
  }

  start() {
    if (this.isRunning) return;
    this.clock.style.setProperty("display", "unset");
    this.update();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.isRunning = false;
    this.clock?.style.setProperty("display", "none");
  }

  destroy() {
    this.stop();
    this.clock?.remove();
    this.container = null;
    this.clock = null;
  }
}
