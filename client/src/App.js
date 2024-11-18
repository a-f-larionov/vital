
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AppBar, Avatar, Box, Button, Grid2, Toolbar, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from "@mui/material/Stack";
import Switch from '@mui/material/Switch';
import React, { useState } from "react";
import CommitedSnakbar from './elements/CommitedSnackbar';
import ContentPage from "./elements/ContentPage";
import Loading from "./elements/Loading";
import ToolAddTask from "./elements/ToolAddTask";
import CommentManager from './managers/CommentsManager';
import MetricaManager from './managers/MetricaManager';
import PageManager from './managers/PageManager';
import TaskManager from "./managers/TaskManager";
import UserManager from './managers/UserManager';

function App() {
    const [tasks, setTasks] = useState(null);
    const [collapsAll, setCollapsAll] = useState(false);
    const [comments, setComments] = useState(null);
    const [userProfile, setUserProfile] = useState(() => {
        let userProfile = localStorage.getItem('userProfile');
        return userProfile ? JSON.parse(userProfile) : {};
    });
    const [currentPage, setCurrentPage] = useState(PageManager.PAGE_MAIN);
    const [collapsed, setCollapsed] = useState({});
    const [metrica, setMetrica] = useState([]);
    PageManager.init(currentPage, setCurrentPage, collapsed, setCollapsed);
    UserManager.setUserProfile(userProfile);
    MetricaManager.load(metrica, setMetrica);

    if (userProfile.id === undefined) {
        return (<Loading setUserProfile={setUserProfile} />);
    } else {

        if (tasks === null || comments === null) {
            TaskManager.init(setTasks);
            CommentManager.init(setComments);
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
                                            variant="contained" color="failed"
                                            onClick={() => { PageManager.setPage(PageManager.PAGE_MAIN, 'Vital Manager'); }}>
                                            <ArrowBackIosIcon />
                                        </Button>

                                    </Box >
                                }
                                {/* </IconButton> */}
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {PageManager.pageTitle}
                                </Typography>

                                <FormControlLabel
                                    control={<Switch checked={collapsAll}
                                        onChange={() => {
                                            PageManager.collapsAll(tasks, setTasks, !collapsAll);
                                            setCollapsAll(!collapsAll);
                                        }} />}
                                    label="Show"
                                />
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
                <CommitedSnakbar />
            </Grid2 >);
    }
}

export default App;

