import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Input } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import TaskManager from "./TaskManager";


function TaskTools({ task, tasks, setTasks }) {

    const [menuAnchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);

    let taskTitleRef = React.createRef();

    const menuHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
    };

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const dialogHandleClickOpen = () => {
        window.jkl = taskTitleRef;
        setDialogOpen(true);
    };

    const dialogHandleClose = () => {
        setDialogOpen(false);
    };

    function incrementHandler({ task, tasks, setTasks }) {
        task.counter++;

        setTasks([...tasks]);
        localStorage.initData3 = JSON.stringify(tasks);;

        TaskManager.increment(task, tasks, setTasks);
    }

    function archiveHandler({ task, tasks, setTasks }) {
        TaskManager.archive(task, tasks, setTasks);
        menuHandleClose();
    }

    function editHandler({ task, tasks, setTasks }) {
        dialogHandleClickOpen();
        menuHandleClose();
    }

    function dialogSaveHandler(title) {
        task.title = title;
        TaskManager.taskUpdate(task, tasks, setTasks);
        dialogHandleClose();
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


            <Dialog
                open={dialogOpen}
                onClose={dialogHandleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const title = formJson.title;
                        console.log(title);
                        dialogSaveHandler(title);
                    },
                }}
            >
                <DialogTitle>Метрика</DialogTitle>
                <DialogContent>
                    <Input autoFocus required type="text"
                        margin="dense" label="Название" fullWidth variant="standard"
                        name="title" defaultValue={task.title}
                    />
                    Метрика 1:<Input name="m1Title"></Input>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogHandleClose}>
                        <CloseIcon />
                    </Button>
                    <Button type="submit">
                        <CheckIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}


export default TaskTools;