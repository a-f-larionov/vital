
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
import Fab from '@mui/material/Fab';
import { FloatButton } from 'antd';
import {
    CommentOutlined,
    DownOutlined,
    LeftOutlined,
    RightOutlined,
    UpOutlined,
} from '@ant-design/icons';


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
        <ClickAwayListener onClickAway={menuHandleClose}>
            <Box sx={{ minWidth: 0 }}>

                <Box >

                    <Popper
                        id="basic-menu"
                        placement="left"
                        open={menuOpen}
                        anchorEl={menuAnchorEl}
                        onClose={menuHandleClose}
                        // MenuListProps={{
                        //     'aria-labelledby': 'basic-button'
                        // }}
                        sx={{ '& > :not(style)': { marginLeft: '8px', backgroundColor: '#fff' } }}
                    >

                        <Fab size='small'>
                            <DeleteIcon onClick={() => onArchiveClick({ task, tasks, setTasks })} />
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