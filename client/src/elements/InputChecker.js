import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from "antd";
import TaskManager from '../managers/TaskManager';

function InputChecker({ task, metrica }) {

    function onIncrementClick() {
        TaskManager.increment(task, metrica, 1);
    }

    function onCheckedClick() {
        TaskManager.resetMetric(task, metrica);
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