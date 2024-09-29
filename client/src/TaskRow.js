import { TableRow, TableCell } from "@mui/material";
import TaskTools from "./TaskTools";

function TaskRow({ task, tasks, setTasks }) {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row" align="right">{task.title}</TableCell>
            <TableCell align="center">{task.counter}</TableCell>
            <TableCell align="center">{task.counter}</TableCell>
            <TableCell align="center">{task.counter}</TableCell>
            <TableCell align="center">{task.counter}</TableCell>
            <TableCell align="center">{task.counter}</TableCell>
            <TableCell align="center">{task.counter}</TableCell>
            <TableCell align="center">{task.counter * 7}</TableCell>
            <TableCell align="center">{task.counter * 30}</TableCell>
            <TableCell align="center">{task.counter}</TableCell>
            <TableCell align="center">
                <TaskTools task={task} tasks={tasks} setTasks={setTasks} />
            </TableCell>
        </TableRow>);
}

export default TaskRow;