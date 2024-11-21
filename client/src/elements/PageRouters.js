
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AppBar, Avatar, Box, Button, Grid2, Toolbar, Typography } from "@mui/material";
import React from "react";
import AppMenuRightButtons from "../elements/AppMenuRightButtons";
import CommitedSnakbar from '../elements/CommitedSnackbar';
import ContentPage from "../elements/ContentPage";
import ToolAddTask from "../elements/ToolAddTask";
import PageManager from '../managers/PageManager';
import UserManager from '../managers/UserManager';

function PageRouter({ tasks, setTasks, collapsAll, setCollapsAll }) {
    return (
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            <Grid2 size={12}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>

                            {PageManager.isMain() ?
                                <ToolAddTask tasks={tasks} setTasks={setTasks} />

                                :

                                <Box display="flex" justifyContent="center">
                                    <Button sx={{ minWidth: 0 }} size="small"
                                        variant="contained" color="failed"
                                        onClick={() => { PageManager.setPage(PageManager.PAGE_MAIN, ''); }}>
                                        <ArrowBackIosIcon />
                                    </Button>
                                </Box >
                            }

                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {PageManager.pageTitle}
                            </Typography>

                            <AppMenuRightButtons tasks={tasks} setTasks={setTasks} collapsAll={collapsAll} setCollapsAll={setCollapsAll} />

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

export default PageRouter;