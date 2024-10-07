import { Box, Input, Button } from "@mui/material";
import React from "react";
import TaskManager from "./TaskManager";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PlusOneIcon from '@mui/icons-material/PlusOne';

function TaskMenu2({ task, tasks, setTasks }) {

    function onNumberCommit({ task, tasks, setTasks }) {
        let amount = parseInt(magicInputRef.current.value);
        TaskManager.commitNumber(task, tasks, setTasks, amount);
    }

    function onIncrementClick({ task, tasks, setTasks }) {
        TaskManager.increment(task, tasks, setTasks);
    }

    let inputRef = React.createRef();
    let magicInputRef = React.createRef();

    return <Box sx={{ minWidth: 0 }}>

        {task.mId1 ?
            <Input inputRef={magicInputRef} name='name' defaultValue={10} sx={{ minWidth: 0, width: 30 }} /> : ''
        }
        {task.mId1
            ?
            <Button variant="contained" color="success" sx={{ minWidth: 0 }}
                onClick={() => onNumberCommit({ task, tasks, setTasks })}
            >
                <AutoFixHighIcon fontSize='small'></AutoFixHighIcon>

            </Button> : ''}

        <Button variant="contained" color="success" sx={{ minWidth: 0 }}
            onClick={() => onIncrementClick({ task, tasks, setTasks })}
        >
            <PlusOneIcon fontSize='small' />
        </Button>
    </Box>
}

export default TaskMenu2;