
import React, { useState } from "react";
import AuthForm from "./elements/AuthForm";
import LoadingProgress from './elements/LoadingProgress';
import PageRouter from './elements/PageRouters';
import CommentManager from './managers/CommentsManager';
import MaterialManager from "./managers/MaterialManager";
import MetricsManager from "./managers/MetricsManager";
import PageManager from './managers/PageManager';
import TaskManager from "./managers/TaskManager";
import UserManager from './managers/UserManager';

function App() {
    const [tasks, setTasks] = useState(null);
    const [materials, setMaterials] = useState(null);
    const [lastOne, setLastOne] = useState({});
    const [collapsAll, setCollapsAll] = useState(false);
    const [comments, setComments] = useState(null);
    const [userProfile, setUserProfile] = useState(() => {
        let userProfile = localStorage.getItem('userProfile');
        return userProfile ? JSON.parse(userProfile) : {};
    });
    const [currentPage, setCurrentPage] = useState(PageManager.PAGE_MAIN);
    const [collapsed, setCollapsed] = useState({});
    const [metrics, setMetrics] = useState([]);
    PageManager.init(currentPage, setCurrentPage, collapsed, setCollapsed);
    UserManager.setUserProfile(userProfile);
    MetricsManager.load(metrics, setMetrics);

    if (userProfile.id === undefined) {
        return (<AuthForm setUserProfile={setUserProfile} />);
    }

    if (tasks === null) {
        TaskManager.init(setTasks);
        MaterialManager.init(setMaterials);
        CommentManager.init(setComments);
        return <LoadingProgress />
    }
    TaskManager.setState(tasks, lastOne, setLastOne);
    MaterialManager.setState(materials, setMaterials);
    return <PageRouter tasks={tasks} setTasks={setTasks} collapsAll={collapsAll} setCollapsAll={setCollapsAll} />
}

export default App;

