import {
  loadOBjectFromLocalStorage,
  saveObjectToLocalStorage,
} from "./localStorage";

const loadedStorage = loadOBjectFromLocalStorage();

const toDoFactory = function () {
  let projectId = 0;
  let taskId = 0;
  let categoryId = 0;

  const inboxTasks = loadedStorage === false ? [] : loadedStorage[1];
  const categoryList = loadedStorage === false ? [] : loadedStorage[0];

  function assignTaskToProject(task, project) {
    return project.projectTasks.push(task);
  }

  function assignProjectToCategory(project, category) {
    return category.categoryProjects.push(project);
  }

  function newTask(name, desc, dueDate, priority, categoryIndex, projectIndex) {
    const id = taskId;
    taskId += taskId;

    if (categoryIndex === undefined) {
      inboxTasks.push({
        name,
        desc,
        dueDate,
        priority,
        id,
      });
    } else {
      assignTaskToProject(
        {
          name,
          desc,
          dueDate,
          priority,
          id,
        },
        categoryList[categoryIndex].categoryProjects[projectIndex],
      );
    }

    saveObjectToLocalStorage();
    return {
      name,
      desc,
      dueDate,
      priority,
      id,
    };
  }

  function newProject(name, categoryIndex) {
    const projectTasks = [];
    const id = projectId;
    projectId += projectId;
    assignProjectToCategory(
      { name, projectTasks, id },
      categoryList[categoryIndex],
    );
    saveObjectToLocalStorage();
    return { name, projectTasks, id };
  }

  function newCategory(name) {
    const categoryProjects = [];
    const id = categoryId;
    categoryId += categoryId;
    categoryList.push({ name, categoryProjects, id });
    saveObjectToLocalStorage();
    return { name, categoryProjects, id };
  }

  function removeTask(arrayOfIndexes) {
    if (arrayOfIndexes.length === 1) inboxTasks.splice(arrayOfIndexes[0], 1);
    else {
      categoryList[arrayOfIndexes[0]].categoryProjects[
        arrayOfIndexes[1]
      ].projectTasks.splice(arrayOfIndexes[2], 1);
    }
    saveObjectToLocalStorage();
  }

  function editTask(
    taskName,
    taskDesc,
    taskDueDate,
    taskPriority,
    arrayOfIndexes,
  ) {
    let task;

    if (arrayOfIndexes.length === 1) task = inboxTasks[arrayOfIndexes[0]];
    else {
      task =
        categoryList[arrayOfIndexes[0]].categoryProjects[arrayOfIndexes[1]]
          .projectTasks[arrayOfIndexes[2]];
    }

    task.name = taskName;
    task.desc = taskDesc;
    task.dueDate = taskDueDate;
    task.priority = taskPriority;

    saveObjectToLocalStorage();
  }

  function removeCategory(categoryIndex) {
    categoryList.splice(categoryIndex, 1);
    saveObjectToLocalStorage();
  }

  function removeProject(categoryIndex, projectIndex) {
    categoryList[categoryIndex].categoryProjects.splice(projectIndex, 1);
    saveObjectToLocalStorage();
  }

  return {
    newTask,
    newProject,
    removeTask,
    newCategory,
    editTask,
    removeCategory,
    removeProject,
    categoryList,
    inboxTasks,
  };
};

const toDoList = toDoFactory();
export default toDoList;

if (loadedStorage === false) {
  const today = new Date().toISOString().split("T")[0];
  toDoList.newCategory("My First Category");
  toDoList.newProject("My First project", 0);
  toDoList.newTask(
    "My First Task",
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Hac ullamcorper nostra proin laoreet massa. Porta aenean penatibus varius bibendum accumsan adipiscing cubilia diam hac.",
    today,
    "2",
    0,
    0,
  );
}
