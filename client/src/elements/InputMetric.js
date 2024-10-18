import React from 'react';
import InputChecker from './InputChecker';
import InputIncrementer from './InputIncrementer';
import InputSlider from './InputSlider';
import InputStopWatch from './InputStopWatch';

function InputMetric({ mIndex, task, tasks, setTasks }) {

    let m = task.metrics[0];

    if (m) {
        switch (m.inputCode) {
            case 'stopwatch':
                return <InputStopWatch mIndex={mIndex} task={task} tasks={tasks} setTasks={setTasks} />;
            case 'incrementer':
                return <InputIncrementer mIndex={mIndex} task={task} tasks={tasks} setTasks={setTasks} />;
            case 'slider':
                return <InputSlider mIndex={mIndex} task={task} tasks={tasks} setTasks={setTasks} />;
            case 'checker':
                return <InputChecker mIndex={mIndex} task={task} tasks={tasks} setTasks={setTasks} />;
            default:
                return 'n/a';
        }
    }
}

export default InputMetric;