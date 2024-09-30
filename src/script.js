import "./style.css";
import {
  renderMain,
  renderNav,
  renderMainLinksContent,
  setTodaysDateMinOnInput,
} from "./DOM";

renderNav();
renderMain().renderProject();
renderMainLinksContent();
setTodaysDateMinOnInput();
