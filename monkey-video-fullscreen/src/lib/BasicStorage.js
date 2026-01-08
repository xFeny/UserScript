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
   */
  constructor(name, defVal, parser = (v) => v) {
    Object.assign(this, { name, defVal, parser });
    this.storage = { getItem: GM_getValue, setItem: GM_setValue };
  }

  /**
   * 生成最终键名
   * @param {string} [suffix] 后缀
   * @returns {string} 最终拼接后的键名
   */
  #getFinalKey(suffix) {
    if (!suffix) throw new Error(`${this.name} 后缀不能为空！`);
    return this.name + suffix;
  }

  set(value, key) {
    this.storage.setItem(this.#getFinalKey(key), value);
  }

  get(key) {
    const value = this.storage.getItem(this.#getFinalKey(key));
    return this.parser(value ?? this.defVal);
  }
}
