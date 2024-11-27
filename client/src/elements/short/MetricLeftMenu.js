import { Box } from "@mui/material";
import React from "react";
import InputMetric from '../InputMetric';

function MetricLeftMenu({ task, tasks, setTasks }) {
    return (
        <Box>
            <br />
            {task.metrics.map(metrica => {
                return (
                    <Box key={metrica.id}>
                        <InputMetric metrica={metrica} task={task} tasks={tasks} setTasks={setTasks} />
                    </Box>
                )
            })}
        </Box>
    );
}

export default MetricLeftMenu;