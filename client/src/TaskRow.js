import { TableCell, TableRow } from "@mui/material";
import TaskTools from "./TaskTools";

function TaskRow({ title, cells, task, tasks, setTasks }) {
    let i = 0;
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row" align="right">{title}</TableCell>

            {cells.map((cell) => {
                return (
                    <TableCell key={cell.title+(i++)} align="center">{cell.title}</TableCell>
                );
            })}

            <TableCell align="center">
                <TaskTools task={task} tasks={tasks} setTasks={setTasks} />
            </TableCell>
        </TableRow>);
}

export default TaskRow;