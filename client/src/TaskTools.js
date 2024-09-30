import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Input } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import TaskManager from "./TaskManager";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


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

    function deleteHandler({ task, tasks, setTasks }) {
        TaskManager.delete(task, tasks, setTasks);
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

                <MenuItem onClick={() => deleteHandler({ task, tasks, setTasks })}>
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
                <DialogTitle>Measurement</DialogTitle>
                <DialogContent>
                    <Input
                        autoFocus
                        required
                        margin="dense"
                        name="title"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={task.title}
                    />
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