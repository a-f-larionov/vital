import PageManager from "../managers/PageManager";
import TaskList from "../elements/TaskList";
import TiksList from "../elements/tiks/TiksList";
import Calendar from "../elements/Calendar";
import LoadingProgress from "../elements/LoadingProgress";

function ContentPage({ tasks, setTasks }) {

    switch (PageManager.currentPage) {
        case PageManager.PAGE_MAIN:
            return <TaskList />;
        case PageManager.PAGE_EDIT_TIKS:
            return <TiksList tasks={tasks} setTasks={setTasks} />;
        case PageManager.PAGE_CALENDAR:
            return <Calendar tasks={tasks} />
        default:
            return <LoadingProgress />
    }
}

export default ContentPage;