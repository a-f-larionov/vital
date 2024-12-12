import React from 'react';
import InputChecker from './InputChecker';
import InputIncrementer from './InputIncrementer';
import InputSlider from './InputSlider';
import InputStopWatch from './InputStopWatch';

function InputMetric({ metrica, task }) {

    switch (metrica.inputCode) {
        case 'stopwatch':
            return <InputStopWatch metrica={metrica} task={task} />;
        case 'incrementer':
            return <InputIncrementer metrica={metrica} task={task} />;
        case 'slider':
            return <InputSlider metrica={metrica} task={task} />;
        case 'checker':
            return <InputChecker metrica={metrica} task={task} />;
        default:
            return 'n/a';
    }
}

export default InputMetric;