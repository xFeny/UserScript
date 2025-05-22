import App from "./application";
import Tools from "./application/common/Tools";
import KeydownHandler from "./application/handler/KeydownHandler";
import MenuCommandHandler from "./application/handler/MenuCommandHandler";
import VideoControlHandler from "./application/handler/VideoControlHandler";
import WebSiteLoginHandler from "./application/handler/WebSiteLoginHandler";
import WebFullScreenHandler from "./application/handler/WebFullScreenHandler";
import SwitchEpisodeHandler from "./application/handler/SwitchEpisodeHandler";
import PickerEpisodeHandler from "./application/handler/PickerEpisodeHandler";
import ScriptsEnhanceHandler from "./application/handler/ScriptsEnhanceHandler";
import "sweetalert2/dist/sweetalert2.min.css";
import "./style.scss";

const logicHandlers = [
  { handler: KeydownHandler },
  { handler: MenuCommandHandler },
  { handler: VideoControlHandler },
  { handler: WebSiteLoginHandler },
  { handler: WebFullScreenHandler },
  { handler: SwitchEpisodeHandler },
  { handler: PickerEpisodeHandler },
  { handler: ScriptsEnhanceHandler },
];

// 将Handler方法变为App的方法，内部this指向App
logicHandlers.forEach(({ handler }) => {
  for (const key of Object.keys(handler)) {
    const method = handler[key];
    method instanceof Function ? (App[key] = method.bind(App)) : (App[key] = method);
  }
});

App.init();
unsafeWindow.MONKEY_WEB_FULLSCREEN = { App, Tools };
