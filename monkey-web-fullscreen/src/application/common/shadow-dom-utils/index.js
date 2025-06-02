/**
 * Determines if a given node is an element or not.
 *
 * @param node Node to test
 * @return bool indicating whether the node is an element
 */
export function isElement(node) {
    return node instanceof Element;
}
/**
 * Determines if a given node is a document or not.
 *
 * @param node Node to test
 * @return bool indicating whether the node is document
 */
export function isDocument(node) {
    return node instanceof Document;
}
/**
 * Retrieves the host element of a given node, whether it be a
 * shadow root host or a document.
 *
 * @param node Node to retrieve host for
 * @return host element or document
 */
export function getHost(node) {
    const root = node.getRootNode();
    if (root instanceof DocumentFragment) {
        const rootAsShadow = root;
        return rootAsShadow?.host ?? null;
    }
    if (root instanceof Document) {
        return root;
    }
    return null;
}
/*
 * .foo .bar
 * [.foo, .bar]
 *
 * .foo > .bar .baz
 * [.foo > .bar, .baz]
 */
/**
 * Traverses a given node in order to find all available shadow roots
 * contained within child elements.
 *
 * @param node Node to traverse from
 * @param deep Whether to traverse recursively into shadow roots or not
 * @yields Discovered shadow root
 */
function* getShadowRoots(node, deep) {
    if (!isElement(node) && !isDocument(node)) {
        return;
    }
    const doc = isDocument(node)
        ? node
        : node.getRootNode({ composed: true });
    if (isElement(node) && node.shadowRoot) {
        yield node.shadowRoot;
    }
    const toWalk = [node];
    let currentNode = undefined;
    while ((currentNode = toWalk.pop())) {
        const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
            acceptNode(node) {
                // we only care about nodes which have a shadow root
                if (isElement(node) && node.shadowRoot) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                // we skip other nodes, but continue to traverse their children
                return NodeFilter.FILTER_SKIP;
            }
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
 * Attempts to find an element across shadow boundaries
 * by the given selector.
 *
 * @param selector Selector to query for
 * @param [subject] Subject to query relative to
 * @return element found
 */
function queryCrossBoundary(selector, subject = document) {
    const immediate = subject.querySelector(selector);
    if (immediate) {
        return immediate;
    }
    const shadowRoots = [...getShadowRoots(subject, true)];
    for (const root of shadowRoots) {
        const child = root.querySelector(selector);
        if (child) {
            return child;
        }
    }
    return null;
}
/**
 * Attempts to find an element across shadow boundaries
 * by the given selector.
 *
 * @param selector Selector to query for
 * @param [subject] Subject to query relative to
 * @return elements found
 */
function queryAllCrossBoundary(selector, subject = document) {
    const results = [...subject.querySelectorAll(selector)];
    const shadowRoots = [...getShadowRoots(subject, true)];
    for (const root of shadowRoots) {
        const children = root.querySelectorAll(selector);
        for (const child of children) {
            results.push(child);
        }
    }
    return results;
}
/**
 * Queries the DOM for a matching element from a given node, traversing
 * into shadow roots when they are encountereed.
 *
 * @param selectors CSS selector to query for
 * @param [subject] Subject to query relative to, defauling to `document`
 * @param [options] Options for fine-tuning querying
 * @return First matching element found
 */
export function querySelector(selectors, subject = document, _options) {
    const selectorList = Array.isArray(selectors) ? selectors : [selectors];
    if (selectorList.length === 0) {
        return null;
    }
    let currentSubjects = [subject];
    let result = null;
    for (const selector of selectorList) {
        const newSubjects = [];
        for (const currentSubject of currentSubjects) {
            const child = queryCrossBoundary(selector, currentSubject);
            if (child) {
                result = child;
                newSubjects.push(child);
            }
        }
        if (newSubjects.length === 0) {
            return null;
        }
        currentSubjects = newSubjects;
    }
    return result;
}
/**
 * Queries the DOM for all matching elements from a given node, traversing
 * into shadow roots when they are encountereed.
 *
 * @param selectors CSS selector to query for
 * @param [subject] Subject to query relative to, defaulting to `document`
 * @param [_options] Options for fine-tuning querying
 * @return Set of matching elements found
 */
export function querySelectorAll(selectors, subject = document, _options) {
    const selectorList = Array.isArray(selectors) ? selectors : [selectors];
    if (selectorList.length === 0) {
        return [];
    }
    let currentSubjects = [subject];
    let results = [];
    for (const selector of selectorList) {
        const newSubjects = [];
        for (const currentSubject of currentSubjects) {
            const children = queryAllCrossBoundary(selector, currentSubject);
            for (const child of children) {
                newSubjects.push(child);
            }
        }
        if (newSubjects.length === 0) {
            return [];
        }
        currentSubjects = newSubjects;
        results = newSubjects;
    }
    return results;
}
/**
 * Finds the element at a given point on the page, taking
 * shadow roots into account.
 *
 * @param x x-coordinate of the point
 * @param y y-coordinate of the point
 * @return Element found
 */
export function elementFromPoint(x, y) {
    let node = document.elementFromPoint(x, y);
    let child = node?.shadowRoot?.elementFromPoint(x, y);
    while (child && child !== node) {
        node = child;
        child = node?.shadowRoot?.elementFromPoint(x, y);
    }
    return child ?? node;
}
