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
    const renderSettings = () => {

        const title = document.createElement("h2");
        title.textContent = "TO-DO LIST SETTINGS";

        const categoriesContainer = document.createElement("div");
        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = "Categories";
        const addCategory = document.createElement("button");
        addCategory.textContent = "ADD A NEW CATEGORY";
        const setCategoryName = document.createElement("button");
        setCategoryName.textContent = "CHANGE A CATEGORY'S NAME";
        categoriesContainer.append(categoryTitle, addCategory, setCategoryName);
        
        const projectsContainer = document.createElement("div");
        const projectsTitle = document.createElement("h3");
        projectsTitle.textContent = "Projects";
        const addProject = document.createElement("button");
        addProject.textContent = "ADD A NEW PROJECT";
        const setProjectName = document.createElement("button");
        setProjectName.textContent = "CHANGE A PROJECT'S NAME";
        projectsContainer.append(projectsTitle, addProject, setProjectName);
    
    
        const tasksContainer = document.createElement("div");
        const tasksTitle = document.createElement("h3");
        tasksTitle.textContent = "Tasks";
        const addToDoTask = document.createElement("button");
        addToDoTask.textContent = "ADD A NEW TASK";
        const setTaskName = document.createElement("button");
        setTaskName.textContent = "SET A NEW NAME FOR AN EXISTING TASK";
        const setTaskDueDate = document.createElement("button");
        setTaskDueDate.textContent = "SET A NEW DUE DATE FOR AN EXISTING TASK";
        // const setTaskProject = document.createElement("button");
        // setTaskProject.textContent = "set THE TASK'S PROJECT"
        const setTaskPriority = document.createElement("button");
        setTaskPriority.textContent = "SET A NEW PRIORITY FOR AN EXISTING TASK";
        // const setTaskToCompleted = document.createElement("button");

        tasksContainer.append(tasksTitle, addToDoTask, setTaskName, setTaskPriority, setTaskDueDate);
    
        mainContainer.append(title, categoriesContainer, projectsContainer, tasksContainer)
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

    return { renderSettings, renderProject, renderTask }
}
