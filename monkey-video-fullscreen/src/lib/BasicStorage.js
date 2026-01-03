/**
 * 基础存储类
 * 支持 localStorage/GM API、过期时间、模糊操作
 */
export default class BasicStorage {
  /**
   * 构造函数
   * @param {string} name 存储键名前缀
   * @param {any} defVal 默认值
   * @param {boolean} [useLocalStore=false] 是否使用localStorage（默认GM API）
   * @param {Function} [parser=(v) => v] 数据解析函数
   * @param {boolean} [splice=false] 是否拼接键名（前缀+后缀）
   */
  constructor(name, defVal, useLocalStore = false, parser = (v) => v, splice = false) {
    Object.assign(this, { name, defVal, useLocalStore, parser, splice });
    this.storage = useLocalStore ? localStorage : { getItem: GM_getValue, setItem: GM_setValue, removeItem: GM_deleteValue };
  }

  /**
   * 生成最终键名
   * @param {string} [suffix=""] 后缀
   * @param {boolean} [requireKey=false] 是否强制非空
   * @returns {string} 最终拼接后的键名
   * @throws {Error} 当requireKey为true且suffix为空时抛出错误
   */
  #getFinalKey(suffix = "", requireKey = false) {
    if (requireKey && [null, undefined].includes(suffix)) throw new Error("键名拼接时，suffix（第二个参数）不能为空");
    if (suffix.startsWith(this.name)) return suffix;
    return this.splice ? this.name + suffix : this.name;
  }

  /**
   * 存储数据（支持过期天数）
   * @param {any} value 存储值
   * @param {string} key 键名后缀（最终键名由基础名+该后缀拼接）
   * @param {number} [expires] 过期天数（不传永久）
   */
  set(value, key, expires) {
    const val = expires ? JSON.stringify({ value, expires: Date.now() + expires * 864e5 }) : value;
    this.storage.setItem(this.#getFinalKey(key, true), val);
  }

  /**
   * 获取数据（自动校验过期时间）
   * @param {string} [key] 键名后缀（可选，不传则使用基础名）
   * @returns {any} 解析后的有效数据 | 默认值
   */
  get(key) {
    const data = this.#get(this.#getFinalKey(key));
    return !data?.value ? data : data.expires > Date.now() ? data.value : this.defVal;
  }

  /**
   * 读取并解析存储数据
   * @param {string} key 最终存储键名
   * @returns {any} 解析后的数据 | 默认值
   */
  #get(key) {
    const value = this.storage.getItem(key);
    try {
      return JSON.parse(value) ?? this.defVal;
    } catch {
      return this.parser(value ?? this.defVal);
    }
  }
}
