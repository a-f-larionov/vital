
function PageManager() {
}

PageManager.PAGE_MAIN = 1;
PageManager.PAGE_EDIT_TIKS = 2;
PageManager.PAGE_CALENDAR = 3;
PageManager.pageParamA = undefined
PageManager.pageParamB = undefined
PageManager.currentPage = undefined;
PageManager.defaulTitle = "Я хочу и Я сделаю!";
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

PageManager.isCollapsed = function (taskId) {
    return PageManager.collapsed[taskId] ? PageManager.collapsed[taskId] : false;
}
PageManager.collapsAll = function (tasks, setTasks, collapsAll) {
    tasks.forEach(task => {
        task.isCollapsed = collapsAll;
    });
    setTasks([...tasks]);
}

PageManager.toggleCollapse = function (task, tasks, setTasks) {
    task.isCollapsed = task.isCollapsed !== undefined ? !task.isCollapsed : false;
    setTasks([...tasks]);
}

export default PageManager;