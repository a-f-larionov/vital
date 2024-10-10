import { Grid2, Paper, TableCell, TableRow } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import MetricRightMenu from "../elements/MetricRightMenu";
import MetricaManager from "../managers/MetricaManager";
import PageManager from "../managers/PageManager";
import MetricLeftMenu from './MetricLeftMenu';
import TaskMenu from './TaskMenu';

function TaskItem({ title, cells, cols, task, tasks, setTasks }) {
    let i = 0;

    let metrica = MetricaManager.metrica;

    function onListMenuClick({ task, tasks, setTasks }) {

        PageManager.setPage(PageManager.PAGE_EDIT_TIKS, task);
    }

    return (
        <Grid2 container component={Paper} sx={{ marginBottom: 1, marginLeft: 2, marginRight: 2 }}>

            <Grid2 size={1} sx={{ textAlign: "center", alignContent: 'center' }}>
                {task.mId1 ? metrica.filter((m) => { return m.id == task.mId1; })[0].icon : ''}
                &nbsp;
                {task.mId2 ? metrica.filter((m) => { return m.id == task.mId2; })[0].icon : ''}
            </Grid2>
            <Grid2 size={10} sx={{ textAlign: 'center', alignContent: 'center' }} >
                {task.title}
            </Grid2>

            <Grid2 size={1} sx={{ textAlign: 'center', alignContent: 'center' }}>
                <TaskMenu task={task} tasks={tasks} setTasks={setTasks} />
            </Grid2>

            <Grid2 size={1} sx={{ verticalAlign: "bottom", paddingRight: 2 }}>
                <MetricLeftMenu task={task} tasks={tasks} setTasks={setTasks} />
            </Grid2>

            <Grid2 size={10}>
                <TableContainer >
                    <Table size="small">
                        <TableBody key={task.id + 'body'}>

                            <TableRow key={1}>
                                {cols.map((c) => {
                                    return <TableCell key={task.id + c.date}
                                        sx={{ fontSize: 10, lineHeight: 1, margin: 0,paddingLeft:0, paddingRight: 0 }}>
                                        <i>{c.date}</i>
                                        <b style={{ fontSize: 8 }}>&nbsp;{c.weekDay} </b>
                                    </TableCell>
                                })}
                            </TableRow>

                            <TableRow key={2} sx={{ padding: 0, margin: 0 }} >
                                {cells.map((cell) => {
                                    return <TableCell key={++i}
                                        sx={{ fontSize: 18, lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0 }}>
                                        {cell.title}
                                    </TableCell>
                                })}
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>

            <Grid2 size={1}>
                <TableContainer >
                    <Table size="small">
                        <TableBody key={task.id + 'body'}>

                            <TableRow key={1}>
                                <TableCell
                                    sx={{ fontSize: 10, lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0 }}>
                                    &nbsp;
                                </TableCell>
                            </TableRow>

                            <TableRow key={2} sx={{ padding: 0, margin: 0 }} >
                                <TableCell sx={{ lineHeight: 1, margin: 0, paddingRight: 0 }}>
                                    <MetricRightMenu task={task} tasks={tasks} setTasks={setTasks} />
                                </TableCell>
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