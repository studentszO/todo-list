import "./style.css"
import { taskFactory } from "./tasks.js";
import { renderMain, renderNav, renderMainLinksContent, setTodaysDateMinOnInput } from "./DOM.js";

const today = new Date().toISOString().split('T')[0];
const myFirstTask = taskFactory.newTask("My First Task", 'Lorem ipsum odor amet, consectetuer adipiscing elit. Hac ullamcorper nostra proin laoreet massa. Porta aenean penatibus varius bibendum accumsan adipiscing cubilia diam hac.', today, "2", 0, 0);

renderNav();
renderMain().renderProject();
renderMainLinksContent();
setTodaysDateMinOnInput();