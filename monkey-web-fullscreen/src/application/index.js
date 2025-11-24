import Listen from "./handler/ListenerHandler";
import Keydown from "./handler/KeydownHandler";
import Control from "./handler/VideoControlHandler";
import WebFull from "./handler/WebFullscreenHandler";
import Automatic from "./handler/AutoExecuteHandler";
import Switch from "./handler/EpisodeSwitchHandler";
import Picker from "./handler/EpisodePickerHandler";
import SettMsg from "./handler/SettMessageHandler";
import Extend from "./handler/VideoExtendHandler";
import Ignore from "./handler/IgnoreUrlsHandler";
import Login from "./handler/WebLoginHandler";
import Menu from "./handler/MenuHandler";

export default [Listen, Keydown, Control, WebFull, Automatic, Switch, Picker, Ignore, SettMsg, Menu, Extend, Login];
