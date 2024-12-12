import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Box } from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import TaskManager from '../managers/TaskManager';
import utils from "../utils";

function InputStopWatch({ metrica, task }) {

    let swId = task.id + '_' + metrica.id;
    let timerRef = React.createRef();

    if (!TaskManager.sw[swId]) {
        return (
            <Button size='default' icon={<PlayCircleIcon onClick={() => InputStopWatch.onPlayHandler(swId)} />} />
        );
    } else {
        const el = <Button size='default' icon={<StopCircleIcon onClick={() => InputStopWatch.onStopHandler(swId, task, metrica)} />}>
            <Box ref={timerRef}></Box>
        </Button>;
        InputStopWatch.timeoutHandler(swId, timerRef);
        return el;

    }
}

InputStopWatch.onPlayHandler = (swId) => {
    TaskManager.sw[swId] = { start: new Date().getTime() };
    localStorage.stopWatches = JSON.stringify(TaskManager.sw);
    TaskManager.flush();
}


InputStopWatch.onStopHandler = (swId, task, metrica) => {
    let seconds = Math.round((new Date() - TaskManager.sw[swId].start) / 1000);
    TaskManager.commitNumber(task, metrica, seconds);
    TaskManager.sw[swId] = null;
    localStorage.stopWatches = JSON.stringify(TaskManager.sw);
    TaskManager.flush();
}

InputStopWatch.timeoutHandler = (swId, timerRef) => {
    setTimeout(() => InputStopWatch.timeoutHandler(swId, timerRef), 1000 / 40);
    if (TaskManager.sw[swId] === null) return;
    if (TaskManager.sw[swId] === undefined) return;
    if (timerRef.current === null) return;
    let timer = (new Date() - TaskManager.sw[swId].start) / 1000;
    timerRef.current.innerHTML = utils.s2hms(timer, true);
}

export default InputStopWatch;