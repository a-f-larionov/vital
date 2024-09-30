import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Input } from "@mui/material";
import React from "react";
import TaskManager from "./TaskManager";

function ToolAddTask({ tasks, setTasks }) {

    let ref = React.createRef();

    function onClickHandler() {
        TaskManager.create(ref.current.value, tasks, setTasks);

        ref.current.value = "";
    }

    return (
        <Box display="flex" justifyContent="center">
            <Input placeholder="Название задачи" inputRef={ref} ></Input>

            <Button sx={{ minWidth: 0 }} size="small" variant="contained" color="success" onClick={onClickHandler}>
                <AddIcon />
            </Button>
        </Box>
    );

}

export default ToolAddTask;