import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Input } from "@mui/material";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import TaskManager from "./TaskManager";
import TaskDialog from './TaskDialog';


function TaskTools({ task, tasks, setTasks }) {

    const [menuAnchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);

    const menuHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
    };

    function incrementHandler({ task, tasks, setTasks }) {
        TaskManager.increment(task, tasks, setTasks);
    }

    function archiveHandler({ task, tasks, setTasks }) {
        TaskManager.archive(task, tasks, setTasks);
        menuHandleClose();
    }

    let doOpen = function () { console.error(" must be redefine") };

    function editHandler({ task, tasks, setTasks }) {
        doOpen(true);
        menuHandleClose();
    }

    return (
        <Box>
            <Button variant="contained" color="success" sx={{ minWidth: 0 }}
                onClick={() => incrementHandler({ task, tasks, setTasks })}>
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
                <MenuItem onClick={() => editHandler({ task, tasks, setTasks })}>
                    <EditIcon />
                </MenuItem>

                <MenuItem onClick={() => archiveHandler({ task, tasks, setTasks })}>
                    <DeleteIcon />
                </MenuItem>

            </Menu>

            <TaskDialog setOpenCallback={(handler) => { doOpen = handler }} task={task} tasks={tasks} setTasks={setTasks} />

        </Box >
    );
}

export default TaskTools;