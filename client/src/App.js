
import React, { useState } from "react";
import AuthForm from "./elements/AuthForm";
import LoadingProgress from './elements/LoadingProgress';
import PageRouter from './elements/PageRouters';
import CommentManager from './managers/CommentsManager';
import MetricaManager from './managers/MetricaManager';
import PageManager from './managers/PageManager';
import TaskManager from "./managers/TaskManager";
import UserManager from './managers/UserManager';

function App() {
    const [tasks, setTasks] = useState(null);
    const [collapsAll, setCollapsAll] = useState(false);
    const [comments, setComments] = useState(null);
    const [userProfile, setUserProfile] = useState(() => {
        let userProfile = localStorage.getItem('userProfile');
        return userProfile ? JSON.parse(userProfile) : {};
    });
    const [currentPage, setCurrentPage] = useState(PageManager.PAGE_MAIN);
    const [collapsed, setCollapsed] = useState({});
    const [metrica, setMetrica] = useState([]);
    PageManager.init(currentPage, setCurrentPage, collapsed, setCollapsed);
    UserManager.setUserProfile(userProfile);
    MetricaManager.load(metrica, setMetrica);

    if (userProfile.id === undefined) {
        return (<AuthForm setUserProfile={setUserProfile} />);
    }

    if (tasks === null || comments === null) {
        TaskManager.init(setTasks);
        CommentManager.init(setComments);
        return <LoadingProgress />
    }
    return <PageRouter tasks={tasks} setTasks={setTasks} collapsAll={collapsAll} setCollapsAll={setCollapsAll}/>
}

export default App;

