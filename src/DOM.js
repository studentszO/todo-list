/* eslint-disable no-undef */
import toDoList from "./tasks";
import deleteIconSVG from "./icons/delete-circle.svg";

const renderOnClick = (linkElement, categoryIndex, projectIndex) => {
  const link = linkElement;
  link.onclick = function () {
    renderMain().renderProject(categoryIndex, projectIndex);
  };
};

export function setTodaysDateMinOnInput() {
  const today = new Date().toISOString().split("T")[0];
  const taskDueDateInputs = document.querySelectorAll("input[type='date']");
  taskDueDateInputs.forEach((task) => task.setAttribute("min", today));
}

function getAddNewTaskModalValues(categoryIndex, projectIndex) {
  const form = document.querySelector("#add-new-task-form");
  const taskNameInput = document.querySelector("#task-name");
  const taskDescInput = document.querySelector("#task-desc");
  const taskDueDateInput = document.querySelector("#task-due-date");
  const taskPriority = document.querySelector("#task-priority");

  if (
    taskNameInput.value.length > 0 &&
    taskDueDateInput.value.length > 0 &&
    taskPriority.value.length > 0
  ) {
    toDoList.newTask(
      taskNameInput.value,
      taskDescInput.value,
      taskDueDateInput.value,
      taskPriority.value,
      categoryIndex,
      projectIndex,
    );

    form.reset();
    document.querySelector("#add-new-task").close();
    renderMain().renderProject(categoryIndex, projectIndex);
  }
}

function EditTaskModalValues(arrayOfIndexes) {
  const EditTaskModal = document.querySelector("#edit-task");
  const taskNameInput = document.querySelector("#edit-task-name");
  const taskDescInput = document.querySelector("#edit-task-desc");
  const taskDueDateInput = document.querySelector("#edit-task-due-date");
  const taskPriority = document.querySelector("#edit-task-priority");
  const confirmButton = document.querySelector("#edit-task-confirm-btn");

  let tasksArray;
  if (arrayOfIndexes.length === 1) tasksArray = toDoList.inboxTasks;
  else {
    tasksArray =
      toDoList.categoryList[arrayOfIndexes[0]].categoryProjects[
        arrayOfIndexes[1]
      ].projectTasks;
  }

  const taskIndex =
    arrayOfIndexes.length === 1 ? arrayOfIndexes[0] : arrayOfIndexes[2];

  taskNameInput.value = tasksArray[taskIndex].name;
  taskDescInput.value = tasksArray[taskIndex].desc;
  taskDueDateInput.value = tasksArray[taskIndex].dueDate;
  taskPriority.value = tasksArray[taskIndex].priority;

  confirmButton.onclick = function () {
    toDoList.editTask(
      taskNameInput.value,
      taskDescInput.value,
      taskDueDateInput.value,
      taskPriority.value,
      arrayOfIndexes,
    );

    if (arrayOfIndexes.length === 1) renderMain().renderProject();
    else renderMain().renderProject(arrayOfIndexes[0], arrayOfIndexes[1]);

    EditTaskModal.close();
  };
}

function openCloseModal(triggerButton, modalElement, arrayOfIndexes) {
  const cancelButton = modalElement.querySelector(".cancel-btn");
  const button = triggerButton;

  button.onclick = () => {
    modalElement.showModal();
    if (arrayOfIndexes === undefined) EditTaskModalValues(arrayOfIndexes);
  };

  window.addEventListener("click", (e) => {
    if (e.target === modalElement) modalElement.close();
  });

  cancelButton.onclick = () => {
    modalElement.close();
  };
}

export function renderMainLinksContent() {
  const inboxLink = document.querySelector("#inbox-link");

  inboxLink.onclick = function () {
    renderMain().renderProject();
  };
}

export function renderNav() {
  const ulOfProjects = document.querySelector(".projects-list");
  ulOfProjects.textContent = "";

  const addNewCategoryInput = document.createElement("input");
  addNewCategoryInput.setAttribute("placeholder", "Add a new category");
  const addNewCategoryInputConfirmButton = document.createElement("button");
  addNewCategoryInputConfirmButton.textContent = "+";
  const newCategoryForm = document.createElement("form");

  newCategoryForm.addEventListener("submit", (event) => {
    if (addNewCategoryInput.value.length > 0) {
      event.preventDefault();
      toDoList.newCategory(addNewCategoryInput.value);
      renderNav();
    }
  });

  newCategoryForm.append(addNewCategoryInput, addNewCategoryInputConfirmButton);
  ulOfProjects.append(newCategoryForm);

  toDoList.categoryList.forEach((category, categoryIndex) => {
    const categoryName = document.createElement("li");
    categoryName.textContent = category.name;
    const deleteIcon = document.createElement("img");
    deleteIcon.src = deleteIconSVG;

    deleteIcon.onclick = function () {
      toDoList.removeCategory(categoryIndex);
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

    function addNewProjectInput(projectList, categoryId) {
      const inputElement = document.createElement("input");
      inputElement.setAttribute("placeholder", "Add a new project");
      const addNewProjectInputConfirmButton = document.createElement("button");
      const newProjectForm = document.createElement("form");
      addNewProjectInputConfirmButton.textContent = "+";
  
      newProjectForm.addEventListener("submit", (event) => {
        if (inputElement.value.length > 0) {
          event.preventDefault();
          toDoList.newProject(inputElement.value, categoryId);
          renderNav();
        }
      });
  
      newProjectForm.append(inputElement, addNewProjectInputConfirmButton);
      projectList.append(newProjectForm);
    }

    addNewProjectInput(categoryListOfProjects, categoryIndex);
    ulOfProjects.append(categoryName, categoryListOfProjects);
  });

}

export function renderMain() {
  const mainContainer = document.querySelector(".main");

  const renderProject = (categoryIndex, projectIndex) => {
    mainContainer.textContent = "";

    const title = document.createElement("h2");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = deleteIconSVG;
    const tasksContainer = document.createElement("div");

    let tasksArray;

    if (categoryIndex !== undefined) {
      tasksArray =
        toDoList.categoryList[categoryIndex].categoryProjects[projectIndex]
          .projectTasks;
      title.textContent =
        toDoList.categoryList[categoryIndex].categoryProjects[
          projectIndex
        ].name;
      title.append(deleteIcon);
      deleteIcon.onclick = () => {
        toDoList.removeProject(categoryIndex, projectIndex);
        renderNav();
        renderMain().renderProject();
      };
    } else {
      tasksArray = toDoList.inboxTasks;
      title.textContent = "INBOX";
    }

    mainContainer.append(title, tasksContainer);

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
        default:
      }
      return false;
    }

    function renderTasks() {
      tasksContainer.textContent = "";
      tasksArray.forEach((task, taskIndex) => {
        const taskCard = document.createElement("div");
        const taskName = document.createElement("h3");
        const taskDesc = document.createElement("p");
        const taskPriority = document.createElement("div");
        const taskDueDate = document.createElement("div");
        const editTaskButton = document.createElement("button");
        const removeTaskButton = document.createElement("button");

        taskCard.classList.add("card");
        taskPriority.classList.add(`p${task.priority}`);
        editTaskButton.classList.add("edit-task");
        removeTaskButton.classList.add("remove-task");

        taskCard.id = `card${task.id}`;

        taskName.textContent = task.name;
        taskDesc.textContent = task.desc;
        taskDueDate.textContent = task.dueDate;
        taskPriority.textContent = handlePriorityText(task.priority);
        editTaskButton.textContent = "EDIT TASK";
        removeTaskButton.textContent = "REMOVE TASK";

        taskCard.append(
          taskName,
          taskDueDate,
          taskDesc,
          taskPriority,
          taskDueDate,
          editTaskButton,
          removeTaskButton,
        );
        tasksContainer.append(taskCard);

        taskCard.onclick = function () {
            console.log("LOL")
          const currentHeight = window.getComputedStyle(taskCard).height;
          taskCard.style.height = currentHeight === "34px" ? "154px" : "34px";
        };

        if (tasksArray === toDoList.inboxTasks)
          openCloseModal(editTaskButton, document.querySelector("#edit-task"), [
            taskIndex,
          ]);
        else
          openCloseModal(editTaskButton, document.querySelector("#edit-task"), [
            categoryIndex,
            projectIndex,
            taskIndex,
          ]);

        removeTaskButton.onclick = function () {
          if (tasksArray === toDoList.inboxTasks)
            toDoList.removeTask([taskIndex]);
          else toDoList.removeTask([categoryIndex, projectIndex, taskIndex]);
          document.querySelector(`#card${task.id}`).remove();
        };
      });
    }

    function renderNewTaskButton() {
      const divContainer = document.createElement("button");
      divContainer.textContent = "ADD A NEW TASK";
      divContainer.id = "add-new-task-btn";
      tasksContainer.appendChild(divContainer);
      openCloseModal(divContainer, document.querySelector("#add-new-task"));
    }

    function renderEverything(arg) {
      renderTasks(arg);
      renderNewTaskButton();
    }

    const confirmButton = document.querySelector("#add-task-confirm-btn");

    document
      .querySelector("#add-new-task-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
      });

    document
      .querySelector("#edit-task-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
      });

    confirmButton.onclick = function (e) {
      e.preventDefault();
      getAddNewTaskModalValues(categoryIndex, projectIndex);
      renderEverything();
    };

    renderEverything();
  };

  return { renderProject };
}
