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
    if (!task.metrics) task.metrics = [];
    if (!task.tiks) task.tiks = [];
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [showMetrics, setShowMetrics] = React.useState(task.metrics.length == 0 ? 1 : task.metrics.length);
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

    function dialogSaveHandler(title, metricsData) {
        if (isNew) {
            task.metrics = [];
            task.tiks = [];
        }

        task.title = title;

        metricsData.forEach((data, index) => {
            let metricaTemplate = metricTemplates.find(m => { return m.id === data.templateId });

            task.metrics[index] = {
                id: !task.metrics[index] ? crypto.randomUUID() : task.metrics[index].id,
                sort: index,
                title: metricaTemplate.title,
                viewCode: data.viewCode,
                templateId: data.templateId,
                shortTitle: metricaTemplate.shortTitle,
                icon: metricaTemplate.icon,
                typeCode: metricaTemplate.typeCode,
                inputCode: metricaTemplate.inputCode,
            };
        });

        console.log(task);
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
                    var metricsData = [];
                    for (var i = 0; i < showMetrics; i++) {
                        if (formJson['templateId_' + i]) {
                            metricsData[i] = {
                                templateId: formJson['templateId_' + i],
                                viewCode: formJson['viewCode_' + i]
                            };
                        }
                    }
                    dialogSaveHandler(title, metricsData);
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

                    {Array.from({ length: showMetrics }, (nothing, i) => {
                        /** elIndex == metrica.sort
                         * sort == index
                        */
                        return <MetricElement elIndex={i} metrica={task.metrics[i]} metricTemplates={metricTemplates} views={views} />;
                    })}

                    <Button onClick={() => { setShowMetrics(showMetrics + 1); }}>+ Add</Button>
                    <Button onClick={() => { setShowMetrics(Math.max(showMetrics - 1, 1)); }}>+ Remove</Button>


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