import UserManager from "./UserManager";

var apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port ? port : 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}
var apiTasks = apiUrl + "/tasks";
var apiTiks = apiUrl + "/tiks";

function TaskManager() {
}
TaskManager.c = 0;
console.log("!!!TASK MANAGER!!!", TaskManager.c++);

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

    let out = {};

    let dates = Array.from({ length: 21 }, (v, i) => { return -21 + 1 + i; })
        .map((offset) => {
            return new Date(
                new Date().getTime() + (offset * 86400000)
            )
        });

    out.cols = dates.map((date) => {
        return {
            title2: 't',
            datetime: date,
            date: date.getDate(),
            weekDay: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][date.getDay()]
        };
    });

    out.rows = tasks.map((task) => {
        return {
            id: task.id,
            task: task,
            title: task.title,
            cells: dates.map((date) => {
                let title = '';
                let thisDay = task.tiks
                    .filter((tik) => {
                        return new Date(tik.datetime * 1000).getDate() ===
                            date.getDate();
                    });

                let sum = thisDay
                    .reduce((r, tik) => { return r + (task.vCode1 ? tik.m1 : 1); }, 0);
                let cnt = thisDay.length;

                title = sum + " " + cnt;
                if (task.vCode1 === 'checker') {
                    if (sum === 0) {
                        title = cnt > 0 ? "✅" : "";
                    } else {
                        title = sum;
                    }
                } else {
                    title = sum;
                    if (title && task.m1.typeCode === "timestamp") {
                        title = s2hms(title) + '';
                    }
                }
                if (!title) title = '';
                return { title: title };
            })
        }
    })

    return out;
}

TaskManager.tikCreate = function (task, tasks, setTasks, m1) {

    m1 = m1 !== undefined ? m1 : 0;
    
    let newDateTime = new Date().getTime() / 1000;

    let newTik = {
        id: crypto.randomUUID(),
        uid: UserManager.getUid(),
        tid: task.id,

        datetime: newDateTime,

        m1: m1,

        needFlush: true
    };
    let lastOne = TaskManager.getLastOne();

    if (lastOne && lastOne.tik.tid === newTik.tid && lastOne.tik.datetime + 10 > newDateTime) {

        lastOne.tik.m1 += newTik.m1;
        
        lastOne.tik.needUpdate = true;
    } else {

        task.tiks.push(newTik);
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

TaskManager.commitNumber = function (task, tasks, setTasks, m1) {
    TaskManager.tikCreate(task, tasks, setTasks, m1);
};

TaskManager.increment = function (task, tasks, setTasks, m1) {
    TaskManager.tikCreate(task, tasks, setTasks, m1);
};

TaskManager.resetMetric = function (task, tasks, setTasks, mIndex) {
    fetch_(apiTasks + '/metric/reset', 'post', {
        uid: UserManager.getUid(),
        taskId: task.id,
        mIndex: mIndex
    });

    TaskManager.load(tasks, setTasks);
}

TaskManager.add = function (task, tasks, setTasks) {
    task.id = crypto.randomUUID();
    task.uid = UserManager.getUid();
    task.tiks = [];
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
                fetch_(apiTasks + '/add', 'post', task)
                    .then((r) => {
                        if (r === null) return;
                        task.needFlush = false;
                    }));
        }
        if (task.needArchive === true) {
            prs.push(
                fetch_(apiTasks + '/archive', 'post', { uid: UserManager.getUid(), id: task.id })
                    .then((r) => {
                        if (r === null) return;
                        task.needArchive = false;
                        tasks = tasks.filter(t => t.id !== task.id);
                    }));
        }
        if (task.needUpdate === true) {
            prs.push(
                fetch_(apiTasks + '/update', 'post', task)
                    .then((r) => {
                        if (r === null) return;
                        task.needUpdate = false;
                    }));
        }
        task.tiks.forEach((tik) => {
            if (tik.needFlush === true) {
                prs.push(
                    fetch_(apiTiks + "/add", 'post', tik)
                        .then((r) => {
                            if (r === null) return;
                            tik.needFlush = false;
                        }));
            }
            if (tik.needArchive === true) {
                prs.push(
                    fetch_(apiTiks + '/archive', 'post', tik)
                        .then((r) => {
                            if (r === null) return;
                            tik.needArchive = false;
                            task.tiks = task.tiks.filter(t => t.id !== tik.id);
                        }));
            }
            if (tik.needUpdate === true) {
                prs.push(
                    fetch_(apiTiks + '/update', 'post', tik)
                        .then((r) => {
                            if (r === null) return;
                            task.needUpdate = false;
                        }));
            }
        });
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

    fetch_(apiTasks + '/list', 'post', { uid: UserManager.getUid() })
        .then((r) => {
            if (r === null) {
                // skip data from server
                setTasks(tasks);
            } else {

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

function fetch_(url, method, body) {

    if (!method) method = "get";

    return fetch(url, {
        method: method,
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body)
    })
        .catch((e) => { console.error("Catche fetch exception", e); return {}; })
        .then(r => {
            if (r.status !== 200 || r.headers.get("Content-Type") !== "application/json") {
                console.error("fetch error" + url, r);
                return null;
            }
            return r.json();
        });
}

function s2hms(s) {

    var time = [
        Math.floor(s / 3600), // hours
        Math.floor(s / 60) % 60, // minutes
        Math.floor(s % 60) // seconds
    ];

    if (time[2] < 10) {

        time[2] = "0" + time[2];
    }

    time.pop();
    if (time[0] === 0) {

        time.shift();
    } else {

        if (time[1] < 10) {

            time[1] = "0" + time[1];
        }
    }

    return time.join(":");
}


export default TaskManager;