import { TableCell, TableRow } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TaskMenu from './TaskMenu';
import TaskMenu2 from './TaskMenu2';

function TaskItem({ title, cells, cols, task, tasks, setTasks }) {
    let i = 0;
    return (
        <Grid2 container component={Paper} sx={{ marginBottom: 1, marginLeft: 2, marginRight: 2 }}>

            <Grid2 size={1} sx={{ textAlign: "center", alignContent: 'center' }}>
                📗
            </Grid2>
            <Grid2 size={10} sx={{ textAlign: 'center', alignContent: 'center' }} >
                {task.title}
            </Grid2>
            <Grid2 size={1} sx={{ textAlign: 'center', alignContent: 'center' }}>
                <TaskMenu task={task} tasks={tasks} setTasks={setTasks}></TaskMenu>
            </Grid2>

            <Grid2 size={1} sx={{ verticalAlign: "bottom", paddingRight: 2 }}>
                <TaskMenu2 task={task} tasks={tasks} setTasks={setTasks}></TaskMenu2>
            </Grid2>

            <Grid2 size={11}>
                <TableContainer >
                    <Table size="small">
                        <TableBody key={task.id + 'body'}>

                            <TableRow key={1}>
                                {cols.map((c) => {
                                    return <TableCell key={task.id + c.date}
                                        sx={{ fontSize: 10, lineHeight: 1, margin: 0, paddingRight: 0 }}>
                                        <i>{c.date}</i>
                                        <b style={{ fontSize: 7 }}>&nbsp;{c.weekDay} </b>
                                    </TableCell>
                                })}
                            </TableRow>

                            <TableRow key={2} sx={{ padding: 0, margin: 0 }} >
                                {cells.map((cell) => {
                                    return <TableCell key={++i} 
                                        sx={{ fontSize: 10, lineHeight: 1, margin: 0, paddingRight: 0 }}>
                                        {cell.title}
                                    </TableCell>
                                })}
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
        </Grid2>

    );
    // <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
}

export default TaskItem;