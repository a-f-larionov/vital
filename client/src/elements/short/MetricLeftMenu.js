import React from "react";
import InputMetric from '../InputMetric';

function MetricLeftMenu({ task, metric }) {
    return <>
        <div style={{ overflow: 'visible', height: 0, width: 90, position: 'absolute' }}>
            <div style={{ fontSize: 8, color: 'grey' }}>{metric.title}</div>
        </div>
        <InputMetric key={metric.id} metric={metric} task={task} />
    </>
}

export default MetricLeftMenu;