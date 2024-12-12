import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from "antd";
import TaskManager from '../managers/TaskManager';

function InputChecker({ task, metric }) {

    function onIncrementClick() {
        TaskManager.increment(task, metric, 1);
    }

    function onCheckedClick() {
        TaskManager.resetMetric(task, metric);
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