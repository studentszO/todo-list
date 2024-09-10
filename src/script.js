import "./style.css"
import { taskFactory } from "./tasks.js";
import { renderNav } from "./DOM.js";

// TESTING PURPOSES
const zog = taskFactory.newTask("ZogZog", "ZogZorZog? ZogZog", "00-00-00", "URGENT");
console.log(zog)
const zogpro = taskFactory.newProject("ZogPro")
taskFactory.assignTaskToProject(zog, zogpro)
console.log(zogpro)
console.log(taskFactory.deleteTask(0))
console.log(zogpro)
console.log(taskFactory.projectList)
renderNav();

