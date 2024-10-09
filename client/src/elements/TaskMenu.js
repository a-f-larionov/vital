import React from "react";
import { Box, Fab, IconButton, Popper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskDialog from './TaskDialog';
import TaskManager from "../managers/TaskManager";
import PageManager from "../managers/PageManager";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

function TaskMenu({ task, tasks, setTasks }) {

    const [menuAnchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);

    const menuHandleClick = (event) => {
        if (menuAnchorEl == null) {
            setAnchorEl(event.currentTarget);
        } else {
            menuHandleClose();
        }
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
    };

    function onArchiveClick({ task, tasks, setTasks }) {
        TaskManager.archive(task, tasks, setTasks);
        menuHandleClose();
    }

    let doOpenDialog = function () { console.error("Must be redefine") };

    function onEditClick({ task, tasks, setTasks }) {
        doOpenDialog(true);
        menuHandleClose();
    }

    function onListMenuClick({ task, tasks, setTasks }) {
    
        PageManager.setPage(PageManager.PAGE_EDIT_TIKS, task);
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
                            <DeleteIcon onClick={() => onArchiveClick({ task, tasks, setTasks })} />
                        </Fab>

                        <Fab size="small">
                            <FormatListBulletedIcon onClick={() => onListMenuClick({ task, tasks, setTasks })} />
                        </Fab>

                        <Fab size='small'>
                            <EditIcon onClick={() => onEditClick({ task, tasks, setTasks })} color='primary' />
                        </Fab>

                    </Popper>

                    <IconButton
                        id="basic-button"
                        aria-controls={menuOpen ? 'basic-menu' : undefined}
                        aria-expanded={menuOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={menuHandleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <TaskDialog setOpenCallback={(handler) => { doOpenDialog = handler }}
                        task={task} tasks={tasks} setTasks={setTasks} />
                </Box>
            </Box >
        </ClickAwayListener>
    );
}

export default TaskMenu;