import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Button } from "antd";
//import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import TaskManager from '../managers/TaskManager';

function InputIncrementer({ metrica, task }) {

    function onIncrementClick() {

        TaskManager.increment(task, metrica, 1);
    }
    return (
        <Button size="default" shape="circle" icon={<PlusOneIcon fontSize="small" />}
            onClick={() => onIncrementClick()} />
    );
}

export default InputIncrementer;