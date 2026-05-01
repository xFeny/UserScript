export default {
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
   * AOP 环绕拦截函数
   * 完全控制：原方法执行前 + 执行后 + 返回值 + 是否执行原方法
   * @param {Object} target - 目标对象
   * @param {string} funcName - 目标方法名
   * @param {Function} wrapper - 环绕包装函数
   *  wrapper 格式：(originMethod, args) => any
   */
  around(target, funcName, wrapper) {
    const original = target[funcName];

    // 替换原方法
    target[funcName] = function (...args) {
      // 把【原方法】和【参数】一起传给环绕函数
      return wrapper.call(this, original.bind(this), args);
    };
  },
};
