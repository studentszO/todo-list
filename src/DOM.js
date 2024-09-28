import { taskFactory } from "./tasks";
import deleteIconSVG from "./icons/delete-circle.svg";

const renderOnClick = (link, categoryIndex, projectIndex) => {
    link.onclick = function() {
        renderMain().renderProject(categoryIndex, projectIndex);
    };
};

export function renderNav() {

    const ulOfProjects = document.querySelector(".projects-list");
    ulOfProjects.textContent = "";

    taskFactory.categoryList.forEach((category, categoryIndex) => {
        const categoryName = document.createElement("li");
        categoryName.textContent = category.name;
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteIconSVG;

        deleteIcon.onclick = function() {
            taskFactory.removeCategory(categoryIndex);
            renderNav();
        };

        categoryName.append(deleteIcon);
        const categoryListOfProjects = document.createElement("ul");

        category.categoryProjects.forEach((project, projectIndex) => {
            const projectName = document.createElement("li");
            renderOnClick(projectName, categoryIndex, projectIndex);
            projectName.textContent = project.name;
            categoryListOfProjects.appendChild(projectName);
        });

        addNewProjectInput(categoryListOfProjects, categoryIndex);
        ulOfProjects.append(categoryName, categoryListOfProjects);

    });

    const addNewCategoryInput = document.createElement("input");
    addNewCategoryInput.setAttribute("placeholder", "Add a new category");
    const addNewCategoryInputConfirmButton = document.createElement("div");
    addNewCategoryInputConfirmButton.textContent = "+";
    ulOfProjects.append(addNewCategoryInput, addNewCategoryInputConfirmButton);
    addNewCategoryInputConfirmButton.onclick = function() {
        if (addNewCategoryInput.value.length > 0){
            taskFactory.newCategory(addNewCategoryInput.value);
            renderNav();
        };
    };

    function addNewProjectInput(projectList, categoryId) { 
        const addNewProjectInput = document.createElement("input");
        addNewProjectInput.setAttribute("placeholder", "Add a new project");
        const addNewProjectInputConfirmButton = document.createElement("div");
        addNewProjectInputConfirmButton.textContent = "+";
        projectList.append(addNewProjectInput, addNewProjectInputConfirmButton);
        addNewProjectInputConfirmButton.onclick = function() {
            if (addNewProjectInput.value.length > 0){
                taskFactory.newProject(addNewProjectInput.value, categoryId);
                renderNav();
            };
        };
    };
};

export function renderMain() {
    
    const mainContainer = document.querySelector(".main");

    const renderProject = (categoryIndex, projectIndex) => {

        mainContainer.textContent = "";

        const listOfProjects = taskFactory.categoryList[categoryIndex].categoryProjects;
        const title = document.createElement("h2");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteIconSVG;
        const tasksContainer = document.createElement("div");
        const projectTasks = listOfProjects[projectIndex].projectTasks;
        title.textContent = listOfProjects[projectIndex].name;
        title.append(deleteIcon);
        deleteIcon.onclick = () => { taskFactory.removeProject(categoryIndex, projectIndex) | renderNav() | renderMain().renderProject(0, 0) };
        mainContainer.append(title, tasksContainer);

        function renderTasks() {
            tasksContainer.textContent = "";
            projectTasks.forEach((task, taskIndex) => {
                const taskCard = document.createElement("div");
                const taskName = document.createElement("h3");
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

                taskName.textContent = task.name;
                taskDesc.textContent = task.desc;
                taskDueDate.textContent = task.dueDate;
                taskPriority.textContent = handlePriorityText(task.priority);
                editTaskButton.textContent = "EDIT TASK";
                removeTaskButton.textContent = "REMOVE TASK";

                taskCard.append(taskName, taskDueDate, taskDesc, taskPriority, taskDueDate, editTaskButton, removeTaskButton);
                tasksContainer.append(taskCard);

                taskCard.onclick = function() {
                    const currentHeight = window.getComputedStyle(taskCard).height;
                    currentHeight === "34px" ? taskCard.style.height = "154px" : taskCard.style.height = "34px";
                };

                openCloseModal(editTaskButton, document.querySelector("#edit-task"), [categoryIndex, projectIndex, taskIndex]);

                removeTaskButton.onclick = function () {
                    taskFactory.removeTask(categoryIndex, projectIndex, taskIndex);
                    document.querySelector("#card" + task.id).remove();
                };
            });
        };

        function renderEverything() {
            renderTasks();
            renderNewTaskButton();
        };

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
        };

        function renderNewTaskButton() {
            const divContainer = document.createElement("button");
            divContainer.textContent = "ADD A NEW TASK";
            divContainer.id = "add-new-task-btn";
            tasksContainer.appendChild(divContainer);
            openCloseModal(divContainer, document.querySelector("#add-new-task"))
        };


        const confirmButton = document.querySelector("#add-task-confirm-btn");
        confirmButton.onclick = function(){
            getAddNewTaskModalValues(categoryIndex, projectIndex);
            renderEverything();
        };

        renderEverything();
    };

    return { renderProject };
};

function getAddNewTaskModalValues(categoryIndex, projectIndex) {
    const form = document.querySelector("#add-new-task-form");
    const taskNameInput = document.querySelector("#task-name");
    const taskDescInput = document.querySelector("#task-desc");
    const taskDueDateInput = document.querySelector("#task-due-date");
    const taskPriority = document.querySelector("#task-priority");

    taskFactory.newTask(taskNameInput.value, taskDescInput.value, taskDueDateInput.value, taskPriority.value, categoryIndex, projectIndex);
    form.reset();
    renderMain().renderProject(categoryIndex, projectIndex);
};

function EditTaskModalValues(arrayOfIndexes) {

    const EditTaskModal = document.querySelector("#edit-task");
    const taskNameInput = document.querySelector("#edit-task-name");
    const taskDescInput = document.querySelector("#edit-task-desc");
    const taskDueDateInput = document.querySelector("#edit-task-due-date");
    const taskPriority = document.querySelector("#edit-task-priority");
    const confirmButton = document.querySelector("#edit-task-confirm-btn");
    const tasksArray = taskFactory.categoryList[arrayOfIndexes[0]].categoryProjects[arrayOfIndexes[1]].projectTasks

    taskNameInput.value = tasksArray[arrayOfIndexes[2]].name;
    taskDescInput.value = tasksArray[arrayOfIndexes[2]].desc;
    taskDueDateInput.value = tasksArray[arrayOfIndexes[2]].dueDate;
    taskPriority.value = tasksArray[arrayOfIndexes[2]].priority;

    confirmButton.onclick = function() {
        taskFactory.editTask(taskNameInput.value, taskDescInput.value, taskDueDateInput.value, taskPriority.value, arrayOfIndexes)
        renderMain().renderProject(arrayOfIndexes[0], arrayOfIndexes[1]);
        EditTaskModal.close();
    };
};

function openCloseModal(triggerButton, modalElement, arrayOfIndexes) {
    const cancelButton = modalElement.querySelector(".cancel-btn");

    triggerButton.onclick = () => {
        modalElement.showModal();
        arrayOfIndexes === undefined ? false : EditTaskModalValues(arrayOfIndexes);
    };
    
    window.addEventListener("click", (e) => {
        if (e.target === modalElement)
            modalElement.close();
    });

    cancelButton.onclick = () => {
        modalElement.close();
    };
};