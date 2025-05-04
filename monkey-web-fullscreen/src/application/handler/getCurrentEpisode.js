/**
 * 用于在浏览器控制栏验证是否能成功获取当前集元素标签
 * 测试网址
 * https://www.mxdm6.com
 * https://www.dmb0u.art
 * https://www.agefans.la
 * https://www.nak9cet6m.wiki
 * https://gqc7.top
 * https://www.a8ys.vip/
 * https://www.vv3nwjk.com
 * https://www.dandanju.tv/
 */

(function () {
  function index(element) {
    if (!element) return;
    const parentEle = element.parentElement;
    if (!parentEle) return -1;
    const children = Array.from(parentEle.children);
    return children.indexOf(element);
  }

  /** 提取字符串中的数字 */
  function extractNumbers(str) {
    const numbers = str.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
  }
  /** 获取集数 */
  function getEpisodeNumber(element) {
    return extractNumbers(element.innerText).shift();
  }
  /** 向上查找元素 */
  function closest(element, selector, maxLevel = 3) {
    let curLevel = 0;
    while (element && curLevel < maxLevel) {
      if (element.matches(selector)) return element;
      element = element.parentElement;
      curLevel++;
    }
    return null;
  }
  /** 是否有同级元素 */
  function hasSiblings(element) {
    return element.parentElement.children.length > 1;
  }

  function getCurrentEpisodeContainer(element) {
    //  当前集相对所有集所在的标签
    while (element) {
      const tagName = element.tagName;
      const parentEle = element.parentElement;
      const hasLink = parentEle.querySelectorAll(tagName).filter((el) => el !== element);
      const hasSib = hasSiblings(element);
      const nextTagName = element?.nextElementSibling?.tagName;
      if (hasSib && nextTagName === tagName && !!hasLink.length) return element;
      element = parentEle;
    }
    return element;
  }

  function getCurrentEpisode() {
    const ele = getCurrentEpisodeLinkElement();
    console.log("当前集的<a>标签：", ele);
    return getCurrentEpisodeContainer(ele);
  }

  function getCurrentEpisodeLinkElement() {
    const href = location.href;
    const path = location.pathname;
    const lastPath = path.substring(path.lastIndexOf("/") + 1);
    const links = Array.from(document.querySelectorAll(`:is(a[href*="${path}"], a[href*="${lastPath}"])`));
    console.log("匹配到所有的链接：", links);
    if (links.length == 1) return links.shift();

    const filter = [
      "h1",
      "header",
      "[id*='history']",
      "[class*='lishi']",
      "[class*='record']",
      "[class*='history']",
      "[class*='tab-item']",
    ];
    return links.find((link) => {
      const linkUrl = new URL(link.href);
      if (closest(link, `:is(${filter})`, 5)) return false; // 过滤：历史记录、路线
      if (!Object.is(href, link.href) && !Object.is(path, linkUrl.pathname)) return false; // URL不匹配
      return !!getEpisodeNumber(link);
    });
  }

  function getNextEpisode(element) {
    return getEpisodeNumberContainer(element);
  }

  function getEpisodeNumberContainer(element, isPrev = false) {
    const curIndex = index(element);
    const allEpisode = getAllEpisodeElement(element);
    return isPrev ? allEpisode[curIndex - 1] : allEpisode[curIndex + 1];
  }

  function getAllEpisodeElement(element) {
    const tagName = element.tagName;
    const sibling = findSiblingInParent(element, tagName);
    const children = Array.from(sibling.parentElement.children);
    return children.filter((ele) => ele.tagName === tagName);
  }

  function findSiblingInParent(element, selector, maxLevel = 3) {
    let curLevel = 0;
    let curParent = element.parentElement;
    while (curParent && curLevel < maxLevel) {
      const sibs = curParent.children;
      for (let sib of sibs) {
        if (sib !== element && sib.matches(selector)) return sib;
      }
      curParent = curParent.parentElement;
      curLevel++;
    }
    return null;
  }
  const currentEpisode = getCurrentEpisode();
  const nextEpisode = getNextEpisode(currentEpisode);
  console.log("当前集元素：", currentEpisode);
  console.log("下一集的元素：", nextEpisode);
})();
