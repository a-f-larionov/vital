function TaskManager() {
}

TaskManager.getTable = function (tasks) {

    let out = {};

    let dates = [-5, -4, -3, -2, -1, 0]
        .map((offset) => { return new Date(new Date().getTime() + (offset * 86400000)) });


    out.cols = dates.map((date) => { return { title: date.getDate() }; });
    out.rows = tasks.map((task) => {
        return {
            id: task.id, task: task,
            title: task.title,
            cells: dates.map((date) => {
                return {
                    title: task.tiks
                        .filter((tik) => {
                            return new Date(tik.datetime).getDate() ===
                                date.getDate();
                        })
                        .reduce((r, tik) => { return r + tik.times; }, 0)
                };
            })
        }
    })

    return out;
}

TaskManager.increment = function (task, tasks, setTasks) {

    let date = new Date();
    task.tiks.push({
        id: crypto.randomUUID(),
        tid: task.id,
        datetime: new Date().toISOString(), // remove Z
        seconds: 0,
        times: 1,
        m1: 0,
        m2: 0,
        m3: 0,
        m4: 0,
        needFlush: true
    });

    this.flush(tasks, setTasks);
};

TaskManager.create = function (title, tasks, setTasks) {
    console.log("create task" + title);

    let task = {
        id: crypto.randomUUID(),
        title: title,
        tiks: [],
        needFlush: true
    };

    tasks.push(task);

    this.flush(tasks, setTasks);
}

TaskManager.taskUpdate = function (task, tasks, setTasks) {

    task.needUpdate = true;

    this.flush(tasks, setTasks);
}

TaskManager.flush = function (tasks, setTasks) {
    console.log("flush");

    let prs = [];

    tasks.forEach(task => {
        if (task.needFlush === true) {
            prs.push(
                fetch_('/api/tasks-add', 'post', task)
                    .then((r) => {
                        if (r == null) return;
                        task.needFlush = false;
                    }));
        }
        if (task.toArchive === true) {
            prs.push(
                fetch_('/api/tasks-archive', 'post', { id: task.id })
                    .then((r) => {
                        if (r == null) return;
                        task.toArchive = false;
                        tasks = tasks.filter(t => t.id !== task.id);
                    }));
        }
        if (task.needUpdate === true) {
            prs.push(
                fetch_('/api/tasks-update', 'post', { id: task.id, title: task.title })
                    .then((r) => {
                        if (r == null) return;
                        task.needUpdate = false;
                    }));
        }
        task.tiks.forEach((tik) => {
            if (tik.needFlush === true) {
                prs.push(
                    fetch_("/api/tiks-add", 'post', tik)
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

    fetch_('/api/tasks-list')
        .then((r) => {
            console.log("tasks-list result", r);
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
    console.log('getTasks');
    let tasks = localStorage.tasks === undefined ? [] : JSON.parse(localStorage.tasks);
    console.log('getTasks 2', tasks);
    this.flush(tasks, (ts) => {
        tasks = ts;
        this.load(tasks, (ts) => {
            tasks = ts;
            localStorage.tasks = JSON.stringify(tasks);
            console.log('getTasks 3');
            setTasks(tasks);
        })
    });
}

function fetch_(url, method, body) {

    console.log("fetch : " + url);

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