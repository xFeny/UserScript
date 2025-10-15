// ==UserScript==
// @name         DOM Query Tool
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @author       Feny
// @description  DOM查询增强，支持穿透Shadow DOM获取元素
// @license      MIT
// @run-at       document-start
// @grant        unsafeWindow
// @match        *://*/*
// ==/UserScript==

(function (window) {
  "use strict";

  const GMTools = {
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    isElement(node) {
      return node instanceof Element;
    },
    isDocument(node) {
      return node instanceof Document;
    },
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
    querySelector(selector, subject = document) {
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
    querySelectorAll(selector, subject = document) {
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
  };

  GMTools.hackAttachShadow();
  unsafeWindow.GMTools = window.GMTools = GMTools;
})(window);
