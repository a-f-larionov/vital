import { ConfigProvider } from "antd";
import TaskList from "./TaskList";
import TiksLits from "./TiksList";
import PageManager from "../managers/PageManager";

function ContentPage({ tasks, setTasks }) {

    switch (PageManager.currentPage) {
        case PageManager.PAGE_MAIN:
            return <TaskList tasks={tasks} setTasks={setTasks} />;
            break;
        case PageManager.PAGE_EDIT_TIKS:
            return <TiksLits tasks={tasks} setTasks={setTasks}/>;
            break;
    }

}

export default ContentPage;