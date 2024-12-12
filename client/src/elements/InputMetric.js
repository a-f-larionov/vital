import React from 'react';
import InputChecker from './InputChecker';
import InputIncrementer from './InputIncrementer';
import InputSlider from './InputSlider';
import InputStopWatch from './InputStopWatch';

function InputMetric({ task, metric }) {

    switch (metric.inputCode) {
        case 'stopwatch':
            return <InputStopWatch metric={metric} task={task} />;
        case 'incrementer':
            return <InputIncrementer metric={metric} task={task} />;
        case 'slider':
            return <InputSlider metric={metric} task={task} />;
        case 'checker':
            return <InputChecker metric={metric} task={task} />;
        default:
            return 'n/a';
    }
}

export default InputMetric;