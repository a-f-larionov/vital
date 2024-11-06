import React from 'react';
import InputChecker from './InputChecker';
import InputIncrementer from './InputIncrementer';
import InputSlider from './InputSlider';
import InputStopWatch from './InputStopWatch';

function InputMetric({ metrica, task, tasks, setTasks }) {

    let m = metrica;
    if (m) {
        switch (m.inputCode) {
            case 'stopwatch':
                return <InputStopWatch metrica={m} task={task} tasks={tasks} setTasks={setTasks} />;
            case 'incrementer':
                return <InputIncrementer metrica={m} task={task} tasks={tasks} setTasks={setTasks} />;
            case 'slider':
                return <InputSlider metrica={m} task={task} tasks={tasks} setTasks={setTasks} />;
            case 'checker':
                return <InputChecker metrica={m} task={task} tasks={tasks} setTasks={setTasks} />;
            default:
                return 'n/a';
        }
    }
}

export default InputMetric;