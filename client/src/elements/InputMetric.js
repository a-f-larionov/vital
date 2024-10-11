import React from 'react';
import InputIncrementer from './InputIncrementer';
import InputSlider from './InputSlider';
import InputStopWatch from './InputStopWatch';

function InputMetric({ mIndex, task, tasks, setTasks }) {

    let m;
    switch (mIndex) {
        case 1: m = task.m1; break;
        case 2: m = task.m2; break;
    }

    if (m) {
        switch (m.inputCode) {
            case 'stopwatch':
                return <InputStopWatch mIndex={mIndex} task={task} tasks={tasks} setTasks={setTasks} />;
                break;
            case 'incrementer':
                return <InputIncrementer mIndex={mIndex} task={task} tasks={tasks} setTasks={setTasks}/>;
                break;
            case 'slider':
                return <InputSlider mIndex={mIndex} task={task} tasks={tasks} setTasks={setTasks}/>;
                break;
        }
    }
    return '-';
}

export default InputMetric;