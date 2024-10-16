import { Box } from "@mui/material";
import React from "react";
import InputMetric from './InputMetric';

function MetricLeftMenu({ task, tasks, setTasks }) {
    return (
        <Box>
            <br></br>
            <InputMetric mIndex={1}  task={task} tasks={tasks} setTasks={setTasks} />
            <InputMetric mIndex={2}  task={task} tasks={tasks} setTasks={setTasks} />
        </Box>
    );
}

export default MetricLeftMenu;