import React from "react";
import InputMetric from '../InputMetric';

function MetricLeftMenu({ task, metric }) {
    return <InputMetric key={metric.id} metric={metric} task={task} />;
}

export default MetricLeftMenu;