import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button } from "@mui/material";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import TaskDialog from './TaskDialog';
import TaskManager from "./TaskManager";


function TaskTools({ task, tasks, setTasks }) {

    const [menuAnchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);

    const menuHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
    };

    function onIncrementClick({ task, tasks, setTasks }) {
        TaskManager.increment(task, tasks, setTasks);
    }

    function onArchiveClick({ task, tasks, setTasks }) {
        TaskManager.archive(task, tasks, setTasks);
        menuHandleClose();
    }

    let doOpenDialog = function () { console.error(" must be redefine") };

    function onEditClick({ task, tasks, setTasks }) {
        doOpenDialog(true);
        menuHandleClose();
    }

    return (
        <Box>
            <Button variant="contained" color="success" sx={{ minWidth: 0 }}
                onClick={() => onIncrementClick({ task, tasks, setTasks })}>
                <ArrowCircleUpIcon fontSize="small" />
            </Button>

            <Button
                sx={{ minWidth: 0 }}
                id="basic-button"
                aria-controls={menuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={menuHandleClick}
            >
                <MoreVertIcon />
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={menuAnchorEl}
                open={menuOpen}
                onClose={menuHandleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => onEditClick({ task, tasks, setTasks })}>
                    <EditIcon />
                </MenuItem>

                <MenuItem onClick={() => onArchiveClick({ task, tasks, setTasks })}>
                    <DeleteIcon />
                </MenuItem>

            </Menu>

            <TaskDialog setOpenCallback={(handler) => { doOpenDialog = handler }}
                task={task} tasks={tasks} setTasks={setTasks} />

        </Box >
    );
}

export default TaskTools;