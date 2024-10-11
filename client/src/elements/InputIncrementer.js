import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Fab } from "@mui/material";
import TaskManager from '../managers/TaskManager';

function InputIncrementer({mIndex, task, tasks, setTasks }) {

    let m;
    switch (mIndex) {
        case 1: m = task.m1; break;
        case 2: m = task.m2; break;
    }

    function onIncrementClick({ task, tasks, setTasks }) {
        TaskManager.increment(task, tasks, setTasks);
    }
    return (
        <Fab size='small' >
            <PlusOneIcon
                fontSize='small'
                onClick={() => onIncrementClick({ task, tasks, setTasks })}
            />
        </Fab>
    );
}

export default InputIncrementer;