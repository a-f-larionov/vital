import React from 'react';
import { Box, Fab } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import TaskManager from '../managers/TaskManager';

function InputStopWatch({ mIndex, task, tasks, setTasks }) {
    let m;
    switch (mIndex) {
        case 1: m = task.m1; break;
        case 2: m = task.m2; break;

    }
    let sw = JSON.parse(localStorage.stopWatches ? localStorage.stopWatches : '{}');

    let swId = task.id + m.id + mIndex;

    function onPlayHandler() {
        sw[swId] = { stopWatchStart: new Date().getTime() };
        localStorage.stopWatches = JSON.stringify(sw);
        TaskManager.flush(tasks, setTasks); // for redraw
    }

    function onStopHandler() {
        let m1, m2, m3, m4;
        m1 = m2 = m3 = m4 = 0;
        let timer = Math.round((new Date() - sw[swId].stopWatchStart) / 1000);  
        switch (mIndex) {
            case 1: m1 = timer; break;
            case 2: m2 = timer; break;
        }
        TaskManager.commitNumber(task, tasks, setTasks, m1, m2, m3, m4);
        sw[swId] = null;
        localStorage.stopWatches = JSON.stringify(sw);
        TaskManager.flush(tasks, setTasks); // for redraw
    }

    let timerRef = React.createRef();

    function timeoutHandler() {
        setTimeout(timeoutHandler, 1000 / 40);
        if (sw[swId] === null) return;
        if (timerRef.current == null) return;
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

    if (sw[swId] == null) {
        return (
            <Fab size='small' >
                <PlayCircleIcon onClick={onPlayHandler} />
            </Fab>
        );
    } else {
        timeoutHandler();
        return (
            <Fab size='small' >
                <StopCircleIcon onClick={onStopHandler} />
                <Box ref={timerRef}></Box>
            </Fab>
        );

    }
}

export default InputStopWatch;