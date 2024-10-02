import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Grid, Grid2, Input } from "@mui/material";
import TaskManager from './TaskManager';
import React from 'react';

function TaskDialog({ setOpenCallback, task, tasks, setTasks }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    setOpenCallback(setDialogOpen);

    function dialogHandleClose() {
        setDialogOpen(false);
    }

    function dialogSaveHandler(title) {
        task.title = title;
        TaskManager.taskUpdate(task, tasks, setTasks);
        dialogHandleClose();
    }


    return (
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
            <DialogTitle>Метрики задачи</DialogTitle>
            <DialogContent sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={3}>
                    <Grid2 size={3}>Название:</Grid2>
                    <Grid2 size={9}>
                        <Input autoFocus required type="text"
                            margin="dense" label="Название" fullWidth variant="standard"
                            name="title" defaultValue={task.title} />
                    </Grid2>
                    <Grid2 size={3} >Метрика А:</Grid2>
                    <Grid2 size={9}><Input fullWidth name="m1Title"></Input></Grid2>
                </Grid2>
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
    );
}

export default TaskDialog;