import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from "@mui/material";
import React from "react";
import TaskDialog from './TaskDialog';

function ToolAddTask({ tasks, setTasks }) {

    function onClickHandler() {
        doOpenDialog(true);
    }

    let doOpenDialog = function () { console.error(" must be redefine") };

    return (
        <Box display="flex" justifyContent="center">
            <Button sx={{ minWidth: 0 }} size="small"
                variant="contained" color="success"
                onClick={onClickHandler}>
                <AddIcon />
            </Button>
            <TaskDialog
                setOpenCallback={(handler) => { doOpenDialog = handler }}
                task={{}} tasks={tasks} setTasks={setTasks} />
        </Box >
    );

}

export default ToolAddTask;