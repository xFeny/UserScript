import Utils from "./common/Utils";
import Urls from "./common/Urls";
import layout from "./layout";
import "./layout/layout.scss";
import "tippy.js/dist/tippy.css";

(function () {
  "use strict";

  GM_registerMenuCommand("JSON示例", () => GM_openInTab(Urls.example));

  const innerText = document.body.innerText;
  const { rawText, jsonpFun } = Utils.matchJsonp(innerText);
  if (!Utils.isJSON(rawText)) return import("./js_css_beautify");

  unsafeWindow.RAW_TEXT = rawText;
  unsafeWindow.GLOBAL_JSONP_FUN = jsonpFun;
  unsafeWindow.GLOBAL_JSON = Utils.parse(unsafeWindow.RAW_TEXT);

  Utils.hide(Utils.query("pre"));
  window.postMessage({ addStyle: true });

  GM_addElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" });
  GM_addElement("script", { src: Urls.layui, type: "text/javascript" });

  document.body.insertAdjacentHTML("afterbegin", layout);
  setTimeout(async () => {
    const temp = Utils.query('template[data-for="viewFormater"]');
    Utils.query(".toolbar").innerHTML = temp.innerHTML;
    await import("./format");
    import("./scrollTop");
    import("./toolbar");
  });
})();
