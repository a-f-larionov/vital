
import { Grid2 } from "@mui/material";
import TaskManager from "../managers/TaskManager";
import TaskRowShort from "./short/TaskRowShort";

function TaskList({ tasks, setTasks }) {
  let tasksViewData = TaskManager.getTable();
  
  const rows =
    tasksViewData
      .tasks.map(task =>
        <TaskRowShort
          key={"task" + task.task.id}
          task={task.task}
          rows={task.rows}
          cols={tasksViewData.cols}
          tasks={tasks} setTasks={setTasks} />
      );

  return (
    <Grid2 sx={{ padding: 0, textAlign: 'right' }} rowSpacing={20}>
      {rows}
    </Grid2>);
}

export default TaskList;