import { TableCell, TableRow } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TaskMenu from './TaskMenu';
import TaskMenu2 from './TaskMenu2';


function TaskItem({ title, cells, cols, task, tasks, setTasks }) {

    return (
        <Grid2 container component={Paper} sx={{ marginBottom: 1 }}>

            <Grid2 size={1} sx={{ textAlign: "center", alignContent: 'center' }}>
                📗
            </Grid2>
            <Grid2 size={10} sx={{ textAlign: 'center', alignContent: 'center' }}>
                {task.title}
            </Grid2>
            <Grid2 size={1} sx={{ textAlign: 'center', alignContent: 'center' }}>
                <TaskMenu task={task} tasks={tasks} setTasks={setTasks}></TaskMenu>
            </Grid2>

            <Grid2 size={10}>
                <TableContainer >
                    <Table size="small">
                        <TableBody>
                            <TableRow >
                                {cols.map((c) => {
                                    return <TableCell sx={{ fontSize: 10, lineHeight: 1 }}>
                                        <i>{c.date}</i>
                                        <b style={{ fontSize: 7 }}>&nbsp;{c.weekDay} </b>
                                    </TableCell>
                                })}
                            </TableRow>
                            <TableRow sx={{ padding: 0 }}>
                                {cells.map((cell) => {
                                    return <TableCell>{cell.title}</TableCell>
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
            <Grid2 size={2} sx={{ verticalAlign: "bottom" }}>
                <TaskMenu2 task={task} tasks={tasks} setTasks={setTasks}></TaskMenu2>
            </Grid2>
        </Grid2>

    );
    // <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

    //     <TableCell component="th" scope="row" align="right">{title}</TableCell>

    //     {cells.map((cell) => {
    //         return (
    //             <TableCell key={cell.title+(i++)} align="center">{cell.title}</TableCell>
    //         );
    //     })}

    //     <TableCell align="center">
    //         <TaskTools task={task} tasks={tasks} setTasks={setTasks} />
    //     </TableCell>
    // </TableRow>);
}

export default TaskItem;