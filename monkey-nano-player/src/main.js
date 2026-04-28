import "./css/index.scss";
import Menu from "./control/menu";
import Main from "./control";

const App = { ...Main, ...Menu };
App.init();
