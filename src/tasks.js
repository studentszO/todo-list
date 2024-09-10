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
        return { name, projectTasks, id };
    }

    function assignTaskToProject(task, project) {
        return project.projectTasks.push(task)
    }

    function deleteTask(taskId) {
        projectList.forEach((project) => project.projectTasks.forEach((task, index) => task.id === taskId ? project.projectTasks.splice(index, 1): false))
    }

    let projectId = 0;
    let taskId = 0;

    const projectList = [];
    const defaultProject = newProject("default");

    return { newTask, newProject, assignTaskToProject, deleteTask, projectList }
})();