import React, { useState } from "react";

function PageManager() {

}

PageManager.PAGE_MAIN = 1;
PageManager.PAGE_EDIT_TIKS = 2;
PageManager.pageParamA = undefined
PageManager.currentPage = undefined;

PageManager.init = function (currentPage, setCurrentPage) {
    PageManager.currentPage = currentPage;
    PageManager.setCurrentPage = setCurrentPage;
}

PageManager.setPage = function (pageId, pageParamA) {
    PageManager.setCurrentPage(pageId);
    PageManager.pageParamA = pageParamA;
};

PageManager.isMain = function () {
    return PageManager.currentPage === PageManager.PAGE_MAIN;
}

export default PageManager;