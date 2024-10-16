import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Fab, IconButton, Popper } from "@mui/material";
import React from "react";
import PageManager from "../managers/PageManager";
import TaskDialog from './TaskDialog';

function MetricRightMenu({ task, tasks, setTasks }) {

    const [menuAnchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);

    const menuHandleClick = (event) => {
        if (menuAnchorEl === null) {
            setAnchorEl(event.currentTarget);
        } else {
            menuHandleClose();
        }
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
    };

    //let doOpenDialog ;

    function onEditMenuClick({ task, tasks, setTasks }) {
        PageManager.setPage(PageManager.PAGE_EDIT_TIKS, task.title, task);
    }

    return (
        <ClickAwayListener onClickAway={menuHandleClose}>
            <Box sx={{ minWidth: 0 }}>

                <Box >

                    <Popper
                        id="basic-menu"
                        placement="left"
                        open={menuOpen}
                        anchorEl={menuAnchorEl}
                        onClose={menuHandleClose}
                        sx={{ '& > :not(style)': { marginLeft: '8px', backgroundColor: '#fff' } }}
                    >

                        <Fab size='small'>
                            <EditIcon onClick={() => onEditMenuClick({ task, tasks, setTasks })} color='primary' />
                        </Fab>

                    </Popper>

                    <IconButton
                        aria-controls={menuOpen ? 'basic-menu' : undefined}
                        aria-expanded={menuOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={menuHandleClick}
                        sx={{ padding: 0 }}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <TaskDialog
                        setOpenCallback={(handler) => { }}
                        task={task} tasks={tasks} setTasks={setTasks} />
                </Box>
            </Box >
        </ClickAwayListener>
    );
}

export default MetricRightMenu;