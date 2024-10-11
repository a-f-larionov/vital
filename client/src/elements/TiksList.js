import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import React from "react";
import PageManager from "../managers/PageManager";
import TaskManager from "../managers/TaskManager";

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

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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

    const columns = [
        { field: 'datetime', headerName: 'Момент', type: 'dateTime', width: 170, align: 'left', headerAlign: 'left', editable: true },
        { field: 'm1', headerName: 'М1', type: 'number', width: 120, align: 'left', headerAlign: 'left', editable: true },
        { field: 'm2', headerName: 'М2', type: 'number', width: 120, align: 'left', headerAlign: 'left', editable: true },
        {
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
        },

    ];
    let rows = task.tiks.map((tik) => {
        return {
            id: tik.id,
            datetime: new Date(tik.datetime * 1000),
            m1: task.m1.typeCode == 'timestamp' ? s2hms(tik.m1) : task.m1,
            m2: tik.m2
        }
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
            // onRowEditStop={handleRowEditStop}
            //processRowUpdate={processRowUpdate}
            // slots={{
            //     toolbar: EditToolbar,
            //   }}
            />
        </Box>
    );
}

export default TiksLits;
