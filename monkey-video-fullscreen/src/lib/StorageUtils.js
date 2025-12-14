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
}

/**
 * 带后缀的存储项类，基于基础存储类扩展
 */
export class SuffixStorage extends StorageItem {
  static instances = [];

  constructor(name, defVal, useLocalStore, parser) {
    super(name, defVal, useLocalStore, parser);
  }

  set(suffix, value) {
    if (suffix == null) throw new Error("suffix 不能为空");
    super.set(value, this.name + suffix);
  }

  get(suffix = "") {
    return super.get(this.name + suffix);
  }

  del(suffix = "") {
    super.del(this.name + suffix);
  }
}
