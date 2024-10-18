import { Grid2, Paper, TableCell, TableRow } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import MetricLeftMenu from './MetricLeftMenu';
import MetricRightMenu from "./MetricRightMenu";
import TaskMenu from './TaskMenu';

function TaskRowShort({ title, cells, cols, task, tasks, setTasks }) {
    let i = 0;

    return (
        <Grid2 container component={Paper} sx={{ paddingTop: 1, marginBottom: 1, marginLeft: 2, marginRight: 2 }}>

            <Grid2 size={1}  >
                {task.metrics[0] ? task.metrics[0].icon : ''}
            </Grid2>
            <Grid2 size={10} textAlign="left">
                &nbsp;&nbsp;&nbsp;{task.title}
            </Grid2>
            <Grid2 size={1}>
                <TaskMenu task={task} tasks={tasks} setTasks={setTasks} />
            </Grid2>


            <Grid2 size={1} sx={{ verticalAlign: "bottom", paddingRight: 2 }}>
                <MetricLeftMenu task={task} tasks={tasks} setTasks={setTasks} />
            </Grid2>

            <Grid2 size={10}>
                <TableContainer sx={{
                    'overflow': 'auto',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    '::-webkit-scrollbar ': {
                        display: 'none'
                    }
                }}>
                    <Table size="small">
                        <TableBody key={task.id + 'body'}>

                            <TableRow key={1}>
                                {cols.map((c) => {
                                    return <TableCell key={task.id + c.datetime.getDate()}
                                        sx={{
                                            width: 100,
                                            minWidth: 50,
                                            overflow: 'hidden',
                                            textAlign: 'right',
                                            fontSize: 10,
                                            lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0
                                        }}>
                                        <i>{c.datetime.getDate()}</i>
                                        <b style={{ fontSize: 8 }}>
                                            &nbsp;{['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][c.datetime.getDay()]}
                                        </b>
                                    </TableCell>
                                })}
                            </TableRow>

                            <TableRow key={2} sx={{ padding: 0, margin: 0 }} >
                                {cells.map((cell) => {
                                    return <TableCell
                                        key={++i}
                                        sx={{
                                            textAlign: 'right',
                                            fontSize: 21, fontFamily: 'Digital-7',
                                            lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0
                                        }}>
                                        {cell.title}
                                    </TableCell>
                                })}
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>

            <Grid2 size={1}>
                <TableContainer sx={{ overflow: 'hidden' }}>
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
}

export default TaskRowShort;