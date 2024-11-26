import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import dayjs from 'dayjs';
import React from "react";
import PageManager from "../../managers/PageManager";
import TaskManager from "../../managers/TaskManager";


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


import RenderMetricDateTimeEditCell from '../../elements/tiks/RenderMetricDateTimeEditCell';
import RenderTikDateTimeEditCell from "../../elements/tiks/RenderTikDateTimeEditCell";
import RenderCellMetricTime from "./RenderCellMetricTime";

import {
    DataGrid,
    GridActionsCellItem,
    GridRowModes
} from '@mui/x-data-grid';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
function TiksLits({ tasks, setTasks }) {
    let task = PageManager.pageParamA;
    let metrica = PageManager.pageParamB;

    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const [toArchiveId, setToArchiveId] = React.useState(null);

    const handleArchiveClick = (id) => () => {
        setToArchiveId(id);
    };
    const handleArchiveCancel = () => () => {
        setToArchiveId(null);
    };
    const handleArchiveIt = () => () => {
        TaskManager.tikArchive(metrica.tiks.find(tik => tik.id === toArchiveId), tasks, setTasks);
        setRowModesModel({ ...rowModesModel, [toArchiveId]: { mode: GridRowModes.View } });
        setToArchiveId(null);
    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
    };

    let rows = metrica.tiks;

    function pushColumn(columns, fieldName, metrica) {
        let column = {
            field: fieldName,
            headerName: metrica.icon,
            width: 120, align: 'left', headerAlign: 'left', editable: true
        };
        switch (metrica.inputCode) {
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

        columns.push(column);
    }

    const columns = [];

    if (metrica) {
        pushColumn(columns, 'value', metrica);
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
                    <GridActionsCellItem key="id"
                        icon={<SaveIcon />}
                        label="Сохранить"
                        sx={{ color: 'primary.main' }}
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem key="id"
                        icon={<CancelIcon />}
                        label="Отмена"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem key="id"
                    icon={<EditIcon />}
                    label="Редактировать"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem key="id"
                    icon={<DeleteIcon />}
                    label="В архив"
                    onClick={handleArchiveClick(id)}
                    color="inherit"
                />,
            ];
        },
    });


    return (
        <Box>
            <DataGrid
                initialState={{ sorting: { sortModel: [{ field: 'datetime', sort: 'desc' }] } }}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                bordered
                onRowEditStop={(a, b, c) => { console.log('onroweditstip', a, b, c); }}
                processRowUpdate={(after, before) => {
                    let tik = metrica.tiks.find(tik => tik.id === after.id);
                    tik.datetime = after.datetime;
                    tik.value = after.value;
                    TaskManager.tikUpdate(tik, tasks, setTasks);
                    return after;
                }}
                onProcessRowUpdateError={console.log}
            />

            <Dialog
                open={toArchiveId != null}
                TransitionComponent={Transition}
                keepMounted
                onClose={console.log}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Удалить?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {task.title}:{metrica.title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleArchiveCancel()}>Нет</Button>
                    <Button onClick={handleArchiveIt()}>Да</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default TiksLits;
