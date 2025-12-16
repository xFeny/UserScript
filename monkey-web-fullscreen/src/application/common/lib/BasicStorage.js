/**
 * 基础存储类
 */
export default class BasicStorage {
  static instances = [];

  /**
   * 构造函数 - 初始化存储实例
   * @param {string} name - 存储键名前缀/基础键名（核心标识）
   * @param {any} defVal - 获取数据失败/过期时的默认值
   * @param {boolean} [useLocalStore=false] - 存储源选择：true=localStorage，false=GM_* API
   * @param {Function} [parser=(v) => v] - 数据解析函数，处理从存储中读取的值
   * @param {boolean} [splice=false] - 键名拼接策略：true=基础名+后缀，false=固定使用基础名
   */
  constructor(name, defVal, useLocalStore = false, parser = (v) => v, splice = false) {
    Object.assign(this, { name, defVal, useLocalStore, parser, splice });
    this.storage = useLocalStore ? localStorage : { getItem: GM_getValue, setItem: GM_setValue, removeItem: GM_deleteValue };

    BasicStorage.instances.push(this);
    if (BasicStorage.instances.length === 1) requestIdleCallback(() => BasicStorage.cleanExpired());
  }

  /**
   * 内部方法 - 生成最终存储键名
   * @param {string} [suffix=""] - 键名后缀（用于拼接）
   * @param {boolean} [requireKey=false] - 是否强制要求suffix非空（set方法必传，get/del可选）
   * @returns {string} 最终拼接后的键名
   * @throws {Error} 当requireKey为true且suffix为空时抛出错误
   */
  _getFinalKey(suffix = "", requireKey = false) {
    if (requireKey && [null, undefined].includes(suffix)) throw new Error("键名拼接时，suffix（第二个参数）不能为空");
    if (suffix.startsWith(this.name)) return suffix;
    return this.splice ? this.name + suffix : this.name;
  }

  /**
   * 存储数据（支持设置过期时间）
   * @param {any} value - 要存储的值
   * @param {string} key - 键名后缀（最终键名由基础名+该后缀拼接）
   * @param {number} [expires] - 过期天数：不传则永久存储
   */
  set(value, key, expires) {
    const val = expires ? JSON.stringify({ value, expires: Date.now() + expires * 864e5 }) : value;
    this.storage.setItem(this._getFinalKey(key, true), val);
  }

  /**
   * 获取数据（自动校验过期时间）
   * @param {string} [key] - 键名后缀（可选，不传则使用基础名）
   * @returns {any} 解析后的有效数据 | 默认值
   */
  get(key) {
    const data = this._get(this._getFinalKey(key));
    return !data?.value ? data : data.expires > Date.now() ? data.value : this.defVal;
  }

  /**
   * 内部方法 - 读取并解析存储数据（核心读取逻辑）
   * @param {string} key - 最终存储键名
   * @returns {any} 解析后的数据 | 默认值
   */
  _get(key) {
    const value = this.storage.getItem(key);
    try {
      return JSON.parse(value) ?? this.defVal;
    } catch {
      return this.parser(value ?? this.defVal);
    }
  }

  /**
   * 删除指定键名的数据
   * @param {string} [key] - 键名后缀（可选，不传则删除基础名对应数据）
   */
  del(key) {
    this.storage.removeItem(this._getFinalKey(key));
  }

  fuzzyGet(pattern) {
    const result = {};
    this.fuzzyHandle(pattern, (key) => (result[key] = this.storage.getItem(key)));
    return result;
  }

  fuzzyDel(pattern) {
    this.fuzzyHandle(pattern, (key) => this.storage.removeItem(key));
  }

  fuzzyHandle(pattern, callback) {
    const keys = Object.is(this.storage, localStorage) ? Object.keys(localStorage) : GM_listValues();
    const keyMatcher = pattern instanceof RegExp ? (key) => pattern.test(key) : (key) => key.includes(pattern);
    keys.filter(keyMatcher).forEach(callback);
  }

  /**
   * 静态方法 - 批量清理所有实例的过期数据
   * 遍历所有实例，模糊匹配实例基础名，校验过期时间并删除过期数据
   */
  static cleanExpired() {
    this.instances.forEach((instance) => {
      instance.fuzzyHandle(instance.name, (key) => {
        const data = BasicStorage.prototype._get.call(instance, key);
        if (data?.expires && data.expires < Date.now()) BasicStorage.prototype.del.call(instance, key);
      });
    });
  }
}
