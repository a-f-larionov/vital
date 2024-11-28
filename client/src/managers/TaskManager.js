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

TaskManager.sw = JSON.parse(localStorage.stopWatches ? localStorage.stopWatches : '{}');

TaskManager.lastOne = null;
TaskManager.tasks = null;
TaskManager.setTasks = null;

TaskManager.getSum = function (metric, days, predictDays) {
    let values = metric.tiks;
    values = values.filter(tik => tik.datetime >= (Date.now() / 1000 - 3600 * 24 * days));
    values = values.map(tik => tik.value);

    let sum = 0;
    if (values.length !== 0) sum = values.reduce((a, v) => a + v)

    if (predictDays) {
        sum = sum / days * predictDays;
    }
    switch (metric.typeCode) {
        case 'timestamp': return utils.s2hms(sum, false, true);
        default: return sum;
    }
}

TaskManager.setState = function (tasks, setTasks) {
    TaskManager.tasks = tasks;
    TaskManager.setTasks = setTasks;
}
TaskManager.rememberTheLastOne = function (task, metric, tik) {
    TaskManager.lastOne = { task, metric, tik };
}
TaskManager.tikUndo = function (tik) {
    tik.needUndo = true;
    TaskManager.flush(TaskManager.tasks, TaskManager.setTasks);
}
TaskManager.getLastOne = function () {
    return TaskManager.lastOne;
}

TaskManager.snackBarOpenCallback = null;
TaskManager.setSnackBarOpenCallback = function (setcallback) {
    TaskManager.snackBarOpenCallback = setcallback;
}

TaskManager.switchSortToBottom = function ({ task, tasks, setTasks }) {
    task.sortToBottom = !task.sortToBottom;
    task.needUpdate = true;
    this.flush(tasks, setTasks);
}

TaskManager.getTable = function () {
    let tasks = TaskManager.tasks;
    let getRows = function (task) {
        return task.metrics
            .sort((a, b) => a.sort - b.sort)
            .map((metric) => {

                let cells = dates.map((date) => {
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

                return { cells: cells, metric: metric };
            })
    }
    let tasksViewData = {};

    let dates = getDates(tasks);

    tasksViewData.cols = dates.map(date => ({ datetime: date }));

    tasksViewData.tasks = tasks
        .sort((a, b) => a.tikLastUpdate - b.tikLastUpdate)
        .sort((a, b) => a.sortToBottom - b.sortToBottom)
        .sort((a, b) => {
            return TaskManager.isTaskHasStopWatch(b)
                -
                TaskManager.isTaskHasStopWatch(a);
        })
        .map((task) => {
            return {
                task: task,
                rows: getRows(task)
            }
        })

    return tasksViewData;
}

TaskManager.isTaskHasStopWatch = function (task) {
    let answer = false;
    task.metrics.forEach(metric => {
        if (TaskManager.sw[task.id + '_' + metric.id]) {
            answer = true;
        }
    });
    return answer;
}

TaskManager.tikCreate = function (task, tasks, setTasks, metric, value) {

    value = value !== undefined ? value : 0;

    let newDateTime = new Date().getTime() / 1000;

    let newTik = {
        id: crypto.randomUUID(),
        uid: UserManager.getUid(),
        tid: task.id,
        mid: metric.id,

        datetime: newDateTime,

        value: value,

        needFlush: true
    };

    task.tikLastUpdate = newDateTime;

    let lastOne = TaskManager.getLastOne();

    // Magic logic.
    if (lastOne && lastOne.tik.mid === newTik.mid && lastOne.tik.datetime + 10 > newDateTime) {

        lastOne.tik.value += newTik.value;

        lastOne.tik.needUpdate = true;
    } else {

        metric.tiks.push(newTik);
        TaskManager.rememberTheLastOne(task, metric, newTik);
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
        tikLastUpdate: new Date(new Date()).getTime() / 1000,
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
                    if (tik.needUndo === true) {
                        prs.push(
                            utils.fetch_(apiTiks + '/undo', 'post', tik)
                                .then((r) => {
                                    if (r === null) return;
                                    tik.needUndo = false;
                                    metric.tiks = metric.tiks.filter(t => t.id !== tik.id);
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

                        if (TaskManager.isTaskHasStopWatch(serverTask)) {
                            serverTask.isCollapsed = false;
                        }
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