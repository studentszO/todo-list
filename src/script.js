import "./style.css"
import { taskFactory } from "./tasks.js";
import { renderMain, renderNav, renderMainLinksContent } from "./DOM.js";

// TESTING PURPOSES
// const zog = taskFactory.newTask("ZogZog", "ZogZorZog? ZogZog", "00-00-00", "4", 1, 0);
const zog2 = taskFactory.newTask("ZogZog2", "ZogZorZog? ZogZog", "00-00-00", "2", 0, 0);
const xxx = taskFactory.newTask("Bahamut", "Best bahamut LOL", "00-00-01", "2");
// const zog3 = taskFactory.newTask("ZogZog3", "ZogZorZog? ZogZog", "00-00-00", "3", 1, 0);
// const zog4 = taskFactory.newTask("ZogZog4", "ZogZorZog? ZogZog", "00-00-00", "1", 0, 0);
const cat1 = taskFactory.newCategory("HOME");
const cat2 = taskFactory.newCategory("WORK");
const zogpro = taskFactory.newProject("ZogPro", 1)
const zogZogZogZogZog = taskFactory.newProject("ZogPro", 2)
const zogZogPro = taskFactory.newProject("ZogProPro", 2)
const zogZogPro11 = taskFactory.newProject("ZogProProHOME", 1)
// taskFactory.assignTaskToProject(zog, zogpro)

console.log(taskFactory.categoryList)
renderNav();
renderMain().renderProject();
renderMainLinksContent();