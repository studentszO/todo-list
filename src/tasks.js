export const taskFactory = (function () {

    function newTask(name, desc, dueDate, priority, projectId) {
        const taskCompleted = false;
        const id = taskId;
        taskId++;
        assignTaskToProject({ name, desc, dueDate, priority, taskCompleted, id }, 
                            projectList[projectList.findIndex(project => project.id === Number(projectId))] || defaultProject);
        return { name, desc, dueDate, priority, taskCompleted, id };
    }

    function newProject(name, categoryId) {
        const projectTasks = [];
        const id = projectId;
        projectId++;
        projectList.push({ name, projectTasks, id })
        assignProjectToCategory({ name, projectTasks, id }, categoryList[categoryList.findIndex(category => category.id === Number(categoryId))] || defaultCategory);
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

    function removeTask(taskId) {
        projectList.forEach((project) => project.projectTasks.forEach((task, index) => task.id === taskId ? project.projectTasks.splice(index, 1): false))
    }

    function editTask(taskId, taskName, taskDesc, taskDueDate, taskPriority) {
        projectList.forEach((project) => project.projectTasks.forEach((task, index) => task.id === taskId ? (task.name = taskName) && (task.desc = taskDesc) && (task.dueDate = taskDueDate) && (task.priority = taskPriority) : false))
    }

    function removeCategory(categoryId) {
        const index = categoryList.findIndex(category => category.id === Number(categoryId));
        categoryList.splice(index, 1);
    }

    function removeProject(projectId) {
        const index = projectList.findIndex(project => project.id === Number(projectId));
        projectList.splice(index, 1);
    }

    let projectId = 0;
    let taskId = 0;
    let categoryId = 0;

    const categoryList = [];
    const projectList = [];
    const defaultCategory = newCategory("My First Category");
    const defaultProject = newProject("My First project");

    return { newTask, newProject, assignTaskToProject, removeTask, projectList, newCategory, categoryList, editTask, removeCategory, removeProject }
})();