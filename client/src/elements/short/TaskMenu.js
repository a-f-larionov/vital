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

function TaskMenu({ task }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const menuHandleClick = (event) => {
        if (anchorEl === null) {
            setAnchorEl(event.currentTarget);
        } else {
            setClose();
        }
    };

    const setClose = () => {
        setAnchorEl(null);
    };

    function onArchiveClick({ task }) {
        TaskManager.archive(task);
        setClose();
    }

    let doOpenDialog = function () { console.error("Must be redefine") };

    function onEditClick() {
        doOpenDialog(true);
        setClose();
    }

    return (
        <ClickAwayListener onClickAway={setClose}>
            <Box sx={{ minWidth: 0 }}>

                <Popper
                    id="basic-menu"
                    placement="left"
                    open={menuOpen}
                    anchorEl={anchorEl}
                    onClose={setClose}
                    sx={{ '& > :not(style)': { marginLeft: '8px', backgroundColor: '#fff' } }}
                >
                    <Fab size='small' onClick={() => onArchiveClick({ task })} >
                        <DeleteIcon />
                    </Fab>

                    <Fab size='small' onClick={() => onEditClick({ task })}  >
                        <EditIcon />
                    </Fab>

                    <Fab size='small' onClick={() => TaskManager.switchSortToBottom({ task })}>
                        {task.sortToBottom ? <SortIcon /> : <VerticalAlignBottomIcon />}
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

                <TaskDialog setOpenCallback={(handler) => { doOpenDialog = handler }} task={task} />
            </Box >
        </ClickAwayListener>
    );
}

export default TaskMenu;