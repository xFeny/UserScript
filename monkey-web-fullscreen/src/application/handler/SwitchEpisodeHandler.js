import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
const { RELATIVE_EPISODE_SELECTOR: RE_SELECTOR } = Storage;

/**
 * 通用性切换视频下集
 */
export default {
  switchEpisode(isPrev = false) {
    const targetEpisode = this.getTargetEpisode(this.getCurrentEpisode(), isPrev) ?? this.getTargetEpisodeByText(isPrev);
    // Tools.log("跳转集元素：", targetEpisode);
    this.jumpToTargetEpisode(targetEpisode);
  },
  getCurrentEpisode() {
    return RE_SELECTOR.get(location.host) ? this.getCurrentEpisodeBySelector() : this.getCurrentEpisodeByLink();
  },
  getCurrentEpisodeByLink() {
    const { pathname, search } = location;
    const last = pathname.split("/").pop();
    const links = Tools.querys(`:is(a[href*="${pathname + search}"], a[href*="${last}"], a[href*="${search}"])`);
    // Tools.log("匹配到所有的链接：", links);
    return links.length <= 1 ? this.getEpisodeWrapper(links[0]) : this.findCurrentEpisode(links, pathname + search);
  },
  findCurrentEpisode(eles, pageUrl) {
    // 过滤与地址栏相同连接的： 标题、线路、排行、热门、猜你喜欢、推荐、历史记录
    // https://www.2rk.cc、https://www.yingshikong1.com、https://www.dyttlg1.com
    const filter = [
      "h1, header, footer",
      "[class*='tab-item'], [class*='play-channel']",
      "[class*='rank'], [class*='hotlist'], [class*='vodlist']",
      "[id*='guankan'], [id*='history'], [class*='history'], [class*='record'], [class*='lishi']",
    ];
    eles = eles
      .filter((el) => {
        const { pathname, search } = new URL(el.href);
        return !Tools.closest(el, `:is(${filter})`, 5) && pageUrl.includes(pathname + search);
      })
      .map(this.getEpisodeWrapper)
      .reverse();
    // Tools.log("过滤后连接：", eles);
    return eles.length <= 1 ? eles[0] : eles.find((el) => Tools.hasCls(el, "cur", "active") || !!this.getEpisodeNumber(el));
  },
  getEpisodeNumber: (ele) => Tools.getNumbers(ele?.innerText?.replace(/-/g, Consts.EMPTY))?.shift(),
  getTargetEpisode(element, isPrev = false) {
    if (!element) return;
    const currNumber = this.getEpisodeNumber(element);
    const episodes = this.getAllEpisodes(element);
    // Tools.log("所有剧集元素", episodes);

    const index = episodes.indexOf(element);
    const numbers = episodes.map(this.getEpisodeNumber);
    const { leftSmall, rightLarge } = this.compareLeftRight(numbers, currNumber, index);

    // 当 leftSmall || rightLarge 的结果与 isPrev 的布尔值相同时，返回 prev，当两者不同时，返回 next。
    return (leftSmall || rightLarge) === isPrev ? episodes[index - 1] : episodes[index + 1];
  },
  getAllEpisodes(element) {
    if (!element) return [];
    const eleName = element.tagName;
    const eleClass = Array.from(element.classList);
    const sibling = Tools.findSibling(element, eleName);
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
      Tools.triggerClick(current);
    }
  },
  getEpisodeWrapper(element) {
    //  集数相对于所有集数所在的同级标签
    // 示例一：得到<a>标签
    // <div><a>第01集</a><a>第02集</a></div>
    // 示例二：得到<li>标签
    // <ul class="player_list"><li><a>第01话</a></li> <li><a>第02话</a></li></ul>
    // 示例三：得到<div id="stab_1_71">标签
    // <ul class="urlli">
    // 	<div id="stab_1_71"><ul><li><a>第01集</a></li></ul></div>
    // 	<div id="stab_1_71"><ul><li><a>第02集</a></li></ul></div>
    // </ul>
    while (element && element.parentElement) {
      const siblings = Array.from(element.parentElement.children);
      if (siblings.length > 1 && siblings.some((sib) => sib !== element && sib.tagName === element.tagName)) return element;
      element = element.parentElement;
    }
    return null;
  },
  getTargetEpisodeByText(isPrev = false) {
    // 示例网址：https://www.dmb0u.art、https://www.lincartoon.com、
    // https://ddys.pro、https://www.5dm.link、https://www.tucao.my、https://www.flixflop.com
    const texts = isPrev ? ["上集", "上一集", "上话", "上一话", "上一个"] : ["下集", "下一集", "下话", "下一话", "下一个"];
    return Tools.findByText("attr", texts).shift() ?? Tools.findByText("text", texts).shift();
  },
  compareLeftRight: (numbers, compareNumber = 0, index) => ({
    leftSmall: numbers.some((val, i) => i < index && val < compareNumber),
    rightLarge: numbers.some((val, i) => i > index && val > compareNumber),
  }),
};
