/**
 * 基础存储类
 * 支持 localStorage/GM API、过期时间、模糊操作
 */
export default class BasicStorage {
  /**
   * 构造函数
   * @param {string} name 存储键名前缀
   * @param {any} defVal 默认值
   * @param {Function} [parser=(v) => v] 数据解析函数
   * @param {boolean} [splice=false] 是否拼接键名（前缀+后缀）
   */
  constructor(name, defVal, parser = (v) => v, splice = false) {
    Object.assign(this, { name, defVal, parser, splice });
    this.storage = { getItem: GM_getValue, setItem: GM_setValue };
  }

  /**
   * 生成最终键名
   * @param {string} [suffix=""] 后缀
   * @param {boolean} [requireKey=false] 是否强制非空
   * @returns {string} 最终拼接后的键名
   * @throws {Error} 当requireKey为true且suffix为空时抛出错误
   */
  #getFinalKey(suffix = "", requireKey = false) {
    if (requireKey && [null, undefined].includes(suffix)) throw new Error("键名拼接时，第二个参数不能为空");
    if (suffix.startsWith(this.name)) return suffix;
    return this.splice ? this.name + suffix : this.name;
  }

  set(value, key) {
    this.storage.setItem(this.#getFinalKey(key, true), value);
  }

  get(key) {
    const value = this.storage.getItem(this.#getFinalKey(key));
    return this.parser(value ?? this.defVal);
  }
}
