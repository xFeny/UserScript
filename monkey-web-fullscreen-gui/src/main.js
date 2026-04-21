import "./css/index.scss";
import "tippy.js/dist/tippy.css";
import Layout from "./control/layout";
import Extend from "./control/extend";
import Control from "./control";

const App = { ...Control, ...Layout, ...Extend };
App.init();
