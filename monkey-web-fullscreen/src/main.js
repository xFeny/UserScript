import "./style.scss";
import App from "./application";
import Tools from "./application/common/Tools";
import Keydown from "./application/handler/KeydownHandler";
import MenuCommand from "./application/handler/MenuCommandHandler";
import VideoControl from "./application/handler/VideoControlHandler";
import WebSiteLogin from "./application/handler/WebSiteLoginHandler";
import WebFullScreen from "./application/handler/WebFullScreenHandler";
import SwitchEpisode from "./application/handler/SwitchEpisodeHandler";
import PickerEpisode from "./application/handler/PickerEpisodeHandler";
import ScriptsEnhance from "./application/handler/ScriptsEnhanceHandler";
import "sweetalert2/dist/sweetalert2.min.css";
import "notyf/notyf.min.css";

[Keydown, MenuCommand, VideoControl, WebSiteLogin, WebFullScreen, SwitchEpisode, PickerEpisode, ScriptsEnhance].forEach(
  (handler) => {
    // 将Handler方法变为App的方法，内部this指向App
    Object.entries(handler).forEach(([key, value]) => {
      App[key] = value instanceof Function ? value.bind(App) : value;
    });
  }
);

App.init();
unsafeWindow.Tools = Tools;
unsafeWindow.MONKEY_WEB_FULLSCREEN = App;
