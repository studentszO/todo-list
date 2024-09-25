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

        const settingsContainer = document.createElement("div")

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
        settingsContainer.append(categoriesContainer, projectsContainer, tasksContainer)
        mainContainer.append(title, settingsContainer)
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
            const editTaskButton = document.createElement("button");
            const removeTaskButton = document.createElement("button");
            
            taskCard.classList.add("card");
            taskPriority.classList.add("p"+task.priority);
            editTaskButton.classList.add("edit-task");
            removeTaskButton.classList.add("remove-task");

            taskCard.id = "card" + task.id;

            linkOnH3.textContent = task.name;
            taskDesc.textContent = task.desc;
            taskDueDate.textContent = task.dueDate;
            taskPriority.textContent = handlePriorityText(task.priority);
            editTaskButton.textContent = "EDIT TASK";
            removeTaskButton.textContent = "REMOVE TASK";

            taskName.appendChild(linkOnH3);
            taskCard.append(taskName, taskDueDate, taskDesc, taskPriority, taskDueDate, editTaskButton, removeTaskButton);
            tasksContainer.append(taskCard);

            taskCard.addEventListener("click", () => {
                taskCard.style.height === "34px" ? taskCard.style.height = "154px" : taskCard.style.height = "34px";
            });

            removeTaskButton.addEventListener("click", () => {
                taskFactory.deleteTask(task.id);
                document.querySelector("#card" + task.id).remove();
            })
        });

        function handlePriorityText(priorityLevel) {
            switch (priorityLevel) {
                case "1":
                    return "URGENT";
                case "2":
                    return "HIGH";
                case "3":
                    return "MEDIUM";
                case "4":
                    return "LOW";
            }
        }

        // projectTasks.forEach((task) => {
        //     const taskCard = document.createElement("div");
        //     taskCard.classList.add("card");
        //     const taskName = document.createElement("h3");
        //     const taskDueDate = document.createElement("div");

        //     taskDueDate.textContent = task.dueDate;
        //     taskName.textContent = task.name;

        //     taskCard.append(taskName, taskDueDate);
        //     tasksContainer.append(taskCard);
        // });


    };

    const renderTask = () => {
        // const dueDate = document.createElement("div");
        // const priority = document.createElement("div");
        // const description = document.createElement("div");
    };

    return { renderSettings, renderProject, renderTask }
}
