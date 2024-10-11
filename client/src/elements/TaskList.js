
import { Grid2 } from "@mui/material";
import TaskManager from "../managers/TaskManager";
import TaskRowShort from "./TaskRowShort";

function TaskList({ tasks, setTasks }) {
  let table = TaskManager.getTable(tasks);

  const rows =
    table.rows
      .map(row =>
        <TaskRowShort
          key={row.id}
          cols={table.cols}
          title={row.title}
          cells={row.cells}
          task={row.task} tasks={tasks} setTasks={setTasks} />
      );


  return (
    <Grid2 sx={{ padding: 0, textAlign: 'right' }} rowSpacing={20}>
      {rows}
    </Grid2>);
}

export default TaskList;