import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid2, Input } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import MetricsManager from '../managers/MetricsManager';
import TaskManager from '../managers/TaskManager';
import MetricElement from './MetricElement';
import UserManager from '../managers/UserManager';

function TaskDialog({ setOpenCallback, task }) {
    if (!task.metrics) task.metrics = [];
    task.metrics.sort((a, b) => a.sort - b.sort);

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [showMetrics, setShowMetrics] = React.useState(task.metrics.length == 0 ? 1 : task.metrics.length);
    const views = [
        { code: 'sum', title: 'Дневной календарь', icon: '🗓' },
        { code: 'checker', title: 'Чекер', icon: '✅' },
    ];

    const metricTemplates = MetricsManager.metricTemplates;

    let isNew = task.id ? false : true;

    setOpenCallback((value) => {
        setDialogOpen(value);
    });

    function dialogHandleClose() {
        setDialogOpen(false);
    }

    function dialogSaveHandler(formTitle, formMetrics) {
        if (isNew) {
            task.metrics = [];
            task.id = crypto.randomUUID();
            task.sortToBottom = false;
        }

        task.title = formTitle;

        formMetrics.forEach((formMetric, index) => {
            let metricTemplate = metricTemplates.find(m => { return m.id === formMetric.templateId });

            if (!task.metrics[index]) {
                task.metrics[index] = {};
            }

            task.metrics[index].id = task.metrics[index].id ? task.metrics[index].id : crypto.randomUUID();
            task.metrics[index].tiks = task.metrics[index].tiks ? task.metrics[index].tiks : [];
            task.metrics[index].taskId = task.id;
            task.metrics[index].sort = (index + 1) * 10;

            task.metrics[index].templateId = formMetric.templateId;
            task.metrics[index].viewCode = formMetric.viewCode;
            task.metrics[index].typeCode = metricTemplate.typeCode;
            task.metrics[index].inputCode = metricTemplate.inputCode;
            task.metrics[index].title = metricTemplate.title;
            task.metrics[index].shortTitle = metricTemplate.shortTitle;
            task.metrics[index].icon = metricTemplate.icon;
        });
        task.metrics = task.metrics.filter((metric, index) => { return index < formMetrics.length });
        task.uid = UserManager.getUid();
        task.created = (new Date().getTime()) / 1000;

        if (isNew) {
            TaskManager.add(task);
        } else {
            TaskManager.taskUpdate(task);
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

                    const formTitle = formJson.title;
                    var formMetrics = [];
                    for (var i = 0; i < showMetrics; i++) {
                        if (formJson['templateId_' + i]) {
                            formMetrics[i] = {
                                templateId: formJson['templateId_' + i],
                                viewCode: formJson['viewCode_' + i]
                            };
                        }
                    }
                    dialogSaveHandler(formTitle, formMetrics);
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
                        return <MetricElement key={i} elIndex={i} metric={task.metrics[i]} metricTemplates={metricTemplates} views={views} />;
                    })}

                    <Button onClick={() => { setShowMetrics(showMetrics + 1); }}>+ Add</Button>
                    <Button onClick={() => { setShowMetrics(Math.max(showMetrics - 1, 1)); }}>- Remove</Button>

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