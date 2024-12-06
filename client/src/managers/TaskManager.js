import UserManager from "./UserManager";
import utils from "../utils";
import React from "react";

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


TaskManager.tasks = null;
TaskManager.setTasks = null;
TaskManager.lastOne = null;
TaskManager.setLastOne = null;
TaskManager.tikUpdateDelay = 15;

TaskManager.getSum = function (metric, days, predictDays) {
    let values = metric.tiks;
    values = values.filter(tik => tik.datetime >= (Date.now() / 1000 - 3600 * 24 * days));
    values = values.map(tik => tik.value);

    let sum = 0;
    if (values.length !== 0) sum = values.reduce((a, v) => a + v)

    if (predictDays) {
        sum = sum / days * predictDays;
    }
    sum = Math.floor(sum);
    switch (metric.typeCode) {
        case 'timestamp': return utils.s2hms(sum, false, true);
        default: return sum;
    }
}

TaskManager.setState = function (tasks, lastOne, setLastOne) {
    TaskManager.tasks = tasks;
    TaskManager.lastOne = lastOne;
    TaskManager.setLastOne = setLastOne;
}

TaskManager.rememberTheLastOne = function (task, metric, newTik) {

    let lastOne = structuredClone(TaskManager.lastOne);

    let lastTask = lastOne.taskId ? TaskManager.tasks.find((task) => lastOne.taskId == task.id) : null;
    let lastMetrics = lastTask ? lastTask.metrics.filter((metric) => lastOne.metricIds.includes(metric.id)) : null;
    let lastTikDatetime = lastMetrics ? Math.max(...lastMetrics.map((metric) => Math.max(...metric.tiks.map(tik => tik.datetime)))) : null;

    window.metric = metric;
    window.newTik = newTik;
    window.lastMetrics = lastMetrics;

    if (lastTask && lastTask.id === task.id && (lastTikDatetime + TaskManager.tikUpdateDelay) >= (Date.now() / 1000)) {

        if (lastMetrics.find(m => m.id === metric.id)) {
            
            metric.tiks.sort((a, b) => b.datetime - a.datetime);
            metric.tiks[0].value += newTik.value;
            metric.tiks[0].datetime = newTik.datetime;
            metric.tiks[0].needUpdate = true;

        } else {
            newTik.needFlush = true;
            metric.tiks.push(newTik);
            lastOne.metricIds.push(metric.id);
        }
    } else {
        newTik.needFlush = true;
        metric.tiks.push(newTik);
        lastOne = { taskId: task.id, metricIds: [metric.id] };
    }

    TaskManager.setLastOne(lastOne);
}

TaskManager.tikUndo = function (tik) {
    tik.needUndo = true;
    TaskManager.flush();
}

TaskManager.snackBarOpenCallback = null;
TaskManager.setSnackBarOpenCallback = function (setcallback) {
    TaskManager.snackBarOpenCallback = setcallback;
}

TaskManager.switchSortToBottom = function ({ task }) {
    task.sortToBottom = !task.sortToBottom;
    task.needUpdate = true;
    this.flush();
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

TaskManager.tikCreate = function (task, tasks, metric, value) {

    value = value !== undefined ? value : 0;

    let datetime = Date.now() / 1000;

    let newTik = {
        id: crypto.randomUUID(),
        uid: UserManager.getUid(),
        tid: task.id,
        mid: metric.id,

        datetime: datetime,
        value: value
    };

    setTimeout(function () {
        //       task.tikLastUpdate = datetime;
    }, TaskManager.tikUpdateDelay * 1000);

    TaskManager.rememberTheLastOne(task, metric, newTik);

    TaskManager.snackBarOpenCallback(true);
    this.flush();

}

TaskManager.tikArchive = function (tik) {

    tik.needArchive = true;
    this.flush();
}

TaskManager.tikUpdate = function (tik) {
    tik.needUpdate = true;
    this.flush();
}

TaskManager.commitNumber = function (task, tasks, metrica, value) {
    TaskManager.tikCreate(task, tasks, metrica, value);
};

TaskManager.increment = function (task, tasks, metrica, value) {
    TaskManager.tikCreate(task, tasks, metrica, value);
};

TaskManager.resetMetric = function (task, tasks, metrica) {
    utils.fetch_(apiTasks + '/metric/reset', 'post', {
        uid: UserManager.getUid(),
        taskId: task.id,
        metricaId: metrica.id,
        tikLastUpdate: new Date(new Date()).getTime() / 1000,
        datetimeFrom: new Date(new Date().toDateString()).getTime() / 1000
    }).then(() => {
        TaskManager.load(tasks);
    })
}

TaskManager.add = function (task) {

    task.needFlush = true;

    TaskManager.tasks.push(task);

    this.flush();
}

TaskManager.taskUpdate = function (task) {
    task.needUpdate = true;

    this.flush();
}

TaskManager.flushInProgress = false;
TaskManager.needFlush = false;
TaskManager.flush = function (setTasks) {
    let tasks = TaskManager.tasks;
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
        if (setTasks) {
            setTasks([...tasks]);
        } else {
            TaskManager.setTasks([...tasks]);
        }

        setTimeout(() => {
            TaskManager.flushInProgress = false;
            if (TaskManager.needFlush) {
                TaskManager.flush();
                TaskManager.needFlush = false;
            }
        }, 1000);
    });
}
TaskManager.archive = function (task) {
    task.needArchive = true;

    this.flush();
}

TaskManager.load = function (clientTasks, setTasks) {

    utils.fetch_(apiTasks + '/list', 'post', { uid: UserManager.getUid() })
        .then((serverTasks) => {
            if (serverTasks === null) {
                // ignore data from server
                TaskManager.setTasks(clientTasks);
            } else {
                // Set isCollapsed is here! Its like merge serverTasks and clientTasks
                if (clientTasks) {
                    serverTasks.forEach(serverTask => {
                        let clientTask = clientTasks.find(task => task.id === serverTask.id);
                        serverTask.isCollapsed = clientTask ? clientTask.isCollapsed : false;

                        if (TaskManager.isTaskHasStopWatch(serverTask)) {
                            serverTask.isCollapsed = false;
                        }
                    });
                }
                TaskManager.setTasks(serverTasks);
            }
        });
};


TaskManager.init = function (setTasks) {
    if (TaskManager.init.inProgress) return;
    TaskManager.init.inProgress = true;
    let clientTasks;
    try {
        clientTasks = JSON.parse(localStorage.tasks)
        if (!Array.isArray(clientTasks)) {
            clientTasks = [];
        }
    } catch {
        clientTasks = [];
    }
    TaskManager.setTasks = function (tasks) {
        setTasks(tasks);
        localStorage.tasks = JSON.stringify(tasks);
    };
    TaskManager.tasks = clientTasks;
    setTasks(clientTasks);
    this.flush((flushedTasks) => {
        this.load(flushedTasks);
    });
}

function getDates(tasks) {
    let deepDays = 100;

    let dates = Array.from({ length: deepDays }, (v, i) => { return -deepDays + 1 + i; })
        .map((offset) => new Date(new Date().getTime() + (offset * 86400000)));

    // get all tiks from all metrics from all tasks and find min datetime
    let minDate;
    if (tasks.length > 0) {
        minDate = tasks.map(
            task => task.metrics.map(metric => metric.tiks)
                .reduce((all, next) => [...all, ...next]))
            .reduce((all, next) => [...all, ...next])
            .map(tik => tik.datetime)
            .reduce((min, next) => next < min ? next : min);
    } else {
        minDate = Date.now();
    }

    dates = dates.filter(date => date > new Date((minDate - 24 * 60 * 60) * 1000));
    return dates;
}




export default TaskManager;