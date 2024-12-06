import { Box, Grid2, Paper, TableCell, TableRow } from "@mui/material";

import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import PageManager from "../../managers/PageManager";
import MetricLeftMenu from './MetricLeftMenu';
import MetricRightMenu from "./MetricRightMenu";
import Prediction from "./Prediction";
import TaskMenu from './TaskMenu';

function TaskRowShort({ cols, rows, task, tasks, setTasks }) {
    let i = 1;
    let tableRow = 1;

    return (
        <Grid2 container component={Paper} sx={{ paddingTop: 0.5, marginBottom: 0.5, marginLeft: 2, marginRight: 2 }}>

            <Grid2 size={11} textAlign="left" sx={{ padding: 0, cursor: 'hand' }} onClick={() => PageManager.toggleCollapse(task, tasks, setTasks)}>
                &nbsp;{task.title}
                <Box sx={{ fontSize: 8, textAlign: 'right', display: 'block', float: 'right' }}>
                    {rows.map(row => {
                        return <Box key={row.metric.id}>
                            [
                            <Prediction metric={row.metric} />
                            ]
                            &nbsp;
                            &nbsp;
                        </Box>
                    })}
                </Box>

            </Grid2>

            <Grid2 size={1}>
                <TaskMenu task={task} tasks={tasks} setTasks={setTasks} />
            </Grid2>


            <Grid2 size={1} sx={{ verticalAlign: "bottom", paddingRight: 2 }}>
                <Collapse orientation="vertical" in={!task.isCollapsed}>
                    <MetricLeftMenu task={task} tasks={tasks} setTasks={setTasks} />
                </Collapse>
            </Grid2>

            <Grid2 size={10}>
                <Collapse orientation="vertical" in={!task.isCollapsed}>
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
                                    {cols.map((col) => <TableCell key={"cell_" + task.id + "_" + col.datetime.toDateString()}
                                        sx={{
                                            width: 100, minWidth: 50, padding: 0.3,
                                            overflow: 'hidden',
                                            textAlign: 'right', fontSize: 10,
                                            lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0
                                        }}>
                                        <i>{col.datetime.getDate()}</i>
                                        <b style={{ fontSize: 8 }}>
                                            &nbsp;{['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][col.datetime.getDay()]}
                                        </b>
                                    </TableCell>
                                    )}
                                </TableRow>

                                {rows.map((metricRow) => {
                                    return <TableRow key={tableRow++} sx={{ padding: 0, margin: 0 }} >
                                        {metricRow.cells.map((cell) => {
                                            return <TableCell
                                                key={++i}
                                                sx={{
                                                    textAlign: 'right', fontSize: 21, fontFamily: 'Digital-7',
                                                    lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0
                                                }}>
                                                {cell.title ? cell.title : '‎'}
                                            </TableCell>
                                        })}
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Collapse>
            </Grid2>

            <Grid2 size={1}>
                <Collapse orientation="vertical" in={!task.isCollapsed}>
                    <TableContainer sx={{ overflow: 'hidden' }}>
                        <Table size="small">
                            <TableBody key={task.id + 'body'}>

                                <TableRow key={10}>
                                    <TableCell sx={{ fontSize: 10, lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0, padding: 0.3 }}>&nbsp;</TableCell>
                                </TableRow>

                                {task.metrics.map(metric => {
                                    return <TableRow key={tableRow++} sx={{ padding: 0, margin: 0 }} >
                                        <TableCell sx={{
                                            textAlign: 'right', fontSize: 21, fontFamily: 'Digital-7',
                                            lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0
                                        }}>
                                            <MetricRightMenu metric={metric} task={task} tasks={tasks} setTasks={setTasks} />
                                        </TableCell>
                                    </TableRow>
                                })}


                            </TableBody>
                        </Table>
                    </TableContainer>
                </Collapse>
            </Grid2>

        </Grid2>

    );
}

export default TaskRowShort;