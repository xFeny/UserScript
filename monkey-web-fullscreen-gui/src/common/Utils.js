export default {
  waitFor(condition, opts = {}) {
    const start = Date.now();
    const { immediate = false, interval = 50, timeout = 3000 } = opts;

    return new Promise((resolve, reject) => {
      const checkCondition = () => {
        if (Date.now() - start > timeout) return reject(new Error("检测超时"));
        condition() ? resolve() : setTimeout(checkCondition, interval);
      };

      immediate ? checkCondition() : setTimeout(checkCondition, interval); // 执行第一次检测
    });
  },
  hookBefore(target, funcName, preExec) {
    const original = target[funcName];
    target[funcName] = function (...args) {
      Promise.resolve().then(() => preExec.apply(this, args));
      return original.apply(this, args);
    };
  },
};
