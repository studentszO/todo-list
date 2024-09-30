import "./style.css";
import { renderMain, renderNav, renderMainLinksContent, setTodaysDateMinOnInput } from "./DOM.js";

renderNav();
renderMain().renderProject();
renderMainLinksContent();
setTodaysDateMinOnInput();