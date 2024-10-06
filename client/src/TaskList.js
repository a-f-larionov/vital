
import Box from "@mui/material/Box";
import TaskItem from "./TaskItem";
import TaskManager from "./TaskManager";
import { Grid2 } from "@mui/material";

function TaskList({ tasks, setTasks }) {
  let table = TaskManager.getTable(tasks);
  console.log(table);

  const rows =
    table.rows
      .map(row =>
        <TaskItem
          key={row.id}
          cols={table.cols}
          title={row.title}
          cells={row.cells}
          task={row.task} tasks={tasks} setTasks={setTasks} />
      );


  return <Grid2 sx={{padding:2}} rowSpacing={10}>
    {rows}
  </Grid2> ;
}

export default TaskList;