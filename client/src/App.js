// import logo from './logo.svg';
 import './App.css';

import React from "react";
import { useState } from "react";
import { Grid2 } from "@mui/material";
import Title from "./Title";
import ToolAddTask from "./ToolAddTask";
import TaskTable from "./TaskTable";
import TaskManager from "./TaskManager";

function App() {
    console.log("Vital Measurement");
    const [tasks, setTasks] = useState(null);

    if (tasks == null) {
        TaskManager.init(setTasks);
        return <div>Loading...</div>;

    } else
        return (
            <React.StrictMode>
                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid2 size={13}></Grid2>
                    <Grid2 size={2}></Grid2>
                    <Grid2 size={8}>
                        <Title />
                    </Grid2>
                    <Grid2 size={2}></Grid2>


                    <Grid2 size={13}>
                        <TaskTable tasks={tasks} setTasks={setTasks} />
                    </Grid2>


                    <Grid2 size={13}>
                        <ToolAddTask tasks={tasks} setTasks={setTasks} />
                    </Grid2>
                </Grid2>
            </React.StrictMode >
        );
}

export default App;
