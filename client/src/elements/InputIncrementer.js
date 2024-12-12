import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Button } from "antd";
//import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import TaskManager from '../managers/TaskManager';

function InputIncrementer({ metric, task }) {

    function onIncrementClick() {

        TaskManager.increment(task, metric, 1);
    }
    return (
        <Button size="default" shape="circle" icon={<PlusOneIcon fontSize="small" />}
            onClick={() => onIncrementClick()} />
    );
}

export default InputIncrementer;