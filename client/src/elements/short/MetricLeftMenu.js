import React from "react";
import InputMetric from '../InputMetric';

function MetricLeftMenu({ task, metric }) {
    return <InputMetric key={metric.id} metrica={metric} task={task} />;
}

export default MetricLeftMenu;