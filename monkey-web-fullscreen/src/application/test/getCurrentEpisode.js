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

  function hasAnyClass(element, ...classes) {
    return classes.flat().some((cls) => element.classList.contains(cls));
  }

  /** 提取字符串中的数字 */
  function extractNumbers(str) {
    return typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : [];
  }

  /** 获取集数 */
  function getEpisodeNumber(element) {
    return extractNumbers(element?.innerText?.replace(/-/g, ""))?.shift();
  }

  /** 向上查找元素 */
  function closest(element, selector, maxLevel = 3) {
    for (let level = 0; element && level < maxLevel; level++, element = element.parentElement) {
      if (element.matches(selector)) return element;
    }
    return null;
  }

  function getEpisodeWrapper(element) {
    //  当前集相对所有集所在的标签
    while (element && element.parentElement) {
      const siblings = Array.from(element.parentElement.children);
      if (siblings.length > 1 && siblings.some((sib) => sib !== element && sib.tagName === element.tagName)) return element;
      element = element.parentElement;
    }
    return null;
  }

  function getCurrentEpisode() {
    return getCurrentEpisodeLinkElement();
  }

  function getCurrentEpisodeLinkElement() {
    const { pathname, search } = location;
    const last = pathname.split("/").pop();
    const links = querys(`:is(a[href*="${pathname + search}"], a[href*="${last}"], a[href*="${search}"])`);
    console.log("匹配到所有的链接：", links);
    return links.length <= 1 ? getEpisodeWrapper(links[0]) : findCurrentEpisodeElement(links, pathname + search);
  }

  function findCurrentEpisodeElement(eles, pageUrl) {
    // 过滤： 标题、线路、排行、热门、猜你喜欢、推荐、历史记录
    // https://www.yingshikong1.com、https://www.dyttlg1.com
    const filter = [
      "h1, header, footer",
      "[class*='rank'], [class*='hotlist'], [class*='vodlist']",
      "[id*='guankan'], [id*='history' i], [class*='history' i], [class*='record'], [class*='lishi']",
    ];
    eles = eles
      .filter((el) => {
        const { pathname, search } = new URL(el.href);
        return !closest(el, `:is(${filter})`, 5) && pageUrl.includes(pathname + search);
      })
      .map(getEpisodeWrapper)
      .filter((el) => getAllEpisodes(el)?.map(getEpisodeNumber).filter(Boolean).length > 1);

    console.log("过滤后连接：", eles);
    return eles.length <= 1 ? eles.shift() : eles.find((el) => hasAnyClass(el, "cur", "active") || !!getEpisodeNumber(el));
  }

  function getTargetEpisode(element, isPrev = false) {
    if (!element) return;
    const episodes = getAllEpisodes(element);
    const numbers = episodes.map(getEpisodeNumber).filter(Boolean);
    if (numbers.length === 0) return;

    const index = episodes.indexOf(element);
    const currNumber = getEpisodeNumber(element);
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

  function getAllEpisodes(element) {
    if (!element) return;
    const numSet = new Set();
    const eleName = element.tagName;
    const eleClass = Array.from(element.classList);
    const sibling = findSibling(element, eleName);
    const children = Array.from(sibling?.parentElement.children);
    return children.filter((ele) => {
      const num = getEpisodeNumber(ele);
      const currClass = Array.from(ele.classList).filter((cls) => !["on", "cur", "active"].includes(cls));
      const hasSameClass = eleClass.some((value) => currClass.includes(value));
      const isMatch = currClass.length ? hasSameClass : ele.tagName === eleName;
      if (!isMatch || !num || numSet.has(num)) return false;
      return numSet.add(num); // 过滤重复的集数
    });
  }

  function findSibling(element, selector, maxLevel = 3) {
    for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      for (const child of parent.children) {
        if (child !== element && child.matches(selector)) return child;
      }
    }
    return null;
  }

  const currEpisode = getCurrentEpisode();
  console.log("当前集元素：", currEpisode);
  console.log("所有剧集元素：", getAllEpisodes(currEpisode));
  console.log("上集的元素：", getTargetEpisode(currEpisode, true));
  console.log("下集的元素：", getTargetEpisode(currEpisode));
})();
