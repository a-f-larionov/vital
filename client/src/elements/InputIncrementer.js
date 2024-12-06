import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Button } from "antd";
//import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import TaskManager from '../managers/TaskManager';

function InputIncrementer({ metrica, task, tasks }) {
    let m = metrica;

    function onIncrementClick({ task, tasks }) {

        TaskManager.increment(task, tasks, metrica, 1);
    }
    return (
        <Button size="default" shape="circle" icon={<PlusOneIcon fontSize="small" />}
            onClick={() => onIncrementClick({ task, tasks })} />
    );
}

export default InputIncrementer;