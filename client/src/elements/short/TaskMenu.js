import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Fab, IconButton, Popper } from "@mui/material";
import React from "react";
import TaskManager from "../../managers/TaskManager";
import TaskDialog from '../TaskDialog';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import SortIcon from '@mui/icons-material/Sort';

function TaskMenu({ task, tasks, setTasks }) {

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

                <Box>

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

                        <Fab size='small'>
                            <EditIcon onClick={() => onEditClick({ task, tasks, setTasks })} color='primary' />
                        </Fab>

                        <Fab size='small'>
                            <VerticalAlignBottomIcon onClick={() => TaskManager.switchSortToBottom({task, tasks, setTasks})} />
                        </Fab>

                        <Fab size='small'>
                            <SortIcon onClick={() => TaskManager.switchSortToBottom({task, tasks, setTasks})} />
                        </Fab>

                    </Popper>

                    <IconButton sx={{ padding: 0 }}
                        id="basic-button"
                        aria-controls={menuOpen ? 'basic-menu' : undefined}
                        aria-expanded={menuOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        size="small"
                        onClick={menuHandleClick}
                    >
                        <MoreVertIcon size="small" />
                    </IconButton>

                    <TaskDialog setOpenCallback={(handler) => { doOpenDialog = handler }}
                        task={task} tasks={tasks} setTasks={setTasks} />
                </Box>
            </Box >
        </ClickAwayListener>
    );
}

export default TaskMenu;