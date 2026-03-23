/**
 * 判断给定节点是否为元素节点。
 *
 * @param node 要测试的节点
 * @return 布尔值，表示该节点是否为元素节点
 */
export const isElement = (node) => node instanceof Element;

/**
 * 判断给定节点是否为文档节点。
 *
 * @param node 要测试的节点
 * @return 布尔值，表示该节点是否为文档节点
 */
export const isDocument = (node) => node instanceof Document;

/**
 * 获取节点的 ShadowRoot（影子根）
 * 优先从自定义属性_shadowRoot 获取，若不存在则从标准 shadowRoot 属性获取
 * @param {Element} node 要获取 ShadowRoot 的元素节点
 * @return {ShadowRoot|null} 元素的影子根，若不存在则返回 null
 */
export const getSRoot = (node) => node?._shadowRoot ?? node?.shadowRoot ?? null;

/**
 * 遍历给定节点，查找所有子元素中包含的 shadow root。
 *
 * @param root 要遍历的起始节点
 * @yields 发现的 shadow root
 */
export function* getShadowRoots(root) {
  if (!root || ![Element, Document, ShadowRoot].some((type) => root instanceof type)) return;

  // 使用 TreeWalker 高效遍历所有元素节点
  const acceptNode = (node) => (isElement(node) && getSRoot(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, { acceptNode }, false);

  let walkerNode;
  while ((walkerNode = walker.nextNode())) {
    if (walkerNode === root) continue; // 跳过根节点
    const sRoot = getSRoot(walkerNode);
    if (sRoot) {
      yield sRoot;
      yield* getShadowRoots(sRoot);
    }
  }
}

/**
 * 在给定节点的 DOM 中查询匹配的元素，遇到 shadow root 时会自动深入查询。
 *
 * @param selector 要查询的 CSS 选择器
 * @param ctx 查询的起始节点，默认为 `document`
 * @return 找到的第一个匹配元素
 */
export function querySelector(selector, ctx = document) {
  if (!ctx?.querySelector) return null;
  const direct = ctx.querySelector(selector);
  if (direct) return direct;

  for (const root of getShadowRoots(ctx)) {
    const match = root?.querySelector(selector);
    if (match) return match;
  }

  return null;
}

/**
 * 在给定节点的 DOM 中查询所有匹配的元素，遇到 shadow root 时会自动深入查询。
 *
 * @param selector 要查询的 CSS 选择器
 * @param ctx 查询的起始节点，默认为 `document`
 * @return 找到的所有匹配元素集合
 */
export function querySelectorAll(selector, ctx = document) {
  if (!ctx?.querySelectorAll) return [];
  const results = [...ctx.querySelectorAll(selector)];

  for (const root of getShadowRoots(ctx)) {
    if (root?.querySelectorAll) results.push(...root.querySelectorAll(selector));
  }

  return results;
}
