import dayjs from 'dayjs';
import React from "react";
import utils from "../../utils";

function RenderCellMetricTime(params) {
    return <div>
        {dayjs(params.value).format('HH:mm')}
        <i style={{ fontSize: 10 }}> / {utils.s2hms(params.row[params.field])}m</i>
    </div>;
}

export default RenderCellMetricTime;

