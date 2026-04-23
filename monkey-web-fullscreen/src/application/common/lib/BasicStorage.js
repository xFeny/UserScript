/**
 * 基础存储类
 * 支持 localStorage/GM API、过期时间、模糊操作
 */
export default class BasicStorage {
  static #instances = [];

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

    BasicStorage.#instances.push(this);
    if (BasicStorage.#instances.length === 1) requestIdleCallback(() => BasicStorage.cleanExpired());
  }

  /**
   * 生成最终键名
   * @param {string} [suffix=""] 后缀
   * @returns {string} 最终拼接后的键名
   * @throws {Error} 当requireKey为true且suffix为空时抛出错误
   */
  #getKey(suffix) {
    if (this.splice && !suffix) throw new Error(`${this.name} 后缀不能为空！`);
    return this.name + (this.splice ? suffix : "");
  }

  /**
   * 存储数据（支持过期天数）
   * @param {any} value 存储值
   * @param {string} key 键名后缀（最终键名由基础名+该后缀拼接）
   * @param {number} [expires] 过期天数（不传永久）
   */
  set(value, key, expires) {
    const val = expires ? JSON.stringify({ value, expires: Date.now() + expires * 864e5 }) : value;
    this.storage.setItem(this.#getKey(key), val);
    return value;
  }

  /**
   * 获取并解析数据（自动校验过期时间）
   * @param {string} [key] 键名后缀（可选，不传则使用基础名）
   * @returns {any} 解析后的有效数据 | 默认值
   */
  get(key) {
    const data = this.#get(this.#getKey(key));
    if (!data?.value) return this.parser(data); // 不带过期时间的数据
    return this.parser(data.expires > Date.now() ? data.value : this.defVal);
  }

  /**
   * 读取原始存储数据
   * @param {string} key 最终存储键名
   * @returns {any} 解析后的数据 | 默认值
   */
  #get(key) {
    const raw = this.storage.getItem(key);
    if ([null, undefined].includes(raw)) return this.defVal;

    try {
      return JSON.parse(raw) ?? raw;
    } catch {
      return raw;
    }
  }

  /**
   * 布尔值切换：取反当前值并保存，返回新值
   * @param {string} [key] 键名后缀
   * @returns {boolean} 切换后的新值
   */
  toggle = (key) => this.set(!this.get(key), key);

  /**
   * 删除指定键名的数据
   * @param {string} [key] 键名后缀（可选，不传则删除基础名对应数据）
   */
  del = (key) => this.storage.removeItem(this.#getKey(key));

  /**
   * 模糊匹配存储中的 key 并执行回调
   * @param {string|RegExp} pattern - 匹配规则：字符串（包含匹配）或正则表达式
   * @param {Function} callback - 匹配到 key 后执行的回调
   */
  fuzzyHandle(pattern, callback) {
    const keys = Object.is(this.storage, localStorage) ? Object.keys(localStorage) : GM_listValues();
    const matcher = pattern instanceof RegExp ? (key) => pattern.test(key) : (key) => key.includes(pattern);
    keys.filter(matcher).forEach(callback);
  }

  /**
   * 清理所有实例的过期数据
   */
  static cleanExpired() {
    this.#instances.forEach((ins) => {
      ins.fuzzyHandle(ins.name, (key) => {
        if (ins.#get(key)?.expires < Date.now()) ins.storage.removeItem(key);
      });
    });
  }
}
