import { taskFactory } from "./tasks";

export function renderNav() {

    // const onClick = () => {
    //     addEventListener("click", (e) => {
    //      if project e.RenderMainProject, etc..
    //     })
    // }

    const ulOfProjects = document.querySelector(".projects-list");

    taskFactory.projectList.forEach((e) => {
        const projectList = document.createElement("li");
        const projectLink = document.createElement("a");
        projectLink.setAttribute("href", "#");
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
};

export function renderMain() {
    
    const mainContainer = document.querySelector(".main");
    const renderDefault = () => {

    };

    const renderProject = (projectId) => {
        const listOfProjects = taskFactory.projectList;
        const title = document.createElement("h2");
        const tasksContainer = document.createElement("div");
        const projectTasks = listOfProjects[projectId].projectTasks;

        title.textContent = listOfProjects[projectId].name;
        mainContainer.append(title, tasksContainer);

        projectTasks.forEach((task) => {
            const taskCard = document.createElement("div");
            const taskName = document.createElement("h3");
            const linkOnH3 = document.createElement("a");
            const taskDesc = document.createElement("p");
            const taskPriority = document.createElement("div");
            const taskDueDate = document.createElement("div");

            linkOnH3.textContent = task.name;
            taskDesc.textContent = task.desc;
            taskDueDate.textContent = task.dueDate;
            taskPriority.textContent = task.priority;

            linkOnH3.setAttribute("href", "#")

            taskName.appendChild(linkOnH3);
            taskCard.append(taskName, taskDesc, taskPriority, taskDueDate)
            tasksContainer.append(taskCard);
        })


    };

    const renderTask = () => {
        // const dueDate = document.createElement("div");
        // const priority = document.createElement("div");
        // const description = document.createElement("div");
    };

    return { renderDefault, renderProject, renderTask }
}