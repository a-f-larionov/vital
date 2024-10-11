import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid2, Input } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import MetricaManager from '../managers/MetricaManager';
import MetricElement from './MetricElement';
import TaskManager from '../managers/TaskManager';

function TaskDialog({ setOpenCallback, task, tasks, setTasks }) {

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const views = [
        { code: 'sum', title: 'Сумма', icon: '📈' },
        { code: 'minmaks', title: 'МинМакс', icon: '📊' },
        { code: 'list-count', title: 'СписокСумма', icon: '📃📈' },
    ];

    const metrica = MetricaManager.metrica;

    setOpenCallback((value) => {
        setDialogOpen(value);
    });

    function dialogHandleClose() {
        setDialogOpen(false);
    }

    function dialogSaveHandler(title, mId1, mId2, vCode1, vCode2) {
        task.title = title;
        task.m1 = metrica.filter(m => { return m.id === mId1 })[0];
        task.m2 = metrica.filter(m => { return m.id === mId2 })[0];
        task.vCode1 = vCode1;
        task.vCode2 = vCode2;
        console.log(task, mId1, mId2);

        if (task.id) {
            TaskManager.taskUpdate(task, tasks, setTasks);
        } else {
            TaskManager.create(task, tasks, setTasks);
        }
        dialogHandleClose();
    }

    return (
        <Dialog
            fullScreen
            open={dialogOpen}
            onClose={dialogHandleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();

                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const title = formJson.title;
                    const mId1 = formJson.typeId1.length ? formJson.typeId1 : null;
                    const mId2 = formJson.typeId2.length ? formJson.typeId2 : null;
                    const vCode1 = formJson.viewCode1;
                    const vCode2 = formJson.viewCode1;

                    dialogSaveHandler(title, mId1, mId2, vCode1, vCode2);
                },
            }}
        >
            <DialogTitle>Метрики</DialogTitle>
            <DialogContent sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={1}>

                    <Grid2 size={3}>Название:</Grid2>
                    <Grid2 size={9}>
                        <Input autoFocus required fullWidth type="text"
                            margin="dense" label="Название" variant="standard"
                            name="title" defaultValue={task.title} />
                    </Grid2>

                    <MetricElement elIndex={1} mId={task.m1 ? task.m1.id : null} vCode={task.vCode1} metrica={metrica} views={views} />
                    <MetricElement elIndex={2} mId={task.m2 ? task.m2.id : null} vCode={task.vCode2} metrica={metrica} views={views} />

                    <Grid2 size={3} >Материалы:</Grid2>
                    <Grid2 size={6}>
                        <Input fullWidth></Input>
                        <Input fullWidth></Input>
                        <Input fullWidth></Input>
                    </Grid2>
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