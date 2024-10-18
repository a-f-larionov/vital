import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React from "react";
import PageManager from "../managers/PageManager";
import TaskManager from "../managers/TaskManager";

import {
    DataGrid,
    GridActionsCellItem,
    GridRowModes,
    useGridApiContext
} from '@mui/x-data-grid';


function TiksLits({ tasks, setTasks }) {
    let task = PageManager.pageParamA;

    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id, a, b, c) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleArchiveClick = (id) => () => {
        TaskManager.tikArchive(task.tiks.find(tik => tik.id === id), tasks, setTasks);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
    };

    let rows = task.tiks;
    function RenderTikDateTimeEditCell({ id, field, value, colDef }) {
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

    function RenderCellMetricTime(params) {
        return <div>
            {dayjs(params.value).format('HH:mm')}
            <i style={{ fontSize: 10 }}> / {s2hms(params.row[params.field])}m</i>
        </div>;
    }

    function columnsPushM(columns, fieldName, m) {
        let column = {
            field: fieldName,
            headerName: m.icon,
            width: 120, align: 'left', headerAlign: 'left', editable: true
        };
        switch (m.inputCode) {
            case 'stopwatch':
                column = {
                    ...column,
                    type: 'custom',
                    valueGetter: (v, row) => {
                        let startTime = new Date(((new Date(row.datetime * 1000).getTime() - v * 1000)));
                        return startTime;
                    },
                    valueSetter: (newValue, row, colDef) => {
                        let seconds = row.datetime - newValue.getTime() / 1000;
                        row[colDef.field] = seconds;
                        return row;
                    },
                    renderCell: (params) => <RenderCellMetricTime  {...params} />,
                    renderEditCell: (params) => <RenderMetricDateTimeEditCell {...params} />,
                };
                break;
            default:
                column.type = 'number';
                break;
        }

        console.log(column);
        columns.push(column);
    }

    const columns = [];

    if (task.metrics[0]) {
        columnsPushM(columns, 'm1', task.metrics[0]);
    }

    columns.push({
        field: 'datetime',
        headerName: 'КоммитТайм',
        valueGetter: (v) => { return new Date(v * 1000); },
        valueSetter: (newValue, row) => { row.datetime = newValue.getTime() / 1000; return row; },
        renderCell: (params) => <div>{dayjs(params.value).format("D HH:mm")}</div>,
        renderEditCell: (params) => <RenderTikDateTimeEditCell {...params} />,
        type: 'dateTime', width: 170, align: 'left', headerAlign: 'left', editable: true
    });

    columns.push({
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{ color: 'primary.main' }}
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Отмена"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Редактировать"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="В архив"
                    onClick={handleArchiveClick(id)}
                    color="inherit"
                />,
            ];
        },
    });

    function s2hms(s) {

        var time = [
            Math.floor(s / 3600), // hours
            Math.floor(s / 60) % 60, // minutes
            Math.floor(s % 60) // seconds
        ];

        if (time[2] < 10) {

            time[2] = "0" + time[2];
        }

        time.pop(); //remove seconds
        if (time[0] === 0) {

            time.shift();
        } else {

            if (time[1] < 10) {

                time[1] = "0" + time[1];
            }
        }

        return time.join(":");
    }

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                bordered
                onRowEditStop={(a, b, c) => { console.log('onroweditstip', a, b, c); }}
                processRowUpdate={(after, before) => {
                    let tik = task.tiks.find(tik => tik.id === after.id);
                    tik.datetime = after.datetime;
                    tik.m1 = after.m1;
                    TaskManager.tikUpdate(tik, tasks, setTasks);
                    return after;
                }}
                onProcessRowUpdateError={console.log}
            />
        </Box>
    );
}

export default TiksLits;
