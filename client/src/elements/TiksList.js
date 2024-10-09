import React from "react";
import { Box, TableContainer } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PageManager from "../managers/PageManager";
import TaskManager from "../managers/TaskManager";

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
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
        console.log(id);
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
        { field: 'm1', headerName: 'М1', type: 'number', width: 30, align: 'left', headerAlign: 'left', editable: true },
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
            datetime: new Date(tik.datetime),
            m1: tik.m1
        }
    });


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
