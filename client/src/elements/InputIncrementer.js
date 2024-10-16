import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Button } from "antd";
//import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import TaskManager from '../managers/TaskManager';

function InputIncrementer({ mIndex, task, tasks, setTasks }) {

    let m;
    switch (mIndex) {
        case 1: m = task.m1; break;
        case 2: m = task.m2; break;
    }

    function onIncrementClick({ task, tasks, setTasks }) {

        switch (mIndex) {
            case 1: TaskManager.increment(task, tasks, setTasks, 1, 0, 0, 0);
            case 2: TaskManager.increment(task, tasks, setTasks, 0, 1, 0, 0);
        }
    }
    return (
        <Button size="default" shape="circle" icon={<PlusOneIcon fontSize="small"/>}
            onClick={() => onIncrementClick({ task, tasks, setTasks })} />
    );
}

export default InputIncrementer;