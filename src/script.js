import "./style.css"

function newTask(name, desc, dueDate, priority) {
    const taskCompleted = false;
    const id = taskId;
    assignTaskToProject({ name, desc, dueDate, priority, taskCompleted, id }, defaultProject);
    return { name, desc, dueDate, priority, taskCompleted, id };
}

function newProject(name) {
    const projectTasks = [];
    const id = projectId;
    projectId++;
    projectList.push({ name, projectTasks, id })
    return { name, projectTasks, id };
}

function assignTaskToProject(task, project) {
    return project.projectTasks.push(task)
}

function deleteTask(taskId) {
    projectList.forEach((project) => project.projectTasks.forEach((task, index) => task.id === taskId ? project.projectTasks.splice(index, 1): false))
}

let projectId = 0;
let taskId = 0;

const projectList = [];
const defaultProject = newProject("default");

// TESTING PURPOSES
const zog = newTask("ZogZog", "ZogZorZog? ZogZog", "00-00-00", "URGENT");
console.log(zog)
const zogpro = newProject("ZogPro")
assignTaskToProject(zog, zogpro)
console.log(zogpro)
console.log(deleteTask(0))
console.log(zogpro)

