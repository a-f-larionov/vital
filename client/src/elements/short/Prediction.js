import TaskManager from "../../managers/TaskManager";
import utils from "../../utils";

function Prediction({ metric }) {

    window.tasks = TaskManager.tasks;
    let all = TaskManager.getSum(metric, 100000);
    let lastSeven = TaskManager.getSum(metric, 7);
    let hundredPrediction = TaskManager.getSum(metric, 14, 100);

    let rocket = Math.round(lastSeven / 5);

    let groupedByWeek = Object.groupBy(metric.tiks, (t) => getWeekNumber(new Date(t.datetime * 1000))[1]);

    let currentWeekNumber = getWeekNumber(new Date())[1];

    let byWeeks = [];
    let sum = 0;
    for (var i = currentWeekNumber - 3; i <= currentWeekNumber; i++) {
        if (!groupedByWeek[i]) {
            sum = 0;
        } else {
            sum = groupedByWeek[i].map(t => t.value).reduce((a, v) => a + v)
        }

        if (metric.typeCode === 'timestamp') {
            sum = utils.s2hms(sum, false, false, true);
        }
        byWeeks.push(sum);
    }
    console.log(byWeeks);

    //groupedByWeek
    //🔮
    if (all === 0) return <></>;
    if (metric.typeCode == 'timestamp') return <>

        {rocket ? '🚀' + rocket : ''}

        {byWeeks[0][0] || byWeeks[1][0] || byWeeks[2][0] || byWeeks[3][0] ? '🔮' : ''}

        {byWeeks[0][0]}<sup style={{ fontSize: 5 }} >{byWeeks[0][1]}</sup> &nbsp;
        {byWeeks[1][0]}<sup style={{ fontSize: 5 }} >{byWeeks[1][1]}</sup> &nbsp;
        {byWeeks[2][0]}<sup style={{ fontSize: 5 }} >{byWeeks[2][1]}</sup> &nbsp;
        {byWeeks[3][0]}<sup style={{ fontSize: 5 }} >{byWeeks[3][1]}</sup> &nbsp;

        💯 {hundredPrediction}
        ∑ {all}
        /
    </>;
    return <>

        {rocket ? '🚀' + rocket : ''}

        {byWeeks[0] || byWeeks[1] || byWeeks[2] || byWeeks[3] ? '🔮' : ''}

        {byWeeks[0]}&nbsp;
        {byWeeks[1]}&nbsp;
        {byWeeks[2]}&nbsp;
        {byWeeks[3]}&nbsp;

        💯{hundredPrediction}&nbsp;
        ∑{all}
        &nbsp;/&nbsp;
    </>;
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}


export default Prediction;