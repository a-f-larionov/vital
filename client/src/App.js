import './App.css';

import React, { useState } from "react";
import { AppBar, Avatar, Box, Button, Grid2, Toolbar, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import TaskList from "./elements/TaskList";
import ToolAddTask from "./elements/ToolAddTask";
import ContentPage from "./elements/ContentPage";
import TaskManager from "./managers/TaskManager";
import UserManager from './managers/UserManager';
import PageManager from './managers/PageManager';
import MetricaManager from './managers/MetricaManager';

function App() {
    const [tasks, setTasks] = useState(null);
    const [userProfile, setUserProfile] = useState(() => {
        let userProfile = localStorage.getItem('userProfile');
        return userProfile ? JSON.parse(userProfile) : {};
    });
    const [currentPage, setCurrentPage] = useState(PageManager.PAGE_MAIN);
    const [metrica, setMetrica] = useState([]);
    PageManager.init(currentPage, setCurrentPage);
    UserManager.setUserProfile(userProfile);
    MetricaManager.load(metrica, setMetrica);

    let googleOk = function (d) {
        let decoded = jwtDecode(d.credential)
        UserManager.register(decoded.email, decoded.picture, setUserProfile);
    }

    if (userProfile.id === undefined) {
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

            return (<Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid2 size={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar>
                                {/* <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                    > */}
                                {/* <MenuIcon /> */}
                                {PageManager.isMain() ?
                                    <ToolAddTask tasks={tasks} setTasks={setTasks} />
                                    :

                                    <Box display="flex" justifyContent="center">
                                        <Button sx={{ minWidth: 0 }} size="small"
                                            variant="contained" color="failed" onClick={() => { PageManager.setPage(PageManager.PAGE_MAIN); }}>
                                            <ArrowBackIosIcon />
                                        </Button>

                                    </Box >
                                }
                                {/* </IconButton> */}
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Vital Manager
                                </Typography>
                                <Button color="inherit">
                                    <Avatar src={UserManager.getPicture()}></Avatar>
                                </Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid2>

                <Grid2 size={13}>

                    <ContentPage tasks={tasks} setTasks={setTasks} />

                </Grid2>
            </Grid2 >);
    }
}

export default App;

