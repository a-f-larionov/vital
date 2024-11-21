import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Box } from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import TaskManager from '../managers/TaskManager';
import utils from "../utils";

function InputStopWatch({ metrica, task, tasks, setTasks }) {
    let sw = JSON.parse(localStorage.stopWatches ? localStorage.stopWatches : '{}');

    let swId = task.id + metrica.id;

    function onPlayHandler() {
        sw[swId] = { start: new Date().getTime() };
        localStorage.stopWatches = JSON.stringify(sw);
        TaskManager.flush(tasks, setTasks); // for redraw
    }

    function onStopHandler() {
        let seconds = Math.round((new Date() - sw[swId].start) / 1000);
        TaskManager.commitNumber(task, tasks, setTasks, metrica, seconds);
        sw[swId] = null;
        localStorage.stopWatches = JSON.stringify(sw);
        TaskManager.flush(tasks, setTasks); // for redraw
    }

    let timerRef = React.createRef();

    function timeoutHandler() {
        setTimeout(timeoutHandler, 1000 / 40);
        if (sw[swId] === null) return;
        if (sw[swId] === undefined) return;
        if (timerRef.current === null) return;
        let timer = (new Date() - sw[swId].start) / 1000;
        timerRef.current.innerHTML = utils.s2hms(timer, true);
    }

    if (!sw[swId]) {
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