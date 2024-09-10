import { taskFactory } from "./tasks";

export function renderNav() {

    const ulOfProjects = document.querySelector(".projects-list");

    taskFactory.projectList.forEach((e) => {
        const projectList = document.createElement("li");
        const projectLink = document.createElement("a");
        projectLink.setAttribute("href", "#")
        projectList.appendChild(projectLink);
        projectLink.textContent = e.name;
        ulOfProjects.appendChild(projectList);

        e.projectTasks.forEach((task) => {
            const taskList = document.createElement("li");
            const taskLink = document.createElement("a");
            taskList.appendChild(taskLink);
            taskLink.setAttribute("href", "#");
            taskLink.textContent = task.name;
            projectList.appendChild(taskList);
        });
    });
    
}