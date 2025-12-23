/**
 * 时钟组件类
 * 功能：在指定容器中实时更新数字时钟
 * @class
 * @example
 * // 基础使用
 * const clock = new Clock(document.body, { color: '#333', clss: 'my-clock' });
 * // 停止时钟（隐藏）
 * clock.stop(true);
 * // 重新启动
 * clock.start();
 * // 切换容器
 * clock.setContainer(document.getElementById('clock-box'));
 * // 销毁时钟
 * clock.destroy();
 */
export default class Clock {
  options = { color: null, clss: "Clock" };

  constructor(container, options) {
    if (!container) throw new Error("时钟创建失败：container不能为空");
    this.options = Object.assign(this.options, options);
    this.container = container;
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

  formatTime(date) {
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  update() {
    if (!this.isRunning) return; // 防止停止后仍执行

    this.element.textContent = this.formatTime(new Date());
    if (!this.container.contains(this.element)) this.container.prepend(this.element);
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true; // 先标记运行状态，避免重复执行
    this.element.style.setProperty("display", "unset");
    this.intervalId = setInterval(() => this.update(), 500);
    this.update();
  }

  stop(hide = false) {
    this.isRunning = false; // 优先标记停止，阻断update循环
    if (this.intervalId) clearInterval(this.intervalId), delete this.intervalId;
    if (hide) this.element?.style.setProperty("display", "none");
  }

  destroy() {
    this.stop();
    this.element?.remove();
    this.container = this.element = null;
  }
}
