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
import TaskManager from "../../managers/TaskManager";

const sxCell = {
    textAlign: 'right', fontSize: 21, fontFamily: 'Digital-7',
    lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0
};

function TaskRowShort({ rows, task }) {
    let i = 1;
    let tableRow = 1;

    return (
        <Grid2 container component={Paper} sx={{ paddingTop: 0.5, marginBottom: 0.5, marginLeft: 2, marginRight: 2 }}>

            <Grid2 size={11} textAlign="left" sx={{ padding: 0, cursor: 'hand' }} onClick={() => PageManager.toggleCollapse(task)}>
                &nbsp;{task.title}
                <Box sx={{ fontSize: 9  , float: 'right' }}>
                    {rows.map(row => <Prediction key={row.metric.id} metric={row.metric} />)}
                </Box>
            </Grid2>

            <Grid2 size={1}>
                <TaskMenu task={task} />
            </Grid2>


            <Grid2 size={1} sx={{ verticalAlign: "bottom", paddingRight: 2 }}>
                <Collapse orientation="vertical" in={!task.isCollapsed}>


                    <TableContainer sx={{ overflow: 'visible' }}>
                        <Table size="small">
                            <TableBody key={task.id + 'body'}>

                                <TableRow key={10}>
                                    <TableCell sx={{ fontSize: 10, lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0, padding: 0.3, border: 0 }}>&nbsp;</TableCell>
                                </TableRow>

                                {task.metrics.map(metric =>
                                    <TableRow key={tableRow++} sx={{ padding: 0, margin: 0 }} >
                                        <TableCell sx={sxCell} sx={{ padding: 0, alignContent: 'right', textAlign: "right", border: 0 }}>
                                            <MetricLeftMenu metric={metric} task={task} />
                                        </TableCell>
                                    </TableRow>)}

                            </TableBody>
                        </Table>
                    </TableContainer>
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

                                <TableRow key={tableRow++}>
                                    {TaskRowShort.getCols()}
                                </TableRow>

                                {rows.map((metricRow) => {
                                    return <TableRow key={tableRow++} sx={{ padding: 0, margin: 0 }} >
                                        {metricRow.cells.map((cell) => <TableCell key={++i} sx={sxCell}>
                                            {cell.title}
                                        </TableCell>
                                        )}
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

                                {task.metrics.map(metric =>
                                    <TableRow key={tableRow++} sx={{ padding: 0, margin: 0 }} >
                                        <TableCell sx={sxCell}>
                                            <MetricRightMenu metric={metric} task={task} />
                                        </TableCell>
                                    </TableRow>)}

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Collapse>
            </Grid2>

        </Grid2>

    );
}

let sxCol = {
    width: 100, minWidth: 50, padding: 0.3,
    overflow: 'hidden',
    textAlign: 'right', fontSize: 10,
    lineHeight: 1, margin: 0, paddingLeft: 0, paddingRight: 0
};

let weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

TaskRowShort.getCols = () => {
    if (!TaskRowShort.cols) {
        TaskRowShort.cols = TaskManager.getDates().map((date) =>
            <TableCell key={date.toDateString()}
                sx={sxCol}>
                <i>{date.getDate()}</i>
                <b style={{ fontSize: 8 }}>
                    &nbsp;{weekDays[date.getDay()]}
                </b>
            </TableCell>);
    }
    return TaskRowShort.cols;
};



export default TaskRowShort;