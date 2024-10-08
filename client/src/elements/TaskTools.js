
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Box, Button, Input } from "@mui/material";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import TaskDialog from './TaskDialog';
import TaskManager from "../managers/TaskManager";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


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

    let magicInputRef = React.createRef();

    function onNumberCommit({ task, tasks, setTasks }) {
        let amount = parseInt(magicInputRef.current.value);
        TaskManager.commitNumber(task, tasks, setTasks, amount);
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
        <Box sx={{ minWidth: 0 }}>

            {task.mId1 ?
                <Input inputRef={magicInputRef} name='name' defaultValue={10} sx={{ minWidth: 0, width: 30 }} /> : ''
            }
            {task.mId1
                ?
                <Button variant="contained" color="success" sx={{ minWidth: 0 }}
                    onClick={() => onNumberCommit({ task, tasks, setTasks })}
                >
                    <AutoFixHighIcon fontSize='small'></AutoFixHighIcon>

                </Button> : ''}

            <Button variant="contained" color="success" sx={{ minWidth: 0 }}
                onClick={() => onIncrementClick({ task, tasks, setTasks })}
            >
                <PlusOneIcon fontSize='small' />
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
                // MenuListProps={{
                //     'aria-labelledby': 'basic-button',
                // }}
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