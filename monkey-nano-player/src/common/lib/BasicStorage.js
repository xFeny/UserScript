// 基础存储类
export default class BasicStorage {
  /**
   * 构造函数
   * @param {string} name 存储键名
   * @param {any} defVal 默认值
   * @param {Function} parser 数据解析函数
   */
  constructor(name, defVal, parser = (v) => v) {
    Object.assign(this, { name, defVal, parser });
  }

  // 生成最终键名
  #getKey(suffix = "") {
    return this.name + suffix;
  }

  // 存值
  set(value, suffix) {
    GM_setValue(this.#getKey(suffix), value);
  }

  // 取值
  get(suffix) {
    const val = GM_getValue(this.#getKey(suffix));
    return this.parser(val ?? this.defVal);
  }
}
