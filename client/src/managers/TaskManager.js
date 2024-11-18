import UserManager from "./UserManager";
import utils from "../utils";

let apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port ? port : 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}
let apiTasks = apiUrl + "/tasks";
let apiTiks = apiUrl + "/tiks";

function TaskManager() {
}
TaskManager.c = 0;

TaskManager.lastOne = null;
TaskManager.rememberTheLastOne = function (task, tik) {
    TaskManager.lastOne = { task, tik };
}
TaskManager.getLastOne = function () {
    return TaskManager.lastOne;
}

TaskManager.snackBarOpenCallback = null;
TaskManager.setSnackBarOpenCallback = function (setcallback) {
    TaskManager.snackBarOpenCallback = setcallback;
}

TaskManager.getTable = function (tasks) {

    let getCells = function (task) {
        return task.metrics.map((metric) => {

            return dates.map((date) => {
                let title = '';
                let valueToday = metric.tiks.filter((tik) => new Date(tik.datetime * 1000)
                    .toDateString() === date.toDateString());

                let sum = valueToday.reduce((r, tik) => { return r + (metric ? tik.value : 1); }, 0);
                let cnt = valueToday.length;

                title = sum + " " + cnt;
                if (metric && metric.viewCode === 'checker') {
                    if (sum === 0) {
                        title = cnt > 0 ? "✅" : "";
                    } else {
                        title = sum;
                    }
                } else {
                    title = sum;
                    if (title && metric && metric.typeCode === "timestamp") {
                        title = utils.s2hms(title) + '';
                    }
                }
                if (!title) title = '';
                return { title: title };
            });
        })
    }
    let tasksViewData = {};

    let dates = getDates(tasks);

    tasksViewData.cols = dates.map(date => ({ datetime: date }));

    tasksViewData.metrics = tasks.map((task) => {
        return {
            task: task,
            cells: getCells(task)
        }
    })

    return tasksViewData;
}

TaskManager.tikCreate = function (task, tasks, setTasks, metrica, value) {

    value = value !== undefined ? value : 0;

    let newDateTime = new Date().getTime() / 1000;

    let newTik = {
        id: crypto.randomUUID(),
        uid: UserManager.getUid(),
        tid: task.id,
        mid: metrica.id,

        datetime: newDateTime,

        value: value,

        needFlush: true
    };
    let lastOne = TaskManager.getLastOne();

    // Magic logic.
    if (lastOne && lastOne.tik.mid === newTik.mid && lastOne.tik.datetime + 10 > newDateTime) {

        lastOne.tik.value += newTik.value;

        lastOne.tik.needUpdate = true;
    } else {

        metrica.tiks.push(newTik);
        TaskManager.rememberTheLastOne(task, newTik);
    }

    TaskManager.snackBarOpenCallback(true);
    this.flush(tasks, setTasks);
}

TaskManager.tikArchive = function (tik, tasks, setTasks) {

    tik.needArchive = true;
    this.flush(tasks, setTasks);
}

TaskManager.tikUpdate = function (tik, tasks, setTasks) {
    tik.needUpdate = true;
    this.flush(tasks, setTasks);
}

TaskManager.commitNumber = function (task, tasks, setTasks, metrica, value) {
    TaskManager.tikCreate(task, tasks, setTasks, metrica, value);
};

TaskManager.increment = function (task, tasks, setTasks, metrica, value) {
    TaskManager.tikCreate(task, tasks, setTasks, metrica, value);
};

TaskManager.resetMetric = function (task, tasks, setTasks, metrica) {
    utils.fetch_(apiTasks + '/metric/reset', 'post', {
        uid: UserManager.getUid(),
        taskId: task.id,
        metricaId: metrica.id,
        datetimeFrom: new Date(new Date().toDateString()).getTime() / 1000
    }).then(() => {
        TaskManager.load(tasks, setTasks);
    })
}

TaskManager.add = function (task, tasks, setTasks) {

    task.needFlush = true;

    tasks.push(task);

    this.flush(tasks, setTasks);
}

TaskManager.taskUpdate = function (task, tasks, setTasks) {
    task.needUpdate = true;

    this.flush(tasks, setTasks);
}

TaskManager.flushInProgress = false;
TaskManager.needFlush = false;
TaskManager.flush = function (tasks, setTasks) {

    if (TaskManager.flushInProgress) {
        TaskManager.needFlush = true;
        return;
    }

    TaskManager.flushInProgress = true;
    let prs = [];
    tasks.forEach(task => {
        if (task.needFlush === true) {
            prs.push(
                utils.fetch_(apiTasks + '/add', 'post', task)
                    .then((r) => {
                        if (r === null) return;
                        task.needFlush = false;
                    }));
        }
        if (task.needArchive === true) {
            prs.push(
                utils.fetch_(apiTasks + '/archive', 'post', { uid: UserManager.getUid(), id: task.id })
                    .then((r) => {
                        if (r === null) return;
                        task.needArchive = false;
                        tasks = tasks.filter(t => t.id !== task.id);
                    }));
        }
        if (task.needUpdate === true) {
            prs.push(
                utils.fetch_(apiTasks + '/update', 'post', task)
                    .then((r) => {
                        if (r === null) return;
                        task.needUpdate = false;
                    }));
        }

        task.metrics.forEach(
            (metric) =>
                metric.tiks.forEach((tik) => {
                    if (tik.needFlush === true) {
                        prs.push(
                            utils.fetch_(apiTiks + "/add", 'post', tik)
                                .then((r) => {
                                    if (r === null) return;
                                    tik.needFlush = false;
                                }));
                    }
                    if (tik.needArchive === true) {
                        prs.push(
                            utils.fetch_(apiTiks + '/archive', 'post', tik)
                                .then((r) => {
                                    if (r === null) return;
                                    tik.needArchive = false;
                                    metric.tiks = metric.tiks.filter(t => t.id !== tik.id);
                                }));
                    }
                    if (tik.needUpdate === true) {
                        prs.push(
                            utils.fetch_(apiTiks + '/update', 'post', tik)
                                .then((r) => {
                                    if (r === null) return;
                                    tik.needUpdate = false;
                                }));
                    }
                }));
    });

    Promise.all(prs).then((a) => {
        localStorage.tasks = JSON.stringify(tasks);
        setTasks([...tasks]);

        setTimeout(() => {
            TaskManager.flushInProgress = false;
            if (TaskManager.needFlush) {
                TaskManager.needFlush = false;
                TaskManager.flush(tasks, setTasks);
            }
        }, 1000);
    });
}
TaskManager.archive = function (task, tasks, setTasks) {
    task.needArchive = true;

    this.flush(tasks, setTasks);
}

TaskManager.load = function (tasks, setTasks) {

    utils.fetch_(apiTasks + '/list', 'post', { uid: UserManager.getUid() })
        .then((r) => {
            if (r === null) {
                // ingnore data from server
                setTasks(tasks);
            } else {
                if (tasks) {
                    r.forEach(serverTask => {
                        let clientTask = tasks.find(task => task.id === serverTask.id);
                        serverTask.isCollapsed = clientTask ? clientTask.isCollapsed : false;
                    })
                }
                localStorage.tasks = JSON.stringify(r);
                setTasks(r);
            }
        });
};

TaskManager.init = function (setTasks) {
    let tasks = localStorage.tasks === undefined ? [] : JSON.parse(localStorage.tasks)
    this.flush(tasks, (ts) => {

        tasks = ts;
        this.load(tasks, (ts) => {
            tasks = ts;
            localStorage.tasks = JSON.stringify(tasks);
            setTasks(tasks);
        })
    });
}

function getDates(tasks) {
    let deepDays = 100;

    let dates = Array.from({ length: deepDays }, (v, i) => { return -deepDays + 1 + i; })
        .map((offset) => new Date(new Date().getTime() + (offset * 86400000)));

    // get all tiks from all metrics from all tasks and find min datetime
    let minDate = tasks.map(
        task => task.metrics.map(metric => metric.tiks)
            .reduce((all, next) => [...all, ...next]))
        .reduce((all, next) => [...all, ...next])
        .map(tik => tik.datetime)
        .reduce((min, next) => next < min ? next : min);

    dates = dates.filter(date => date > new Date((minDate - 24 * 60 * 60) * 1000));
    return dates;
}



export default TaskManager;