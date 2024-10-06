import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { TableCell, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TaskMenu from './TaskMenu';


function TaskItem({ title, cells, task, tasks, setTasks }) {
    let i = 0;
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

            <Grid2 size={11}>
                <TableContainer >
                    <Table size="small">
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ fontSize: 11 }}>ср</TableCell>
                                <TableCell sx={{ fontSize: 11 }}>пн</TableCell>
                                <TableCell sx={{ fontSize: 11 }}>сб</TableCell>
                                <TableCell sx={{ fontSize: 11 }}>вс</TableCell>
                                <TableCell sx={{ fontSize: 11 }}>чт</TableCell>
                                <TableCell sx={{ fontSize: 11 }}>вт</TableCell>
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
            <Grid2 size={1} sx={{ verticalAlign: "bottom" }}>
                <Button sx={{ height: '100%' }}>
                    <AutoFixHighIcon fontSize='small'></AutoFixHighIcon>
                </Button>
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