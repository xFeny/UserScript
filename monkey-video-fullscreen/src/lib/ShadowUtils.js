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
 * @param node 要遍历的起始节点
 * @param deep 是否递归遍历 shadow root 内部
 * @yields 发现的 shadow root
 */
export function* getShadowRoots(node, deep = false) {
  if (!node || (!isElement(node) && !isDocument(node))) return;

  if (isElement(node) && getSRoot(node)) yield getSRoot(node);

  const doc = isDocument(node) ? node : node.getRootNode({ composed: true });
  if (!doc.createTreeWalker) return;

  let currentNode;
  const toWalk = [node];
  while ((currentNode = toWalk.pop())) {
    const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
      acceptNode: (child) => (isElement(child) && getSRoot(child) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
    });

    let walkerNode = walker.nextNode();
    while (walkerNode) {
      const shadowRoot = getSRoot(walkerNode);
      if (isElement(walkerNode) && shadowRoot) {
        if (deep) toWalk.push(shadowRoot);
        yield shadowRoot;
      }
      walkerNode = walker.nextNode();
    }
  }

  return;
}

/**
 * 在给定节点的 DOM 中查询匹配的元素，遇到 shadow root 时会自动深入查询。
 *
 * @param selector 要查询的 CSS 选择器
 * @param ctx 查询的起始节点，默认为 `document`
 * @return 找到的第一个匹配元素
 */
export function querySelector(selector, ctx = document) {
  const direct = ctx.querySelector(selector);
  if (direct) return direct;

  const shadowRoots = [...getShadowRoots(ctx, true)];
  for (const root of shadowRoots) {
    const match = root.querySelector(selector);
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
  const results = [...ctx.querySelectorAll(selector)];
  const shadowRoots = [...getShadowRoots(ctx, true)];
  for (const root of shadowRoots) {
    results.push(...root.querySelectorAll(selector));
  }
  return results;
}
