import Tools from "../common/Tools";
import Storage from "../common/Storage";
import Constants from "../common/Constants";
const { RELATIVE_EPISODE_SELECTOR: RE_SELECTOR } = Storage;

/**
 * 通用性切换视频下集
 */
export default {
  switchEpisode(isPrev = false) {
    const currEpisode = this.getCurrentEpisode() ?? this.getCurrentEpisodeFromAllLink();
    // Tools.log("当前集元素：", currEpisode);
    const targetEpisode = this.getTargetEpisodeContainer(currEpisode, isPrev);
    // Tools.log("跳转集元素：", targetEpisode);
    this.jumpToTargetEpisode(targetEpisode);
  },
  getCurrentEpisode() {
    return RE_SELECTOR.get(location.host) ? this.getCurrentEpisodeBySelector() : this.getCurrentEpisodeLinkElement();
  },
  getCurrentEpisodeLinkElement() {
    const { pathname, search } = location;
    const last = pathname.split("/").pop();
    const links = Tools.querys(`:is(a[href*="${pathname + search}"], a[href*="${last}"], a[href*="${search}"])`);
    // Tools.log("匹配到所有的链接：", links);
    return links.length <= 1 ? links.shift() : this.findCurrentEpisodeElement(links, pathname + search);
  },
  findCurrentEpisodeElement(eles, pageUrl) {
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
    eles = eles
      .filter((el) => {
        const { pathname, search } = new URL(el.href);
        return !Tools.closest(el, `:is(${filter})`, 5) && pageUrl.includes(pathname + search);
      })
      .map(this.getEpisodeContainer)
      .reverse();
    // Tools.log("过滤后连接：", links);
    return eles.length <= 1 ? eles.shift() : eles.find((el) => el.classList.contains("active") || !!this.getEpisodeNumber(el));
  },
  getEpisodeNumber: (ele) => Tools.getNumbers(ele?.innerText?.replace(/-/g, ""))?.shift(),
  getTargetEpisodeContainer(element, isPrev = false) {
    if (!element) return;
    const currNumber = this.getEpisodeNumber(element);
    const episodes = this.getAllEpisodeElement(element);
    // Tools.log("所有剧集元素", episodes);

    const index = episodes.indexOf(element);
    const numbers = episodes.map(this.getEpisodeNumber);
    const { leftSmall, rightLarge } = this.compareLeftRight(numbers, currNumber, index);

    // 数字左小右大为正序，反之为倒序
    // 当 leftSmall || rightLarge 的结果与 isPrev 的布尔值相同时，返回 prev，当两者不同时，返回 next。
    return (leftSmall || rightLarge) === isPrev ? episodes[index - 1] : episodes[index + 1];
  },
  compareLeftRight: (numbers, compareNumber = 0, index) => ({
    leftSmall: numbers.some((val, i) => i < index && val < compareNumber),
    rightLarge: numbers.some((val, i) => i > index && val > compareNumber),
  }),
  getAllEpisodeElement(element) {
    if (!element) return [];
    const eleName = element.tagName;
    const eleClass = Array.from(element.classList);
    const sibling = Tools.findSiblingInParent(element, eleName);
    const children = Array.from(sibling?.parentElement?.children ?? []);
    return children.filter((ele) => {
      const currClass = Array.from(ele.classList);
      const hasSameClass = eleClass.some((value) => currClass.includes(value));
      return currClass.length ? hasSameClass : ele.tagName === eleName;
    });
  },
  jumpToTargetEpisode(element) {
    const stack = [element].filter(Boolean);
    while (stack.length > 0) {
      const current = stack.pop();
      if (current.matches("a, button")) return current.click();
      stack.push(...Array.from(current.children).reverse());
      current.click();
    }
  },
  getEpisodeContainer(element) {
    //  集数相对于所有集数所在的同级标签
    // 示例一：得到<a>标签
    // <div><a>第01集</a><a>第02集</a></div>
    // 示例二：得到<li>标签
    // <ul class="player_list">
    // 	<li><a>第01话</a></li>
    // 	<li><a>第02话</a></li>
    // </ul>
    // 示例三：得到<div>标签
    // <ul class="urlli">
    // 	<div id="stab_1_71">
    // 		<ul><li><a>第01集</a></li></ul>
    // 	</div>
    // 	<div id="stab_1_71">
    // 		<ul><li><a>第02集</a></li></ul>
    // 	</div>
    // </ul>
    while (element && element.parentElement) {
      const siblings = Array.from(element.parentElement.children);
      if (siblings.length > 1 && siblings.some((sib) => sib !== element && sib.tagName === element.tagName)) return element;
      element = element.parentElement;
    }
    return null;
  },
  getCurrentEpisodeFromAllLink() {
    // https://www.dmb0u.art/index/home.html
    const getNumber = (str) => Tools.getNumbers(str).join(Constants.EMPTY);
    const lastPath = location.pathname.split("/").pop();
    const number = getNumber(lastPath);
    return number
      ? Tools.querys("a[onclick]")?.find((el) => Array.from(el.attributes).find((attr) => getNumber(attr.value) === number))
      : null;
  },
};
