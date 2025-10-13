import URL from "../common/URL";
import Utils from "../common/Utils";
import http_form from "../layout/http_form";

export default {
  inputJson() {
    layer.prompt(
      {
        move: false,
        formType: 2,
        btn: ["确认"],
        shadeClose: true,
        title: "JSON 输入",
        area: ["400px", "300px"],
        maxlength: Number.MAX_VALUE,
      },
      (text) => {
        if (!text) return layer.msg("内容不能为空", { time: 1500 });
        const { rawText, jsonpFun } = Utils.matchJsonp(text);
        try {
          const json = Utils.parse(rawText);
          this.reload(json, rawText, jsonpFun);
        } catch (e) {
          layer.msg("JSON格式不正确", { time: 1500 });
          console.log("格式化异常: ", e);
        }
      }
    );
    return this;
  },
  fetchJson() {
    const success = () => {
      const formElem = Utils.query("form");
      formElem.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(formElem);
        const submitData = {};
        for (const [name, value] of formData) {
          submitData[name] = value;
        }
        this._submit(submitData);
      });
    };
    layer.open({
      success,
      type: 1,
      shadeClose: true,
      title: "HTTP 请求",
      content: http_form,
    });
    return this;
  },
  async _submit(submitData) {
    let { url, method, headers, params, contentType } = submitData;
    if (!url) return layer.msg("请求地址不能为空");
    if (headers && !(headers.startsWith("{") && headers.endsWith("}"))) return layer.msg("请求头 格式不合法");
    if (params && !(params.startsWith("{") && params.endsWith("}"))) return layer.msg("请求参数 格式不合法");

    headers = JSON.parse(headers || "{}");
    params = JSON.parse(params || "{}");

    try {
      layer.load();
      headers["Content-Type"] = contentType;
      if (method === "GET") url = this.buildUrlWithParams(url, this.queryParams(params));
      if (contentType.includes("urlencoded")) params = this.queryParams(params);
      const response = await GM.xmlHttpRequest({ method, url, headers, data: params }).catch((e) => console.error(e));
      const result = response.responseText;

      const { rawText, jsonpFun } = Utils.matchJsonp(result);
      const json = Utils.parse(rawText);
      this.reload(json, rawText, jsonpFun);
    } catch (e) {
      layer.closeAll();
      layer.msg("请求异常：" + e.message);
      console.log("HTTP 请求异常：", e);
    }
  },
  reload(json, rawText, jsonpFun) {
    layer.closeAll();
    unsafeWindow.RAW_TEXT = rawText;
    unsafeWindow.GLOBAL_JSON = json;
    unsafeWindow.GLOBAL_JSONP_FUN = jsonpFun;
    window.postMessage({ reload: true });
  },
  queryParams(data) {
    const params = [];
    for (const [key, value] of Object.entries(data)) {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    return params.join("&");
  },
  buildUrlWithParams: function (baseUrl, queryParams) {
    if (!queryParams) return baseUrl;
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}${queryParams}`;
  },
};
