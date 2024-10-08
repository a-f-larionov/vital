import './App.css';

import { Box, Grid2 } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskManager from "./TaskManager";
import Title from "./Title";
import ToolAddTask from "./ToolAddTask";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function App() {
    const [tasks, setTasks] = useState(null);

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    let googleOk = function (d) {
        console.log("GOOGLE OK");
        console.log(d);
        let decoded = jwtDecode(d.credential)
        console.log(decoded);
        /**
         * decoded.email;
         * 
         */
    }

    if (tasks === null) {
        TaskManager.init(setTasks);
        return (
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ width: 1, height: "100vh" }}>
                <CircularProgress />
            </Stack>
        );

    } else
        return (
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <GoogleLogin type="icon" onSuccess={googleOk} onError={console.logde}  />
                <Grid2 size={12}>&nbsp;</Grid2>

                <Grid2 size={2}></Grid2>
                <Grid2 size={8}>
                    <Title />
                </Grid2>

                <Grid2 size={2}>
                    <ToolAddTask tasks={tasks} setTasks={setTasks} />
                </Grid2>

                <Grid2 size={13}>
                    <TaskList tasks={tasks} setTasks={setTasks} />
                </Grid2>
            </Grid2>
        );
}

export default App;
