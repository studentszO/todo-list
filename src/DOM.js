import { taskFactory } from "./tasks";

export function renderNav() {

    const ulOfProjects = document.querySelector(".projects-list");
    taskFactory.projectList.forEach((e) => {
        const project = document.createElement("li");
        const link = document.createElement("a");
        link.setAttribute("href", "#")
        project.appendChild(link);
        link.textContent = e.name;
        ulOfProjects.appendChild(project);
    }); 
    
}