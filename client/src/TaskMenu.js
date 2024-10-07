
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/material";


import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import React from "react";
import TaskDialog from './TaskDialog';
import TaskManager from "./TaskManager";


function TaskMenu({ task, tasks, setTasks }) {

    const [menuAnchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);

    const menuHandleClick = (event) => {
        window.jkl = event.currentTarget;
        if (menuAnchorEl == null) {
            setAnchorEl(event.currentTarget);
        } else {
            menuHandleClose();
        }
        //setAnchorEl(window.document.getElementById('mmm'));
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

    return (
        <ClickAwayListener onClickAway={ menuHandleClose }>
            <Box sx={{ minWidth: 0 }}>

                <Box >
                    <Popper
                        //anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        placement="left"
                        id="basic-menu"
                        open={menuOpen}
                        anchorEl={menuAnchorEl}
                        onClose={menuHandleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <IconButton sx={{ backgroundColor: '#ccc', padding: '6px', marginLeft: 1, boxShadow: 6 }}>
                            <DeleteIcon onClick={() => onArchiveClick({ task, tasks, setTasks })} />
                        </IconButton>

                        <IconButton sx={{ backgroundColor: '#ccc', padding: '6px', marginLeft: 1, boxShadow: 6 }}>
                            <EditIcon onClick={() => onEditClick({ task, tasks, setTasks })} color='primary' />
                        </IconButton >



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