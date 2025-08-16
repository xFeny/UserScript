/**
 * 实时显示当前时间
 * new Clock(video.parentElement);
 */
export default class Clock {
  constructor(container) {
    this.container = container;
    if (container.querySelector("clock")) return;
    this.clock = document.createElement("div");
    this.clock.style = "top:15px;right:25px;font-size:18px;color:#eee;position:absolute";
    this.container.append(this.clock);
    this.update();
  }

  formatTime(date) {
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return [h, m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
  }

  update() {
    const now = new Date();
    this.clock.textContent = this.formatTime(now);
    requestAnimationFrame(() => this.update());
  }
}
