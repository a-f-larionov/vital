import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Fab, IconButton, Popper } from "@mui/material";
import React from "react";
import PageManager from "../managers/PageManager";

function MetricRightMenu({ task, tasks, setTasks }) {

    const [menuAnchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);
    const [currentMetrica, setCurrentMetrica] = React.useState(null);

    const menuHandleClick = (event, metrica) => {
        if (menuAnchorEl === null) {
            setAnchorEl(event.currentTarget);
            setCurrentMetrica(metrica);
        } else {
            menuHandleClose();
        }
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
        setCurrentMetrica(null);
    };

    function onEditMenuClick({ metrica, task, tasks, setTasks }) {
        PageManager.setPage(PageManager.PAGE_EDIT_TIKS, task.title + " > " + currentMetrica.title + currentMetrica.icon, task, currentMetrica);
    }

    return (
        <ClickAwayListener onClickAway={menuHandleClose}>
            <Box sx={{ minWidth: 0 }}>

                {task.metrics.map(metrica => {
                    return <Box key={metrica.id}>

                        <Popper
                            id="menu{metrica.id}"
                            placement="left"
                            open={menuOpen}
                            anchorEl={menuAnchorEl}
                            onClose={menuHandleClose}
                            sx={{ '& > :not(style)': { marginLeft: '8px', backgroundColor: '#fff' } }}
                        >
                            <Fab size='small'>
                                <EditIcon onClick={() => onEditMenuClick({ currentMetrica, task, tasks, setTasks })} color='primary' />
                            </Fab>

                        </Popper>

                        <IconButton
                            aria-controls={menuOpen ? ('menu' + metrica.id) : undefined}
                            aria-expanded={menuOpen ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => menuHandleClick(e, metrica)}
                            sx={{ padding: 0 }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        {/* 
                    <TaskDialog
                        setOpenCallback={(handler) => { }}
                        task={task} tasks={tasks} setTasks={setTasks} /> */}
                    </Box>
                })}

            </Box >
        </ClickAwayListener>
    );
}

export default MetricRightMenu;