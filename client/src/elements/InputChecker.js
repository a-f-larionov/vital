import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from "antd";
import TaskManager from '../managers/TaskManager';

function InputChecker({ metrica: metric, task, tasks, setTasks }) {

    function onIncrementClick() {
        TaskManager.increment(task, tasks, setTasks, metric, 1);
    }

    function onCheckedClick() {

        //let count = task.tiks.reduce((r, t) => { return r + metric.value; }, 0);
        // if (count) {
        //     // if(alert()){
        //     //     return;
            
        //     // }
        // }
        TaskManager.resetMetric(task, tasks, setTasks, metric);
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