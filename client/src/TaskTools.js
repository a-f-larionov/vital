import { Box, Button } from "@mui/material";
import TaskManager from "./TaskManager";

function TaskTools({ task, tasks, setTasks }) {

    function incrementHandler({ task, setTasks }) {
        task.counter++;
        
        setTasks([...tasks]);
        localStorage.initData3 = JSON.stringify(tasks);;
    }

    function deleteHandler({ task, tasks, setTasks }) {
        TaskManager.delete(task, tasks, setTasks);
    }

    return (
        <Box>
            <Button variant="contained" color="success" onClick={() => incrementHandler({ task, setTasks })}>+</Button>
            <Button variant="outlined" color="error" onClick={() => deleteHandler({ task, tasks, setTasks })}>-</Button>
        </Box>
    );
}


export default TaskTools;