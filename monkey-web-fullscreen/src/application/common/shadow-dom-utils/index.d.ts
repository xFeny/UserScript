/**
 * Determines if a given node is an element or not.
 *
 * @param node Node to test
 * @return bool indicating whether the node is an element
 */
export declare function isElement(node: Node): node is Element;
/**
 * Determines if a given node is a document or not.
 *
 * @param node Node to test
 * @return bool indicating whether the node is document
 */
export declare function isDocument(node: Node): node is Document;
/**
 * Retrieves the host element of a given node, whether it be a
 * shadow root host or a document.
 *
 * @param node Node to retrieve host for
 * @return host element or document
 */
export declare function getHost(node: Node): Document | Element | null;
export interface QuerySelectorOptions {}
export declare function querySelector<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  subject?: Node & ParentNode,
  options?: Partial<QuerySelectorOptions>
): HTMLElementTagNameMap[K] | null;
export declare function querySelector<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  subject?: Node & ParentNode,
  options?: Partial<QuerySelectorOptions>
): SVGElementTagNameMap[K] | null;
export declare function querySelector<E extends Element = Element>(
  selectors: string | string[],
  subject?: Node & ParentNode,
  options?: Partial<QuerySelectorOptions>
): E | null;
export declare function querySelectorAll<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  subject?: Node & ParentNode,
  options?: Partial<QuerySelectorOptions>
): Array<HTMLElementTagNameMap[K]>;
export declare function querySelectorAll<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  subject?: Node & ParentNode,
  options?: Partial<QuerySelectorOptions>
): Array<SVGElementTagNameMap[K]>;
export declare function querySelectorAll<E extends Element = Element>(
  selectors: string | string[],
  subject?: Node & ParentNode,
  options?: Partial<QuerySelectorOptions>
): E[];
/**
 * Finds the element at a given point on the page, taking
 * shadow roots into account.
 *
 * @param x x-coordinate of the point
 * @param y y-coordinate of the point
 * @return Element found
 */
export declare function elementFromPoint(x: number, y: number): Element | null;

/**
 * 递归遍历DOM节点获取所有Shadow Root
 * @param node - 起始DOM节点
 * @param deep - 是否深度遍历，默认false
 * @returns 返回ShadowRoot的生成器
 */
export declare function getShadowRoots(node: Node | Document, deep?: boolean): Generator<ShadowRoot, void, unknown>;
