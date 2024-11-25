import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Box } from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import TaskManager from '../managers/TaskManager';
import utils from "../utils";

function InputStopWatch({ metrica, task, tasks, setTasks }) {

    let swId = task.id + '_' + metrica.id;

    function onPlayHandler() {
        TaskManager.sw[swId] = { start: new Date().getTime() };
        localStorage.stopWatches = JSON.stringify(TaskManager.sw);
        TaskManager.flush(tasks, setTasks);
    }

    function onStopHandler() {
        let seconds = Math.round((new Date() - TaskManager.sw[swId].start) / 1000);
        TaskManager.commitNumber(task, tasks, setTasks, metrica, seconds);
        TaskManager.sw[swId] = null;
        localStorage.stopWatches = JSON.stringify(TaskManager.sw);
        TaskManager.flush(tasks, setTasks);
    }

    let timerRef = React.createRef();

    function timeoutHandler() {
        setTimeout(timeoutHandler, 1000 / 40);
        if (TaskManager.sw[swId] === null) return;
        if (TaskManager.sw[swId] === undefined) return;
        if (timerRef.current === null) return;
        let timer = (new Date() - TaskManager.sw[swId].start) / 1000;
        timerRef.current.innerHTML = utils.s2hms(timer, true);
    }

    if (!TaskManager.sw[swId]) {
        return (
            <Button size='default' icon={<PlayCircleIcon onClick={onPlayHandler} />} />
        );
    } else {
        timeoutHandler();
        return (
            <Button size='default' icon={<StopCircleIcon onClick={onStopHandler} />}>
                <Box ref={timerRef}></Box>
            </Button>
        );

    }
}

export default InputStopWatch;