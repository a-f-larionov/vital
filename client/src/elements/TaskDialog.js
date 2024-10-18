import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid2, Input } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import MetricaManager from '../managers/MetricaManager';
import TaskManager from '../managers/TaskManager';
import MetricElement from './MetricElement';

function TaskDialog({ setOpenCallback, task, tasks, setTasks }) {
    if(!task.metrics) task.metrics = [];
    if(!task.tiks) task.tiks = [];
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const views = [
        { code: 'sum', title: 'Дневной календарь', icon: '🗓' },
        { code: 'checker', title: 'Чекер', icon: '✅' },
    ];

    const metricTemplates = MetricaManager.metricTemplates;

    let isNew = task.id ? false : true;

    setOpenCallback((value) => {
        setDialogOpen(value);
    });

    function dialogHandleClose() {
        setDialogOpen(false);
    }

    function dialogSaveHandler(title, metricaTemplateId, viewCode) {
        if (isNew) {
            task.metrics = [];
            task.tiks = [];
        }
        console.log(title, metricaTemplateId, viewCode, task, isNew);
        task.title = title;

        let metricaTemplate = metricTemplates.find(m => { return m.id === metricaTemplateId });
        task.metrics[0] = {
            id: isNew ? crypto.randomUUID() : task.metrics[0].id,
            title: metricaTemplate.title,
            shortTitle: metricaTemplate.shortTitle,
            sort: 1000,
            icon: metricaTemplate.icon,
            typeCode: metricaTemplate.typeCode,
            inputCode: metricaTemplate.inputCode,
            viewCode: viewCode,
            templateId: metricaTemplateId
        };

        if (isNew) {
            TaskManager.add(task, tasks, setTasks);
        } else {
            TaskManager.taskUpdate(task, tasks, setTasks);
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
                    const metricaTemplateId = formJson.typeId1.length ? formJson.typeId1 : null;;
                    const viewCode = formJson.viewCode1;

                    dialogSaveHandler(title, metricaTemplateId, viewCode);
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

                    <MetricElement elIndex={1} metrica={task.metrics[0]} metricTemplates={metricTemplates} views={views} />


                    {/* <Grid2 size={3} >Материалы:</Grid2>
                    <Grid2 size={6}>
                        <Input fullWidth></Input>
                        <Input fullWidth></Input>
                        <Input fullWidth></Input>
                    </Grid2> */}
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