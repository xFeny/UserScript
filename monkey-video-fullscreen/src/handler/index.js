import Listen from "./ListenerHandler";
import Keydown from "./KeydownHandler";
import Events from "./VideoEventsHandler";
import Control from "./VideoControlHandler";
import WebFull from "./WebFullScreenHandler";
import Automatic from "./AutoExecuteHandler";
import Extend from "./VideoExtendHandler";
import Ignore from "./IgnoreUrlsHandler";
import Menu from "./MenuHandler";

const handlers = [Listen, Keydown, Events, Control, WebFull, Automatic, Extend, Ignore, Menu];

const App = {};
handlers.forEach((handler) => {
  const entries = Object.entries(handler);
  for (const [key, value] of entries) {
    // 合并处理器方法到App并绑定上下文
    App[key] = value instanceof Function ? value.bind(App) : value;
  }
});

App.init();
