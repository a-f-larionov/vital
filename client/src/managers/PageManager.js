import TaskManager from "./TaskManager";

function PageManager() {
}

PageManager.PAGE_MAIN = 1;
PageManager.PAGE_EDIT_TIKS = 2;
PageManager.PAGE_CALENDAR = 3;
PageManager.pageParamA = undefined
PageManager.pageParamB = undefined
PageManager.currentPage = undefined;
PageManager.defaulTitle = "Достигейтинг!🚀";
PageManager.pageTitle = PageManager.defaulTitle;

PageManager.init = function (currentPage, setCurrentPage, collapsed, setCollapsed) {
    PageManager.currentPage = currentPage;
    PageManager.setCurrentPage = setCurrentPage;
    PageManager.collapsed = collapsed;
    PageManager.setCollapsed = setCollapsed;
}

PageManager.setPage = function (pageId, title, pageParamA, pageParamB) {
    PageManager.setCurrentPage(pageId);
    PageManager.pageTitle = title === '' ? PageManager.defaulTitle : title;
    PageManager.pageParamA = pageParamA;
    PageManager.pageParamB = pageParamB;
};

PageManager.isMain = function () {
    return PageManager.currentPage === PageManager.PAGE_MAIN;
}

PageManager.collapsAll = function (tasks, setTasks, collapsAll) {
    tasks.forEach(task => {
        task.isCollapsed = collapsAll;
        task.metrics.forEach(metric => {
            if (TaskManager.sw[task.id + '_' + metric.id]) task.isCollapsed = false;
        });
    });
    TaskManager.setTasks([...tasks]);
}

PageManager.toggleCollapse = function (task) {
    let tasks = TaskManager.tasks;
    task.isCollapsed = task.isCollapsed !== undefined ? !task.isCollapsed : false;
    TaskManager.setTasks([...tasks]);
}

export default PageManager;