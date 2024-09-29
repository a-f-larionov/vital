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
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ alignItems: "center" }}>
            <Input placeholder="Название задачи" inputRef={ref}></Input>

            <Button variant="contained" color="success" onClick={onClickHandler}>
                Добавить
            </Button>
        </Box>

    );

}

export default ToolAddTask;