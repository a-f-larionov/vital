
import { Grid2 } from "@mui/material";
import TaskManager from "../managers/TaskManager";
import TaskRowShort from "./TaskRowShort";

function TaskList({ tasks, setTasks }) {
  let tasksViewData = TaskManager.getTable(tasks);

  const rows =
    tasksViewData
      .metrics.map(metric =>
        <TaskRowShort
          key={"task" + metric.task.id}
          task={metric.task}
          cols={tasksViewData.cols}
          cells={metric.cells}
          tasks={tasks} setTasks={setTasks} />
      );

  return (
    <Grid2 sx={{ padding: 0, textAlign: 'right' }} rowSpacing={20}>
      {rows}
    </Grid2>);
}

export default TaskList;