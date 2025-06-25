/**
 * 判断给定节点是否为元素节点。
 *
 * @param node 要测试的节点
 * @return 布尔值，表示该节点是否为元素节点
 */
export function isElement(node) {
  return node instanceof Element;
}

/**
 * 判断给定节点是否为文档节点。
 *
 * @param node 要测试的节点
 * @return 布尔值，表示该节点是否为文档节点
 */
export function isDocument(node) {
  return node instanceof Document;
}

/**
 * 遍历给定节点，查找所有子元素中包含的 shadow root。
 *
 * @param node 要遍历的起始节点
 * @param deep 是否递归遍历 shadow root 内部
 * @yields 发现的 shadow root
 */
function* getShadowRoots(node, deep) {
  if (!node || (!isElement(node) && !isDocument(node))) return;

  if (isElement(node) && node.shadowRoot) {
    yield node.shadowRoot;
  }

  const doc = isDocument(node) ? node : node.getRootNode({ composed: true });
  if (!doc.createTreeWalker) return;

  const toWalk = [node];
  let currentNode = undefined;
  while ((currentNode = toWalk.pop())) {
    const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
      acceptNode: (node) => (isElement(node) && node.shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
    });

    let walkerNode = walker.nextNode();
    while (walkerNode) {
      if (isElement(walkerNode) && walkerNode.shadowRoot) {
        if (deep) {
          toWalk.push(walkerNode.shadowRoot);
        }
        yield walkerNode.shadowRoot;
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
 * @param subject 查询的起始节点，默认为 `document`
 * @return 找到的第一个匹配元素
 */
export function querySelector(selector, subject = document) {
  const immediate = subject.querySelector(selector);
  if (immediate) return immediate;

  const shadowRoots = [...getShadowRoots(subject, true)];
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
 * @param subject 查询的起始节点，默认为 `document`
 * @return 找到的所有匹配元素集合
 */
export function querySelectorAll(selector, subject = document) {
  const results = [...subject.querySelectorAll(selector)];
  const shadowRoots = [...getShadowRoots(subject, true)];
  for (const root of shadowRoots) {
    results.push(...root.querySelectorAll(selector));
  }
  return results;
}
