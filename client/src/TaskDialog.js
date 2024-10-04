import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, Grid2, Input, InputLabel, MenuItem, Select } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import TaskManager from './TaskManager';

function TaskDialog({ setOpenCallback, task, tasks, setTasks }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    setOpenCallback(setDialogOpen);

    function dialogHandleClose() {
        setDialogOpen(false);
    }

    function dialogSaveHandler(title) {
        task.title = title;

        if (task.id) {
            TaskManager.taskUpdate(task, tasks, setTasks)
        } else {
            TaskManager.create(task, tasks, setTasks);
        }
        dialogHandleClose();
    }

    const [type, setType] = React.useState('');
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const [view, setView] = React.useState('');
    const handleViewChange = (event) => {
        setView(event.target.value);
    };

    const [type2, setType2] = React.useState('');
    const handleTypeChange2 = (event) => {
        setType2(event.target.value);
    };

    const [view2, setView2] = React.useState('');
    const handleViewChange2 = (event) => {
        setView2(event.target.value);
    };

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
            <DialogTitle>Метрики</DialogTitle>
            <DialogContent sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={3}>
                    
                    <Grid2 size={3}>Название:</Grid2>
                    <Grid2 size={9}>
                        <Input autoFocus required fullWidth type="text"
                            margin="dense" label="Название" variant="standard"
                            name="title" defaultValue={task.title} />
                    </Grid2>

                    <Grid2 size={3} >Метрика 1:</Grid2>
                    <Grid2 size={4}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="select-label-type">Тип</InputLabel>
                            <Select
                                labelId="select-label-type"
                                id="select-label-type"
                                value={type}
                                label="Тип"
                                onChange={handleTypeChange}>
                                <MenuItem value={10}>Страницы (стр.)</MenuItem>
                                <MenuItem value={20}>Такты (такт.)</MenuItem>
                                <MenuItem value={30}>Температура (°C)</MenuItem>
                                <MenuItem value={40}>Список(сингл)</MenuItem>
                                <MenuItem value={50}>Список(мульти)</MenuItem>
                                <MenuItem value={60}>Рублей</MenuItem>
                                <MenuItem value={70}>Время</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}> 
                            <InputLabel id="select-label-view">Вид</InputLabel>
                            <Select
                                labelId="select-label-view"
                                id="select-label-view"
                                value={view}
                                label="Вид"
                                onChange={handleViewChange}                            >
                                <MenuItem value={10}>Регистраций</MenuItem>
                                <MenuItem value={20}>Сумма.</MenuItem>
                                <MenuItem value={30}>МинМакс.</MenuItem>
                                <MenuItem value={30}>Список:Сумма</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>

                    <Grid2 size={3} >Метрика 2:</Grid2>
                    <Grid2 size={4}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="select-label-type2">Тип</InputLabel>
                            <Select
                                labelId="select-label-type2"
                                id="select-label-type2"
                                value={type2}
                                label="Тип"
                                onChange={handleTypeChange2}
                            >
                                <MenuItem value={10}>Страницы (стр.)</MenuItem>
                                <MenuItem value={20}>Такты (такт.)</MenuItem>
                                <MenuItem value={30}>Температура (°C)</MenuItem>
                                <MenuItem value={40}>Список(сингл)</MenuItem>
                                <MenuItem value={50}>Список(мульти)</MenuItem>
                                <MenuItem value={60}>Рублей</MenuItem>
                                <MenuItem value={70}>Время</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}> 
                            <InputLabel id="select-label-view2">Вид</InputLabel>
                            <Select
                                labelId="select-label-view2"
                                id="select-label-view2"
                                value={view2}
                                label="Вид"
                                onChange={handleViewChange2}                            >
                                <MenuItem value={10}>Регистраций</MenuItem>
                                <MenuItem value={20}>Сумма.</MenuItem>
                                <MenuItem value={30}>МинМакс.</MenuItem>
                                <MenuItem value={30}>Список:Сумма</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>

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