import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from "antd";
import TaskManager from '../managers/TaskManager';

function InputChecker({ metrica: metric, task, tasks, setTasks }) {

    function onIncrementClick() {
        TaskManager.increment(task, tasks, metric, 1);
    }

    function onCheckedClick() {
        TaskManager.resetMetric(task, tasks, metric);
    }

    //✅
    //@todo сброс данных конфирм
    return <>
        <Button size="small" shape="circle" icon={<CheckOutlined />}
            onClick={onCheckedClick} />
        <Button size="small" shape="circle" icon={<PlusOutlined />}
            onClick={onIncrementClick} />
    </>

}

export default InputChecker;