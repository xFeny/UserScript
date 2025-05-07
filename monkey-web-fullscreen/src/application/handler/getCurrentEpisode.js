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
  function querys(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
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
    let currLevel = 0;
    while (element && currLevel < maxLevel) {
      if (element.matches(selector)) return element;
      element = element.parentElement;
      currLevel++;
    }
    return null;
  }
  /** 是否有同级元素 */
  function haveSiblings(element) {
    return element.parentElement.children.length > 1;
  }

  function getEpisodeContainer(element) {
    //  当前集相对所有集所在的标签
    while (element) {
      const tagName = element.tagName;
      const parentEle = element.parentElement;
      const haveSib = haveSiblings(element);
      const hasEqualsTag = querys(tagName, parentEle).find((el) => el !== element);
      if (haveSib && hasEqualsTag) return element;
      element = parentEle;
    }
    return element;
  }

  function getCurrentEpisode() {
    const ele = getCurrentEpisodeLinkElement();
    console.log("当前集的<a>标签：", ele);
    return getEpisodeContainer(ele);
  }

  function getCurrentEpisodeLinkElement() {
    const href = location.href;
    const path = location.pathname;
    const lastPath = path.substring(path.lastIndexOf("/") + 1);
    const links = querys(`:is(a[href*="${path}"], a[href*="${lastPath}"])`);
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
      "[class*='play-channel']",
    ];
    return links.find((link) => {
      const linkUrl = new URL(link.href);
      if (closest(link, `:is(${filter})`, 5)) return false; // 过滤：历史记录、路线
      if (!Object.is(href, link.href) && !Object.is(path, linkUrl.pathname)) return false; // URL不匹配
      return !!getEpisodeNumber(link);
    });
  }

  function getPrevEpisode(element) {
    return getEpisodeNumberContainer(element, true);
  }

  function getNextEpisode(element) {
    return getEpisodeNumberContainer(element);
  }

  function getEpisodeNumberContainer(element, isPrev = false) {
    if (!element) return;
    const currNumber = getEpisodeNumber(element);
    const episodes = getAllEpisodeElement(element);
    if (episodes.length <= 1) return null;
    const numbers = episodes.map(getEpisodeNumber);
    const index = episodes.indexOf(element);
    const prev = episodes[index - 1];
    const next = episodes[index + 1];
    const { leftSmall, rightLarge } = compareLeftRight(numbers, currNumber, index);
    if (leftSmall || rightLarge) return isPrev ? prev : next; // 剧集是正序：[1, 2, 3, 4, 5]
    return isPrev ? next : prev; // 剧集是倒序：[5, 4, 3, 2, 1]
  }

  function compareLeftRight(numbers, compareNumber, index) {
    const leftSmall = numbers.findIndex((val, i) => i < index && val < compareNumber) > -1;
    const rightLarge = numbers.findIndex((val, i) => i > index && val > compareNumber) > -1;
    return { leftSmall, rightLarge };
  }

  function getAllEpisodeElement(element) {
    const eleName = element.tagName;
    const eleClass = Array.from(element.classList);
    const sibling = findSiblingInParent(element, eleName);
    const children = Array.from(sibling?.parentElement.children);
    return children.filter((ele) => {
      const currClass = Array.from(ele.classList);
      const haveSomeClass = eleClass.some((value) => currClass.includes(value));
      if (!!currClass.length && !haveSomeClass) return false;
      return ele.tagName === eleName;
    });
  }

  function findSiblingInParent(element, selector, maxLevel = 3) {
    let currLevel = 0;
    let currParent = element.parentElement;
    while (currParent && currLevel < maxLevel) {
      const sibs = currParent.children;
      for (let sib of sibs) {
        if (sib !== element && sib.matches(selector)) return sib;
      }
      currParent = currParent.parentElement;
      currLevel++;
    }
    return null;
  }

  const currEpisode = getCurrentEpisode();
  const allEpisode = getAllEpisodeElement(currEpisode);
  const prevEpisode = getPrevEpisode(currEpisode);
  const nextEpisode = getNextEpisode(currEpisode);

  console.log("当前集元素：", currEpisode);
  console.log("所有剧集元素：", allEpisode);
  console.log("上集的元素：", prevEpisode);
  console.log("下集的元素：", nextEpisode);
})();
