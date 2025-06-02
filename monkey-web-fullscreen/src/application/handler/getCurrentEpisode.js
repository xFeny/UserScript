/**
 * 用于在浏览器控制栏验证是否能成功获取剧集元素标签
 * 测试网址
 * https://www.mxdm6.com
 * https://www.dmb0u.art
 * https://www.agefans.la
 * https://www.nak9cet6m.wiki
 * https://gqc7.top
 * https://www.a8ys.vip/
 * https://www.vv3nwjk.com
 * https://www.dandanju.tv/
 * https://kpw.my/
 */

(function () {
  function querys(selector, context) {
    return Array.from((context ?? document).querySelectorAll(selector));
  }

  /** 提取字符串中的数字 */
  function extractNumbers(str) {
    const numbers = str.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
  }

  /** 获取集数 */
  function getEpisodeNumber(element) {
    return extractNumbers(element?.innerText?.replace(/-/g, "")).join("");
  }

  /** 向上查找元素 */
  function closest(element, selector, maxLevel = 3) {
    for (let level = 0; element && level < maxLevel; level++, element = element.parentElement) {
      if (element.matches(selector)) return console.log(element), element;
    }
    return null;
  }

  function getEpisodeContainer(element) {
    //  当前集相对所有集所在的标签
    while (element && element.parentElement) {
      const siblings = Array.from(element.parentElement.children);
      if (siblings.length > 1 && siblings.some((sib) => sib !== element && sib.tagName === element.tagName)) return element;
      element = element.parentElement;
    }
    return null;
  }

  function getCurrentEpisode() {
    const ele = getCurrentEpisodeLinkElement();
    console.log("当前集的<a>标签：", ele);
    return getEpisodeContainer(ele);
  }

  function getCurrentEpisodeLinkElement() {
    const { pathname, search } = location;
    const last = pathname.split("/").pop();
    const links = querys(`:is(a[href*="${pathname + search}"], a[href*="${last}"], a[href*="${search}"])`);
    console.log("匹配到所有的链接：", links);
    return links.length == 1 ? links.shift() : findCurrentEpisodeElement(links, pathname + search);
  }

  function findCurrentEpisodeElement(links, pageUrl) {
    // 过滤：历史记录、标题、线路(tab-item、play-channel)
    const filter = [
      "h1",
      "header",
      "[id*='history']",
      "[id*='guankan']",
      "[class*='lishi']",
      "[class*='record']",
      "[class*='history']",
      "[class*='tab-item']",
      "[class*='play-channel']",
    ];
    links = links.filter((link) => {
      const { pathname, search } = new URL(link.href);
      return !closest(link, `:is(${filter})`, 5) && pageUrl.includes(pathname + search);
    });
    console.log("过滤后连接：", links);
    return links.length == 1 ? links.shift() : links.find((link) => !!getEpisodeNumber(link));
  }

  function getTargetEpisodeContainer(element, isPrev = false) {
    if (!element) return;
    const currNumber = getEpisodeNumber(element);
    const episodes = getAllEpisodeElement(element);
    const numbers = episodes.map(getEpisodeNumber);
    const index = episodes.indexOf(element);
    const { leftSmall, rightLarge } = compareLeftRight(numbers, currNumber, index);
    console.log("左小", leftSmall, "右大", rightLarge);
    // 当 leftSmall || rightLarge 的结果与 isPrev 的布尔值相同时，返回 prev，当两者不同时，返回 next。
    return (leftSmall || rightLarge) === isPrev ? episodes[index - 1] : episodes[index + 1];
  }

  function compareLeftRight(numbers, compareNumber = 0, index) {
    return {
      leftSmall: numbers.some((val, i) => i < index && val < compareNumber),
      rightLarge: numbers.some((val, i) => i > index && val > compareNumber),
    };
  }

  function getAllEpisodeElement(element) {
    if (!element) return;
    const eleName = element.tagName;
    const eleClass = Array.from(element.classList);
    const sibling = findSiblingInParent(element, eleName);
    const children = Array.from(sibling?.parentElement.children);
    return children.filter((ele) => {
      const currClass = Array.from(ele.classList);
      const hasSameClass = eleClass.some((value) => currClass.includes(value));
      return currClass.length ? hasSameClass : ele.tagName === eleName;
    });
  }

  function findSiblingInParent(element, selector, maxLevel = 3) {
    for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      for (const child of parent.children) {
        if (child !== element && child.matches(selector)) return child;
      }
    }
    return null;
  }

  console.log("当前集元素：", (currEpisode = getCurrentEpisode()));
  console.log("所有剧集元素：", getAllEpisodeElement(currEpisode));
  console.log("上集的元素：", getTargetEpisodeContainer(currEpisode, true));
  console.log("下集的元素：", getTargetEpisodeContainer(currEpisode));
})();
