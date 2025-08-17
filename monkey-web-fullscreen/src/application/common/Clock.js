/**
 * 实时显示当前时间
 */
export default class Clock {
  constructor(container) {
    if (!container) return;

    this.container = container;
    this.animationId = null;
    this.isRunning = false;

    if (container.querySelector("clock")) return;
    this.clock = document.createElement("div");
    this.clock.style = "top:20px;right:50px;font-size:18px;color:#FFF;position:absolute;z-index:10;";
    this.container.append(this.clock);
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
    this.clock.style.setProperty("display", "inline-block");
    this.update();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.isRunning = false;
    this.clock.style.display = "none";
  }

  destroy() {
    this.stop();
    this.clock?.remove();
    this.container = null;
    this.clock = null;
  }
}
