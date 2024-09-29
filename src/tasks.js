import { loadOBjectFromLocalStorage } from "./localStorage";
import { saveObjectToLocalStorage } from "./localStorage";

export const taskFactory = (function () {

    function newTask(name, desc, dueDate, priority, categoryIndex, projectIndex) {
        const id = taskId;
        taskId++;
        if (categoryIndex === undefined) {
            inboxTasks.push({ name, desc, dueDate, priority, taskCompleted, id })
        }
        else {
            assignTaskToProject({ name, desc, dueDate, priority, taskCompleted, id }, 
                              categoryList[categoryIndex].categoryProjects[projectIndex]);
        }
        saveObjectToLocalStorage();
        return { name, desc, dueDate, priority, id };
    };

    function newProject(name, categoryIndex) {
        const projectTasks = [];
        const id = projectId;
        projectId++;
        assignProjectToCategory({ name, projectTasks, id }, categoryList[categoryIndex] || defaultCategory);
        saveObjectToLocalStorage();
        return { name, projectTasks, id };
    };

    function newCategory(name) {
        const categoryProjects = [];
        const id = categoryId;
        categoryId++;
        categoryList.push({ name, categoryProjects, id });
        saveObjectToLocalStorage();
        return { name, categoryProjects, id }
    };

    function assignTaskToProject(task, project) {
        return project.projectTasks.push(task);
    };

    function assignProjectToCategory(project, category) {
        return category.categoryProjects.push(project);
    };

    function removeTask(arrayOfIndexes) {
        console.log(arrayOfIndexes)
        if (arrayOfIndexes.length === 1)
            inboxTasks.splice(arrayOfIndexes[0], 1)
        else
            categoryList[arrayOfIndexes[0]].categoryProjects[arrayOfIndexes[1]].projectTasks.splice(arrayOfIndexes[2], 1)
        saveObjectToLocalStorage();
    };

    function editTask(taskName, taskDesc, taskDueDate, taskPriority, arrayOfIndexes) {
        console.log(arrayOfIndexes)
        let task;
        if (arrayOfIndexes.length === 1)
            task = inboxTasks[arrayOfIndexes[0]]
        else
            task = categoryList[arrayOfIndexes[0]].categoryProjects[arrayOfIndexes[1]].projectTasks[arrayOfIndexes[2]];

        task.name = taskName;
        task.desc = taskDesc;
        task.dueDate = taskDueDate;
        task.priority = taskPriority;
        saveObjectToLocalStorage();
    };

    function removeCategory(categoryIndex) {
        categoryList.splice(categoryIndex, 1);
        saveObjectToLocalStorage();
    };

    function removeProject(categoryIndex, projectIndex) {
        categoryList[categoryIndex].categoryProjects.splice(projectIndex, 1);
        saveObjectToLocalStorage();
    };

    let projectId = 0;
    let taskId = 0;
    let categoryId = 0;

    const loadStorage = loadOBjectFromLocalStorage();

    const inboxTasks = loadStorage === false ? [] : loadStorage[1];
    const categoryList = loadStorage === false ? [] : loadStorage[0];

    if (loadStorage === false) {
        const today = new Date().toISOString().split('T')[0];
        const myFirstTask = taskFactory.newTask("My First Task", 'Lorem ipsum odor amet, consectetuer adipiscing elit. Hac ullamcorper nostra proin laoreet massa. Porta aenean penatibus varius bibendum accumsan adipiscing cubilia diam hac.', today, "2", 0, 0);
        const defaultCategory = newCategory("My First Category");
        const defaultProject = newProject("My First project");
    }

    return { newTask, newProject, assignTaskToProject, removeTask, newCategory, categoryList, inboxTasks, editTask, removeCategory, removeProject }
})();