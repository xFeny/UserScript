/**
 * 基础存储项类，提供通用的存储操作
 */
export class StorageItem {
  constructor(name, defVal, useLocalStore = false, parser = (v) => v) {
    this.name = name;
    this.defVal = defVal;
    this.parser = parser;
    this.storage = useLocalStore ? localStorage : { getItem: GM_getValue, setItem: GM_setValue, removeItem: GM_deleteValue };
  }

  set(value, key = this.name) {
    this.storage.setItem(key, value);
  }

  get(key = this.name) {
    const value = this.storage.getItem(key);
    try {
      return this.parser(JSON.parse(value) ?? this.defVal);
    } catch {
      return this.parser(value ?? this.defVal);
    }
  }

  del(key = this.name) {
    this.storage.removeItem(key);
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
}

/**
 * 带过期时间的存储类（继承自基础存储类）
 * 1. 支持为存储值设置过期时间（按天计算）
 * 2. 全局唯一的过期数据清理逻辑（仅首次创建实例时触发）
 */
export class TimedStorage extends StorageItem {
  static instances = [];

  constructor(name, defVal, useLocalStore, parser) {
    super(name, defVal, useLocalStore, parser);

    TimedStorage.instances.push(this);
    if (TimedStorage.instances.length === 1) requestIdleCallback(() => TimedStorage.cleanExpired());
  }

  set(suffix, value, expires) {
    if (suffix == null) throw new Error("suffix 不能为空");
    const val = expires ? JSON.stringify({ value, expires: Date.now() + expires * 864e5 }) : value;
    super.set(val, this.name + suffix);
  }

  get(suffix = "") {
    const data = super.get(this.name + suffix);
    return !data?.value ? data : data.expires > Date.now() ? data.value : this.defVal;
  }

  del(suffix = "") {
    super.del(this.name + suffix);
  }

  static cleanExpired() {
    // 清理每个实例对应的过期数据
    this.instances.forEach((instance) => {
      instance.fuzzyHandle(instance.name, (key) => {
        // 调用父类get方法获取原始数据
        const data = StorageItem.prototype.get.call(instance, key);
        if (data?.expires && data.expires < Date.now()) {
          StorageItem.prototype.del.call(instance, key);
        }
      });
    });
  }
}
