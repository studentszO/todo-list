import { taskFactory } from "./tasks";

const renderOnClick = (link) => {
    link.addEventListener("click", (e) => {
      renderMain().renderProject(link.getAttribute("data-id"))
    });
};

export function renderNav() {


    const ulOfProjects = document.querySelector(".projects-list");

    taskFactory.categoryList.forEach((e) => {
        const categoryName = document.createElement("li");
        categoryName.textContent = e.name;
        const categoryListOfProjects = document.createElement("ul");

        e.categoryProjects.forEach((project) => {
            const projectName = document.createElement("li");
            renderOnClick(projectName);
            projectName.setAttribute("data-id", project.id);
            projectName.textContent = project.name;
            categoryListOfProjects.appendChild(projectName);
        });

        ulOfProjects.append(categoryName, categoryListOfProjects);

    });
    
};

export function renderMain() {
    
    const mainContainer = document.querySelector(".main");
    const renderDefault = () => {

    };

    const renderProject = (projectId) => {
        mainContainer.textContent = "";
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

            linkOnH3.setAttribute("href", "#");

            taskName.appendChild(linkOnH3);
            taskCard.append(taskName, taskDesc, taskPriority, taskDueDate);
            tasksContainer.append(taskCard);
        });


    };

    const renderTask = () => {
        // const dueDate = document.createElement("div");
        // const priority = document.createElement("div");
        // const description = document.createElement("div");
    };

    return { renderDefault, renderProject, renderTask }
}