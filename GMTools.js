// ==UserScript==
// @name         DOM Query Tool
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @author       Feny
// @description  DOM 查询增强，支持穿透 Shadow DOM 获取元素
// @license      MIT
// @run-at       document-start
// @grant        unsafeWindow
// @match        *://*/*
// ==/UserScript==

(function (window) {
  "use strict";

  const EventTypes = {
    CLICK: "click",
    MOUSE_MOVE: "mousemove",
    MOUSE_OVER: "mouseover",
  };

  const GMTools = {
    EMPTY: "",
    /**
     * 计算字符串的哈希值（基于FNV-1a哈希算法的32位实现）
     * FNV（Fowler-Noll-Vo）哈希算法是一种非加密型哈希函数，适用于一般的哈希检索操作
     * @param {string} str - 要计算哈希值的字符串
     * @returns {number} 32位无符号整数哈希值
     */
    hashCode(str) {
      let hash = 0x811c9dc5;
      for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = (hash * 0x01000193) >>> 0; // 确保无符号32位整数运算
      }
      return hash;
    },
    /**
     * 判断字符串是否不包含数字
     * @param {string} str - 待检测的字符串
     * @returns {boolean} 不包含任何数字返回true，否则返回false
     */
    hasNoDigits: (str) => !/\d/.test(str),
    /**
     * 判断当前窗口是否为顶层窗口
     * @returns {boolean} 是顶层窗口返回true，否则返回false
     */
    isTopWin: () => window.top === window.self,
    /**
     * 从字符串中提取所有的数字
     * @param {string} str - 待提取数字的输入值
     * @returns {number[]} 提取到的数字数组（无数字或输入非字符串时返回空数组）
     */
    getNumbers: (str) => (typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : []),
    /**
     * 向指定窗口发送跨窗口消息（支持自定义消息来源标识）
     * @param {Window} win - 目标窗口对象（如iframe的contentWindow、父窗口等）
     * @param {Object} data - 要发送的消息数据（示例：{ action: 'play', episode: 5 }）
     * @param {string} [source="GM_MESSAGE"] - 消息来源标识（用于接收方验证消息合法性）
     */
    postMessage: (win, data, source = "GM_MESSAGE") => win?.postMessage({ source, ...data }, "*"),
    /**
     * 向页面中所有非空src的iframe发送消息
     * @param {Object} data - 要发送给iframe的消息数据（示例：{ action: 'play', episode: 5 }）
     * @param {string} source - 消息来源标识（可选，默认'GM_MESSAGE'）
     */
    sendToIFrames(data, source) {
      this.querys("iframe:not([src=''], [src='#'])").forEach((iframe) => this.postMessage(iframe?.contentWindow, data, source));
    },
    /**
     * 获取元素的矩形信息
     * @param {Element} el - 目标元素
     * @returns {DOMRect|null} 元素的边界矩形对象，元素不存在则返回null
     */
    getElementRect: (el) => el?.getBoundingClientRect(),
    /**
     * 异步等待指定毫秒数
     * @param {number} ms - 等待时间（毫秒）
     * @returns {Promise<void>} 等待完成的Promise
     */
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    /**
     * 保留小数位数，移除末尾多余的0
     * @param {number|string} value - 待格式化的值
     * @param {number} [digits=2] - 保留的小数位数
     * @returns {string} 格式化后的字符串
     */
    toFixed: (value, digits = 2) => (+value).toFixed(digits).replace(/\.?0+$/, ""),
    /**
     * 判断元素是否可见
     * @param {Element} el - 目标元素
     * @returns {boolean} 可见返回true，否则返回false
     */
    isVisible: (el) => !!(el?.offsetWidth || el?.offsetHeight || el?.getClientRects().length),
    /**
     * 阻止事件的默认行为及传播
     * @param {Event} event - 事件对象
     */
    preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
    /**
     * 判断元素是否包含指定类名中的任意一个
     * @param {Element} el - 目标元素
     * @param {...string|string[]} classes - 类名列表（支持数组嵌套）
     * @returns {boolean} 包含任意类名返回true，否则返回false
     */
    hasCls: (el, ...classes) => classes.flat().some((cls) => el?.classList.contains(cls)),
    /**
     * 从元素中移除指定类名
     * @param {Element} el - 目标元素
     * @param {...string} classes - 要移除的类名
     */
    delCls: (el, ...classes) => el?.classList.remove(...classes),
    /**
     * 向元素添加指定类名
     * @param {Element} el - 目标元素
     * @param {...string} classes - 要添加的类名
     */
    addCls: (el, ...classes) => el?.classList.add(...classes),
    isElement(node) {
      return node instanceof Element;
    },
    isDocument(node) {
      return node instanceof Document;
    },
    /**
     * 重写Element的attachShadow方法，用于监听ShadowRoot的创建
     * 为每个新创建的ShadowRoot触发"attached"事件，便于跟踪Shadow DOM
     */
    hackAttachShadow() {
      if (Element.prototype.__attachShadow__) return;
      Element.prototype.__attachShadow__ = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function (options) {
        if (this._shadowRoot) return this._shadowRoot;
        const shadowRoot = (this._shadowRoot = this.__attachShadow__.call(this, options));
        const shadowEvent = new CustomEvent("attached", { bubbles: true, detail: { shadowRoot } });
        document.dispatchEvent(shadowEvent);
        return shadowRoot;
      };

      Element.prototype.attachShadow.toString = () => Element.prototype.__attachShadow__.toString();
    },
    /**
     * 生成器：获取节点下所有ShadowRoot（支持深度遍历）
     * @param {Node} node - 起始节点（Element或Document）
     * @param {boolean} [deep=false] - 是否深度遍历子ShadowRoot
     * @yields {ShadowRoot} 遍历到的ShadowRoot对象
     */
    *getShadowRoots(node, deep = false) {
      if (!node || (!this.isElement(node) && !this.isDocument(node))) return;
      if (this.isElement(node) && node._shadowRoot) {
        yield node._shadowRoot;
      }
      const doc = this.isDocument(node) ? node : node.getRootNode({ composed: true });
      if (!doc.createTreeWalker) return;
      let currentNode;
      const toWalk = [node];
      while ((currentNode = toWalk.pop())) {
        const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
          acceptNode: (child) => (this.isElement(child) && child._shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
        });
        let walkerNode = walker.nextNode();
        while (walkerNode) {
          if (this.isElement(walkerNode) && walkerNode._shadowRoot) {
            if (deep) {
              toWalk.push(walkerNode._shadowRoot);
            }
            yield walkerNode._shadowRoot;
          }
          walkerNode = walker.nextNode();
        }
      }
      return;
    },
    /**
     * 增强版querySelector：支持查询普通DOM和Shadow DOM
     * @param {string} selector - CSS选择器
     * @param {Node} [subject=document] - 查询的起始节点（默认document）
     * @returns {Element|null} 匹配的第一个元素，无匹配返回null
     */
    query(selector, subject = document) {
      const immediate = subject.querySelector(selector);
      if (immediate) return immediate;
      const shadowRoots = [...this.getShadowRoots(subject, true)];
      for (const root of shadowRoots) {
        const match = root.querySelector(selector);
        if (match) return match;
      }
      return null;
    },
    /**
     * 增强版querySelectorAll：支持查询普通DOM和Shadow DOM
     * @param {string} selector - CSS选择器
     * @param {Node} [subject=document] - 查询的起始节点（默认document）
     * @returns {Element[]} 所有匹配的元素数组（去重）
     */
    querys(selector, subject = document) {
      const results = [...subject.querySelectorAll(selector)];
      const shadowRoots = [...this.getShadowRoots(subject, true)];
      for (const root of shadowRoots) {
        results.push(...root.querySelectorAll(selector));
      }
      return results;
    },
    /**
     * 创建 MutationObserver（DOM 变化监听器）
     * @param {Node|string} target - 监听目标（可传 Node 节点或 CSS 选择器字符串）
     * @param {Function} callback - DOM 变化时触发的回调函数（接收 mutationList 和 observer 参数）
     * @param {Object} [options] - 监听配置（如 attributes: true 表示监听属性变化，默认包含 childList 和 subtree）
     * @returns {MutationObserver} - 创建好的 MutationObserver 实例（需自行管理 disconnect）
     */
    createObserver(target, callback, options) {
      const observer = new MutationObserver(callback);
      target = target instanceof Element ? target : this.query(target);
      observer.observe(target, { childList: true, subtree: true, ...options });
      return observer;
    },
    /**
     * 安全处理 HTML 字符串
     * @param {string} htmlStr - 待处理的 HTML 字符串（如 "<div class='box'>内容</div>"）
     * @returns {string|TrustedHTML} - 安全的 HTML（支持 Trusted Types 则返回 TrustedHTML 对象，否则返回原字符串）
     */
    trustedHTML(htmlStr) {
      if (!window.trustedTypes?.createPolicy) return htmlStr;
      const policy = trustedTypes.defaultPolicy ?? trustedTypes.createPolicy("default", { createHTML: (input) => input });
      return policy.createHTML(htmlStr);
    },
    /**
     * 获取元素的所有祖先节点（包括可能的Shadow DOM宿主）
     * @param {Element} element - 目标元素
     * @param {boolean} [withSelf=false] - 是否包含元素自身
     * @param {number} [maxLevel=Infinity] - 最大遍历层级
     * @returns {Element[]} 祖先节点数组（从顶层到当前元素）
     */
    getParents(element, withSelf = false, maxLevel = Infinity) {
      const parents = withSelf && element ? [element] : [];
      for (let current = element, level = 0; current && level < maxLevel; level++) {
        current = current.parentNode instanceof ShadowRoot ? current?.getRootNode()?.host : current?.parentElement;
        current && parents.unshift(current);
      }
      return parents;
    },
    /**
     * 获取元素的父级链选择器（从元素自身到body的选择器路径）
     * @param {Element} element - 目标元素
     * @param {boolean} [nth=false] - 是否为同类型元素添加nth-of-type索引（用于区分同层级同标签元素）
     * @returns {string} 由 " > " 连接的选择器链字符串（如 "div.container > p#intro > span.highlight"）
     */
    getParentChain(element, nth = false) {
      const parents = [];
      for (let current = element; current && current !== document.body; current = current.parentElement) {
        parents.unshift(this.getTagInfo(current, nth));
        if (current.id && this.hasNoDigits(current.id)) break;
      }
      return parents.join(" > ");
    },
    /**
     * 获取单个元素的CSS选择器信息（优先使用ID，其次类名，最后标签名）
     * @param {Element} ele - 目标元素
     * @param {boolean} [nth=false] - 是否添加nth-of-type索引
     * @returns {string} 元素的CSS选择器字符串（如 "#username"、".nav-item"、"div:nth-of-type(2)"）
     */
    getTagInfo(ele, nth = false) {
      // id不是数字和中文
      if (ele.id && this.hasNoDigits(ele.id) && !/[\u4e00-\u9fa5]/.test(ele.id)) return `#${ele.id}`;
      let selector = ele.tagName.toLowerCase();
      const classes = Array.from(ele.classList);

      // 处理类选择器
      if (classes.length) {
        const validClasses = classes.filter(this.hasNoDigits, this);
        selector += /[:[\]]/.test(ele.className)
          ? `[class="${ele.className}"]`
          : validClasses.length
          ? `.${validClasses.join(".")}`
          : this.EMPTY;
      }

      // 非首个同类型元素添加nth-of-type
      if (nth && ele.parentElement) {
        const siblings = Array.from(ele.parentElement.children).filter((sib) => sib.tagName === ele.tagName);
        const index = siblings.indexOf(ele);
        if (index > 0) selector += `:nth-of-type(${index + 1})`;
      }

      return selector;
    },
    /**
     * 查找元素的最近匹配祖先
     * @param {Element} element - 目标元素
     * @param {string} selector - CSS选择器
     * @param {number} [maxLevel=3] - 最大查找层级
     * @returns {Element|null} 匹配的最近祖先，无匹配返回null
     */
    closest(element, selector, maxLevel = 3) {
      for (let level = 0; element && level < maxLevel; level++, element = element.parentElement) {
        if (element.matches(selector)) return element;
      }
      return null;
    },
    /**
     * 通过 XPath 查找元素，支持文本内容或属性值匹配
     * @param {'text'|'attr'} mode - 匹配模式：'text' 匹配文本内容，'attr' 匹配任意属性
     * @param {...string|string[]} texts - 要匹配的文本（可嵌套数组）
     * @returns {Element[]} 匹配的元素数组
     */
    findByText(mode, ...texts) {
      const flatTexts = texts.flat();
      const expr = Object.is(mode, "text")
        ? `.//*[${flatTexts.map((t) => `contains(text(), '${t.replace(/'/g, "\\'")}')`).join(" or ")}]`
        : `.//*[${flatTexts.map((t) => `@*[contains(., '${t.replace(/'/g, "\\'")}')]`).join(" or ")}]`;
      const nodes = document.evaluate(expr, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      return Array.from({ length: nodes.snapshotLength }, (_, i) => nodes.snapshotItem(i)).filter((el) => !el.matches("script"));
    },
    /**
     * 获取元素的中心点坐标
     * @param {Element} element - 目标元素
     * @returns {Object} 包含centerX和centerY的坐标对象
     */
    getCenterPoint(element) {
      if (!element) return { centerX: 0, centerY: 0 };
      const { top, left, width, height } = this.getElementRect(element);
      return { centerX: left + width / 2, centerY: top + height / 2 }; // 元素中心点
    },
    /**
     * 判断坐标点是否在元素内部
     * @param {number} pointX - 点的X坐标
     * @param {number} pointY - 点的Y坐标
     * @param {Element} element - 目标元素
     * @returns {boolean} 点在元素内返回true，否则返回false
     */
    pointInElement(pointX, pointY, element) {
      if (!element) return false;
      const { top, left, right, bottom } = this.getElementRect(element);
      return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom;
    },
    /**
     * 触发元素的鼠标移动事件
     * @param {Element} element - 目标元素
     */
    triggerMousemove(element) {
      const { centerX, centerY } = this.getCenterPoint(element);
      for (let y = 0; y < centerY; y += 10) this.dispatchMouseEvent(element, EventTypes.MOUSE_MOVE, centerX, y);
    },
    /**
     * 触发元素的鼠标悬停事件
     * @param {Element} element - 目标元素
     */
    triggerMouseHover(element) {
      const { centerX, centerY } = this.getCenterPoint(element);
      this.dispatchMouseEvent(element, EventTypes.MOUSE_OVER, centerX, centerY);
    },
    /**
     * 向元素派发鼠标事件
     * @param {Element} element - 目标元素
     * @param {string} eventType - 事件类型（如'mousemove'、'click'）
     * @param {number} clientX - 鼠标X坐标
     * @param {number} clientY - 鼠标Y坐标
     */
    dispatchMouseEvent(element, eventType, clientX, clientY) {
      const dict = { clientX, clientY, bubbles: true };
      element?.dispatchEvent(new MouseEvent(eventType, dict));
    },
    freqTimes: new Map(),
    /**
     * 判断操作是否过于频繁（防抖/节流）
     * @param {string} [key="default"] - 操作标识
     * @param {number} [gap=300] - 时间间隔（毫秒）
     * @param {boolean} [isThrottle=false] - 是否启用节流模式（true为节流，false为防抖）
     * @returns {boolean} 防抖模式：过于频繁返回true；节流模式：不执行返回true
     */
    isFrequent(key = "default", gap = 300, isThrottle = false) {
      const now = Date.now();
      const last = this.freqTimes.get(key) ?? 0;
      const delta = now - last;

      // 限制模式：返回是否过于频繁
      if (!isThrottle) return this.freqTimes.set(key, now) && delta < gap;

      // 节流模式：间隔满足时执行一次
      return delta >= gap ? this.freqTimes.set(key, now) && false : true;
    },
    limitCountMap: new Map(),
    /**
     * 判断操作是否超过次数限制
     * @param {string} [key="default"] - 操作标识
     * @param {number} [maxCount=5] - 最大允许次数
     * @returns {boolean} 超过限制返回true，否则返回false
     */
    isOverLimit(key = "default", maxCount = 5) {
      const count = this.limitCountMap.get(key) ?? 0;
      if (count < maxCount) return this.limitCountMap.set(key, count + 1) && false;
      return true;
    },
    /**
     * 重置指定操作的次数计数器
     * @param {string} [key="default"] - 操作标识
     */
    resetLimitCounter(key = "default") {
      this.limitCountMap.set(key, 0);
    },
  };

  GMTools.hackAttachShadow();
  typeof unsafeWindow !== "undefined" && (unsafeWindow.GMTools = GMTools);
  window.GMTools = GMTools;
})(window);
