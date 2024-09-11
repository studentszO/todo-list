export const taskFactory = (function () {

    function newTask(name, desc, dueDate, priority) {
        const taskCompleted = false;
        const id = taskId;
        assignTaskToProject({ name, desc, dueDate, priority, taskCompleted, id }, defaultProject);
        return { name, desc, dueDate, priority, taskCompleted, id };
    }

    function newProject(name) {
        const projectTasks = [];
        const id = projectId;
        projectId++;
        projectList.push({ name, projectTasks, id })
        assignProjectToCategory({ name, projectTasks, id }, defaultCategory)
        return { name, projectTasks, id };
    }

    function newCategory(name) {
        const categoryProjects = [];
        const id = categoryId;
        categoryId++;
        categoryList.push({ name, categoryProjects, id });
        return { name, categoryProjects, id }
    }

    function assignTaskToProject(task, project) {
        return project.projectTasks.push(task);
    }

    function assignProjectToCategory(project, category) {
        return category.categoryProjects.push(project);
    }

    function deleteTask(taskId) {
        projectList.forEach((project) => project.projectTasks.forEach((task, index) => task.id === taskId ? project.projectTasks.splice(index, 1): false))
    }

    let projectId = 0;
    let taskId = 0;
    let categoryId = 0;

    const categoryList = [];
    const projectList = [];
    const defaultCategory = newCategory("My First Category");
    const defaultProject = newProject("default");

    return { newTask, newProject, assignTaskToProject, deleteTask, projectList, newCategory, categoryList }
})();