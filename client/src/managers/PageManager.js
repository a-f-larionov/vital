import React, { useState } from "react";

function PageManager() {

}

PageManager.PAGE_MAIN = 1;
PageManager.PAGE_EDIT_TIKS = 2;
PageManager.pageParamA = undefined
PageManager.currentPage = undefined;
PageManager.pageTitle = "Vital Manager";

PageManager.init = function (currentPage, setCurrentPage) {
    PageManager.currentPage = currentPage;
    PageManager.setCurrentPage = setCurrentPage;
}

PageManager.setPage = function (pageId, title, pageParamA) {
    PageManager.setCurrentPage(pageId);
    PageManager.pageTitle = title;
    PageManager.pageParamA = pageParamA;
};

PageManager.isMain = function () {
    return PageManager.currentPage === PageManager.PAGE_MAIN;
}

export default PageManager;