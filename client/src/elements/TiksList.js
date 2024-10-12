import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import React from "react";
import PageManager from "../managers/PageManager";
import TaskManager from "../managers/TaskManager";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import {
    DataGrid,
    GridActionsCellItem,
    GridRowModes
} from '@mui/x-data-grid';


function TiksLits({ tasks, setTasks }) {
    let task = PageManager.pageParamA;

    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id, a, b, c) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        let tik = task.tiks.filter(tik => tik.id == id)[0];
        TaskManager.tikUpdate(tik, tasks, setTasks);
        console.log(tik, rows, a, b, c);
        /**
         * 
         */
    };

    const handleArchiveClick = (id) => () => {
        TaskManager.tikArchive(task.tiks.filter(tik => tik.id === id)[0], tasks, setTasks);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [];

    columns.push({ field: 'datetime', headerName: 'Когда', type: 'dateTime', width: 170, align: 'left', headerAlign: 'left', editable: true });

    // const sparklineColumnType = {
    //     ...GRID_STRING_COL_DEF,
    //     type: 'custom',
    //     display: 'flex',
    //     renderCell: (params) => <GridSparklineCell {...params} />,
    // };
    function GridSparklineCell(props) {
        if (props.value == null) {
            return null;
        }
        return s2hms(props.value);
    }
    function GridSparklineCellEdit(props) {
        if (props.value == null) {
            return null;
        }

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']} >
                    <TimePicker defaultValue={ dayjs(new Date("2020-01-01 00:00").getTime()+9960000)} label="Basic time picker" />
                </DemoContainer>
            </LocalizationProvider>
        );
    }

    let rows = task.tiks.map((tik) => {
        return {
            id: tik.id,
            datetime: new Date(tik.datetime * 1000),
            m1: tik.m1,
            m2: tik.m2
        }
    });


    function columnsPushM(columns, fieldName, m) {
        columns.push({
            field: fieldName,
            headerName: m.icon,
            type: 'custom',
            renderCell: (params) => <GridSparklineCell {...params} />,
            renderEditCell: (params) => <GridSparklineCellEdit {...params} />,
            width: 120, align: 'left', headerAlign: 'left', editable: true
        });
    }

    if (task.m1) {
        columnsPushM(columns, 'm1', task.m1);
    }
    if (task.m2) {
        columnsPushM(columns, 'm2', task.m2);
    }

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
                        sx={{
                            color: 'primary.main',
                        }}
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
                //onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={(a, b, c) => { console.log('onroweditstip', a, b, c); }}
                processRowUpdate={(after, before) => { console.log('process', after, before); }}
            // slots={{
            //     toolbar: EditToolbar,
            //   }}
            />
        </Box>
    );
}

export default TiksLits;
