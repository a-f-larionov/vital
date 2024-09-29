import { TableContainer, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import { Paper, Table } from "@mui/material";

import TaskRow from "./TaskRow";

function TaskTable({ tasks, setTasks }) {
  const rows =
    tasks
      .filter(task => task.toDelete !== true)
      .map(task =>
        <TaskRow key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
      );

  return <TableContainer component={Paper} >
    <Table sx={{ minWidth: 50, padding: 15 }} size="small" padding="none" aria-label="simple table">
      <TableHead>
        <TableRow >
          <TableCell ></TableCell>
          <TableCell align="center">12&nbsp;</TableCell>
          <TableCell align="center">13&nbsp;</TableCell>
          <TableCell align="center">14&nbsp;</TableCell>
          <TableCell align="center">15&nbsp;</TableCell>
          <TableCell align="center">16&nbsp;</TableCell>
          <TableCell align="center">17&nbsp;</TableCell>
          <TableCell align="center" border="1px">7 д.&nbsp;</TableCell>
          <TableCell align="center">30 д.&nbsp;</TableCell>
          <TableCell align="center"><b>18.</b></TableCell>
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