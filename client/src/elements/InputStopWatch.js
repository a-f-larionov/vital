import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Box } from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import TaskManager from '../managers/TaskManager';

function InputStopWatch({ mIndex, task, tasks, setTasks }) {
    let m = task.m1;
    let sw = JSON.parse(localStorage.stopWatches ? localStorage.stopWatches : '{}');
    console.log(m);
    let swId = task.id + m.id + mIndex;

    function onPlayHandler() {
        sw[swId] = { stopWatchStart: new Date().getTime() };
        localStorage.stopWatches = JSON.stringify(sw);
        TaskManager.flush(tasks, setTasks); // for redraw
    }

    function onStopHandler() {
        let m1;
        let timer = Math.round((new Date() - sw[swId].stopWatchStart) / 1000);
        m1 = timer;
        TaskManager.commitNumber(task, tasks, setTasks, m1, 0, 0, 0);
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
        let timer = (new Date() - sw[swId].stopWatchStart) / 1000;
        timerRef.current.innerHTML = s2hms(timer);
    }

    function s2hms(s) {

        var time = [
            Math.floor(s / 3600), // hours
            Math.floor(s / 60) % 60, // minutes
            Math.floor(s % 60) // seconds
        ];

        if (time[2] < 10) {

            time[2] = "0" + time[2];
        }

        if (time[0] === 0) {

            time.shift();
        } else {

            if (time[1] < 10) {

                time[1] = "0" + time[1];
            }
        }

        return time.join(":");
    }
    console.log(swId, sw[swId]);
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