import './App.css';

import { Grid2 } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import TaskList from "./elements/TaskList";
import Title from "./elements/Title";
import ToolAddTask from "./elements/ToolAddTask";
import TaskManager from "./managers/TaskManager";
import UserManager from './managers/UserManager';
import { useLocalStorageState } from '@toolpad/core';

function App() {
    const [tasks, setTasks] = useState(null);
    const [userProfile, setUserProfile] = useLocalStorageState("userProfile", {});
    console.log(userProfile);
    console.log(userProfile);
    let googleOk = function (d) {
        console.log("GOOGLE OK");
        console.log(d);
        let decoded = jwtDecode(d.credential)
        console.log(decoded);
        UserManager.register(decoded.email, decoded.picture, setUserProfile);
    }

    if (userProfile == null) {
        return (
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ width: 1, height: "100vh" }}>
                <Grid2 container>

                    <Grid2 size={4}></Grid2>
                    <Grid2 size={1} sx={{ alignContent: 'center' }}>
                        <GoogleLogin type="icon" onSuccess={googleOk} onError={console.log} />
                    </Grid2>
                    <Grid2 size={12} sx={{ marginBottom: 5, marginTop: 5 }}>
                        Авторизутесь пжлст!
                    </Grid2>
                </Grid2>
            </Stack>
        );
    } else {

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
}

export default App;

