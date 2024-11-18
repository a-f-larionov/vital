import { Grid2, Paper, TableCell, TableRow } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import MetricLeftMenu from './MetricLeftMenu';
import MetricRightMenu from "./MetricRightMenu";
import TaskMenu from './TaskMenu';
import Collapse from "@mui/material/Collapse";
import PageManager from "../managers/PageManager";

function TaskRowShort({ cols, cells, task, tasks, setTasks }) {
    let i = 1;
    let tableRow = 1;

    return (
        <Grid2 container component={Paper} sx={{ paddingTop: 0.5, marginBottom: 0.5, marginLeft: 2, marginRight: 2 }}>

            <Grid2 size={11} textAlign="left" sx={{ padding: 0 }} onClick={() => PageManager.toggleCollapse(task, tasks, setTasks)}>
                &nbsp;&nbsp;&nbsp;{task.title}
            </Grid2>

            <Grid2 size={1} sx={{ padding: 0 }}>
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
                                    {cols.map((col) => {
                                        return <TableCell key={"cell_" + task.id + "_" + col.datetime.toDateString()}
                                            sx={{
                                                width: 100,
                                                minWidth: 50,
                                                overflow: 'hidden',
                                                textAlign: 'right',
                                                fontSize: 10,
                                                lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0
                                            }}>
                                            <i>{col.datetime.getDate()}</i>
                                            <b style={{ fontSize: 8 }}>
                                                &nbsp;{['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][col.datetime.getDay()]}
                                            </b>
                                        </TableCell>
                                    })}
                                </TableRow>

                                {cells.map((shortRow) => {
                                    return <TableRow key={tableRow++} sx={{ padding: 0, margin: 0 }} >
                                        {shortRow.map((cell) => {
                                            return <TableCell
                                                key={++i}
                                                sx={{
                                                    textAlign: 'right',
                                                    fontSize: 21, fontFamily: 'Digital-7',
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
                </Collapse>
            </Grid2>

        </Grid2>

    );
}

export default TaskRowShort;