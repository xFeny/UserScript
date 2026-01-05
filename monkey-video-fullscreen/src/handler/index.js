import Listen from "./ListenerHandler";
import Keydown from "./KeydownHandler";
import Events from "./VideoEventsHandler";
import WebFull from "./WebFullScreenHandler";
import Automatic from "./AutoExecuteHandler";
import Ignore from "./IgnoreUrlsHandler";
import Menu from "./MenuHandler";

window.App = {};
const handlers = [Listen, Keydown, Events, WebFull, Automatic, Ignore, Menu];
handlers.forEach((handler) => {
  const entries = Object.entries(handler);
  for (const [key, value] of entries) {
    // 合并处理器方法到App并绑定上下文
    App[key] = value instanceof Function ? value.bind(App) : value;
  }
});

App.init();
