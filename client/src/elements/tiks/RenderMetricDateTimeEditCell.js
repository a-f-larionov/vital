import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React from "react";

import {
    useGridApiContext
} from '@mui/x-data-grid';


function RenderMetricDateTimeEditCell({ id, field, value, colDef, row }) {
    const apiRef = useGridApiContext();
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker sx={{ '*': { padding: 0.5 } }}
            ampm={false}
            format={'MM/DD HH:mm'}
            defaultValue={dayjs(value)}
            onChange={(dayjsTime) => {
                apiRef.current.setEditCellValue({ id, field, value: new Date(dayjsTime) });
            }}
        />
    </LocalizationProvider>;
}

export default RenderMetricDateTimeEditCell;