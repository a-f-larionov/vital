import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Button } from "antd";
//import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import TaskManager from '../managers/TaskManager';

function InputIncrementer({ mIndex, task, tasks, setTasks }) {

    let m = task.m1;

    function onIncrementClick({ task, tasks, setTasks }) {
        
         TaskManager.increment(task, tasks, setTasks, 1, 0, 0, 0);
    }
    return (
        <Button size="default" shape="circle" icon={<PlusOneIcon fontSize="small"/>}
            onClick={() => onIncrementClick({ task, tasks, setTasks })} />
    );
}

export default InputIncrementer;