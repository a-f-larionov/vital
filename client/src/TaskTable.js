import { TableContainer, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import { Paper, Table } from "@mui/material";

import TaskRow from "./TaskRow";
import TaskManager from "./TaskManager";

function TaskTable({ tasks, setTasks }) {
  let table = TaskManager.getTable(tasks);
  console.log(table);

  const rows =
    table.rows
      .map(row =>
        <TaskRow
          key={row.id}
          title={row.title}
          cells={row.cells}
          task={row.task} tasks={tasks} setTasks={setTasks} />
      );


  return <TableContainer component={Paper} >
    <Table sx={{ minWidth: 50, padding: 15 }} size="small" padding="none" aria-label="simple table">
      <TableHead>
        <TableRow >
          <TableCell align="center" ></TableCell>
          {
            table.cols.map(col => {
              return (
                <TableCell key={col.title} align="center">
                  {col.title}
                </TableCell>
              );
            })
          }
          {/* <TableCell align="center" border="1px">7 д.&nbsp;</TableCell>
          <TableCell align="center">30 д.&nbsp;</TableCell>
          <TableCell align="center"><b>18.</b></TableCell>
           */}
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {rows}

      </TableBody>
    </Table>
  </TableContainer>;
}

export default TaskTable;