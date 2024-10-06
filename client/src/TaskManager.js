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

TaskManager.getTable = function (tasks) {

    let out = {};

    let dates = [-5, -4, -3, -2, -1, 0]
        .map((offset) => { return new Date(new Date().getTime() + (offset * 86400000)) });

    out.cols = dates.map((date) => { return { title: date.getDate() }; });
    out.rows = tasks.map((task) => {
        return {
            id: task.id,
            task: task,
            title: task.title,
            cells: dates.map((date) => {

                return {
                    title: task.tiks
                        .filter((tik) => {
                            return new Date(tik.datetime * 1000).getDate() ===
                                date.getDate();
                        })
                        .reduce((r, tik) => { return r + (task.vCode1 ? tik.m1 : 1); }, 0)
                };
            })
        }
    })

    return out;
}

TaskManager.addTik = function (task, tasks, setTasks, m1, m2, m3, m4) {
    m1 = m1 != undefined ? m1 : 0;
    m2 = m2 ? m2 : 0;
    m3 = m3 ? m3 : 0;
    m4 = m4 ? m4 : 0;

    task.tiks.push({
        id: crypto.randomUUID(),
        tid: task.id,

        datetime: new Date().getTime() / 1000, // remove Z

        m1: m1,
        m2: m2,
        m3: m3,
        m4: m4,

        needFlush: true
    });

    this.flush(tasks, setTasks);
}

TaskManager.commitNumber = function (task, tasks, setTasks, m1, m2, m3, m4) {
    TaskManager.addTik(task, tasks, setTasks, m1, m2, m3, m4);
};

TaskManager.increment = function (task, tasks, setTasks, m1, m2, m3, m4) {

    TaskManager.addTik(task, tasks, setTasks, m1, m2, m3, m4);
};

TaskManager.create = function (task, tasks, setTasks) {
    task.id = crypto.randomUUID();
    task.tiks = [];
    task.needFlush = true;

    tasks.push(task);

    this.flush(tasks, setTasks);
}

TaskManager.taskUpdate = function (task, tasks, setTasks) {
    task.needUpdate = true;
    
    this.flush(tasks, setTasks);
}

TaskManager.flush = function (tasks, setTasks) {
    
    let prs = [];

    tasks.forEach(task => {
        if (task.needFlush === true) {
            prs.push(
                fetch_(apiTasks + '/add', 'post', task)
                    .then((r) => {
                        if (r == null) return;
                        task.needFlush = false;
                    }));
        }
        if (task.toArchive === true) {
            prs.push(
                fetch_(apiTasks + '/archive', 'post', { id: task.id })
                    .then((r) => {
                        if (r == null) return;
                        task.toArchive = false;
                        tasks = tasks.filter(t => t.id !== task.id);
                    }));
        }
        if (task.needUpdate === true) {
            prs.push(
                fetch_(apiTasks + '/update', 'post', task)
                    .then((r) => {
                        if (r == null) return;
                        task.needUpdate = false;
                    }));
        }
        task.tiks.forEach((tik) => {
            if (tik.needFlush === true) {
                prs.push(
                    fetch_(apiTiks + "/add", 'post', tik)
                        .then((r) => {
                            if (r == null) return;
                            tik.needFlush = false;
                        }));
            }
        });
    });

    Promise.all(prs).then((a) => {
        localStorage.tasks = JSON.stringify(tasks);
        setTasks([...tasks]);
    });
}
TaskManager.archive = function (task, tasks, setTasks) {
    task.toArchive = true;

    this.flush(tasks, setTasks);
}

TaskManager.load = function (tasks, setTasks) {
    console.log("load");

    fetch_(apiTasks + '/list')
        .then((r) => {
            console.log("api/tasks/list result", r);
            if (r == null) {
                // skip data from server
                setTasks(tasks);
            } else {
                console.log(r);
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
    }).then(r => {
        if (r.status !== 200 || r.headers.get("Content-Type") !== "application/json") {
            console.error("fetch error" + url, r);
            return null;
        }
        return r.json();
    });
}

export default TaskManager;