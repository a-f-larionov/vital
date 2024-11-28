import TaskManager from "../../managers/TaskManager";

function Prediction({ metric }) {


    let all = TaskManager.getSum(metric, 100000);
    let lastSeven = TaskManager.getSum(metric, 7);
    let twoWeeks = TaskManager.getSum(metric, 14);
    let monthPrediction = TaskManager.getSum(metric, 14, 30);
    let hundredPrediction = TaskManager.getSum(metric, 14, 100);

    let rocket = Math.round(twoWeeks / 14 / 1.4 * 10) / 10;

    if (all === 0) return <></>;
    return <>

        {rocket ? '🚀' + rocket : ''}

        ∑ {all}

        {lastSeven || monthPrediction || hundredPrediction ? '🔮' : ''}

        {lastSeven === 0 ? '' : ' ' + lastSeven}

        {monthPrediction === 0 ? '' : ' ' + monthPrediction}

        {hundredPrediction === 0 ? '' : ' ' + hundredPrediction}
    </>
}

export default Prediction;