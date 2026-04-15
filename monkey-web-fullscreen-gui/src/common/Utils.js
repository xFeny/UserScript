export default {
  /**
   * 等待条件满足工具函数
   * 轮询检查条件函数，直到返回 true 则成功 resolve；超时则 reject
   * @param {Function} condition - 检查条件的函数，返回 true / false
   * @param {Object} [opts={}] - 配置项
   * @param {boolean} [opts.immediate=false] - 是否立即执行第一次检查
   * @param {number} [opts.interval=50] - 轮询间隔时间（毫秒）
   * @param {number} [opts.timeout=3000] - 超时时间（毫秒），超过则报错
   * @returns {Promise} 条件满足 resolve，超时 reject
   */
  waitFor(condition, opts = {}) {
    const start = Date.now();
    const { immediate = false, interval = 50, timeout = 3000 } = opts;

    return new Promise((resolve, reject) => {
      const checkCondition = () => {
        if (Date.now() - start > timeout) return reject(new Error("waitFor 预期条件未满足"));
        condition() ? resolve() : setTimeout(checkCondition, interval);
      };

      immediate ? checkCondition() : setTimeout(checkCondition, interval); // 执行第一次检测
    });
  },
  /**
   * AOP 前置拦截函数
   * 在目标对象的指定方法执行**之前**，先执行一个自定义函数
   * 不影响原方法的执行，属于无侵入式增强
   * @param {Object} target - 要拦截的目标对象（例如 document、element、实例对象）
   * @param {string} funcName - 要拦截的目标方法名（字符串类型）
   * @param {Function} preExec - 原方法执行前要运行的前置函数
   */
  onBefore(target, funcName, preExec) {
    const original = target[funcName];
    target[funcName] = function (...args) {
      Promise.resolve().then(() => preExec.apply(this, args));
      return original.apply(this, args);
    };
  },
  /**
   * 防抖函数
   * @param {Function} func - 要防抖的函数
   * @param {number} delay - 延迟时间（毫秒）
   * @returns 防抖后的新函数
   */
  debounce(func, delay = 350) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  },
};
