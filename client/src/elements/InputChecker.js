import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from "antd";
import TaskManager from '../managers/TaskManager';

function InputChecker({ mIndex, task, tasks, setTasks }) {
    let m = task.metrics[0];

    function onIncrementClick() {
        TaskManager.increment(task, tasks, setTasks, 1, 0, 0, 0);
    }

    function onCheckedClick() {
        window.task = task;
        let count = task.tiks.reduce((r, t) => { return r + t['m' + mIndex]; }, 0);
        if (count) {
            // if(alert()){
            //     return;
            // }
        }
        TaskManager.resetMetric(task, tasks, setTasks, mIndex);
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