export const taskFactory = (function () {

    function newTask(name, desc, dueDate, priority, categoryIndex, projectIndex) {
        const taskCompleted = false;
        const id = taskId;
        taskId++;
        // const categoryIndex = categoryList.findIndex((category) => category.id === Number(categoryId));
        // const projectIndex = categoryList[categoryIndex].categoryProjects.findIndex((project) => project.id === Number(projectId));
        assignTaskToProject({ name, desc, dueDate, priority, taskCompleted, id }, 
                              categoryList[categoryIndex].categoryProjects[projectIndex] || defaultProject);
        return { name, desc, dueDate, priority, taskCompleted, id };
    }

    function newProject(name, categoryIndex) {
        const projectTasks = [];
        const id = projectId;
        projectId++;
        assignProjectToCategory({ name, projectTasks, id }, categoryList[categoryIndex] || defaultCategory);
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

    function removeTask(categoryIndex, projectIndex, taskIndex) {
        console.log(categoryIndex, projectIndex, taskIndex)
        // projectList.forEach((project) => project.projectTasks.forEach((task, index) => task.id === taskId ? project.projectTasks.splice(index, 1): false))
        categoryList[categoryIndex].categoryProjects[projectIndex].projectTasks.splice(taskIndex, 1)
    }

    function editTask(taskName, taskDesc, taskDueDate, taskPriority, arrayOfIndexes) {
        //TODO --------- projectList.forEach((project) => project.projectTasks.forEach((task, index) => task.id === taskId ? (task.name = taskName) && (task.desc = taskDesc) && (task.dueDate = taskDueDate) && (task.priority = taskPriority) : false))
        const task = categoryList[arrayOfIndexes[0]].categoryProjects[arrayOfIndexes[1]].projectTasks[arrayOfIndexes[2]];
        task.name = taskName;
        task.desc = taskDesc;
        task.dueDate = taskDueDate;
        task.priority = taskPriority;
    }

    function removeCategory(categoryIndex) {
        // const index = categoryList.findIndex(category => category.id === Number(categoryId));
        categoryList.splice(categoryIndex, 1);
    }

    function removeProject(categoryIndex, projectIndex) {
        // const index = projectList.findIndex(project => project.id === Number(projectId));
        categoryList[categoryIndex].categoryProjects.splice(projectIndex, 1);
    }

    let projectId = 0;
    let taskId = 0;
    let categoryId = 0;

    const categoryList = [];
    const defaultCategory = newCategory("My First Category");
    const defaultProject = newProject("My First project");

    return { newTask, newProject, assignTaskToProject, removeTask, newCategory, categoryList, editTask, removeCategory, removeProject }
})();