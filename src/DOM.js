import { taskFactory } from "./tasks";

const renderOnClick = (link) => {
    link.onclick = function() {
      renderMain().renderProject(link.getAttribute("data-id"));
    };
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

    const renderProject = (projectId) => {
        mainContainer.textContent = "";
        const listOfProjects = taskFactory.projectList;
        const title = document.createElement("h2");
        const tasksContainer = document.createElement("div");
        const projectTasks = listOfProjects[projectId].projectTasks;

        title.textContent = listOfProjects[projectId].name;
        mainContainer.append(title, tasksContainer);

        function renderTasks() {
            tasksContainer.textContent = "";
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

                taskCard.onclick = function() {
                    const currentHeight = window.getComputedStyle(taskCard).height;
                    currentHeight === "34px" ? taskCard.style.height = "154px" : taskCard.style.height = "34px";
                };


                openCloseModal(editTaskButton, document.querySelector("#edit-task"), task.id)


                removeTaskButton.onclick = function () {
                    taskFactory.deleteTask(task.id);
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
        }

        function renderNewTaskButton() {
            const divContainer = document.createElement("button");
            divContainer.textContent = "ADD A NEW TASK";
            divContainer.id = "add-new-task-btn";
            divContainer.setAttribute("data-project-id", projectId);
            tasksContainer.appendChild(divContainer);
            openCloseModal(divContainer, document.querySelector("#add-new-task"))
        };


        const confirmButton = document.querySelector("#add-task-confirm-btn");
        confirmButton.onclick = function(){
            getAddNewTaskModalValues();
            renderEverything();
        };

        renderEverything();
    };

    return { renderProject }
}

function getAddNewTaskModalValues() {
    const addNewTaskButton = document.querySelector("#add-new-task-btn");
    const form = document.querySelector("#add-new-task-form");

    const projectIdValue = addNewTaskButton.getAttribute("data-project-id");
    const taskNameInput = document.querySelector("#task-name");
    const taskDescInput = document.querySelector("#task-desc");
    const taskDueDateInput = document.querySelector("#task-due-date");
    const taskPriority = document.querySelector("#task-priority");

    taskFactory.newTask(taskNameInput.value, taskDescInput.value, taskDueDateInput.value, taskPriority.value, projectIdValue);
    form.reset();
    renderMain().renderProject(projectIdValue);
}

function EditTaskModalValues(taskId) {

    const addNewTaskButton = document.querySelector("#add-new-task-btn");
    const projectIdValue = addNewTaskButton.getAttribute("data-project-id");
    const EditTaskModal = document.querySelector("#edit-task");

    const taskNameInput = document.querySelector("#edit-task-name");
    const taskDescInput = document.querySelector("#edit-task-desc");
    const taskDueDateInput = document.querySelector("#edit-task-due-date");
    const taskPriority = document.querySelector("#edit-task-priority");
    
    const arrayOfTasks = taskFactory.projectList[projectIdValue].projectTasks;
    const taskIndex = arrayOfTasks.findIndex(task => task.id === taskId);

    taskNameInput.value = arrayOfTasks[taskIndex].name;
    taskDescInput.value = arrayOfTasks[taskIndex].desc;
    taskDueDateInput.value = arrayOfTasks[taskIndex].dueDate;
    taskPriority.value = arrayOfTasks[taskIndex].priority;

    const confirmButton = document.querySelector("#edit-task-confirm-btn");
    const cancelButton = document.querySelector("#edit-task-cancel-btn");

    confirmButton.onclick = function() {
        arrayOfTasks[taskIndex].name = taskNameInput.value;
        arrayOfTasks[taskIndex].desc = taskDescInput.value;
        arrayOfTasks[taskIndex].dueDate = taskDueDateInput.value;
        arrayOfTasks[taskIndex].priority = taskPriority.value;
        renderMain().renderProject(projectIdValue);
        EditTaskModal.close();
    }
}

function openCloseModal(triggerButton, modalElement, taskIdToShowValuesToEdit) {
    const cancelButton = modalElement.querySelector(".cancel-btn");

    triggerButton.onclick = () => {
        modalElement.showModal();
        taskIdToShowValuesToEdit === undefined ? false : EditTaskModalValues(taskIdToShowValuesToEdit);
    };
    
    window.addEventListener("click", (e) => {
        if (e.target === modalElement)
            modalElement.close();
    });

    cancelButton.onclick = () => {
        modalElement.close();
    };
};