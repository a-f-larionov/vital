function TaskManager() {
}

TaskManager.create = function (title, tasks, setTasks) {
    console.log("create task" + title);

    let task = {
        id: crypto.randomUUID(),
        title: title,
        counter: 0,
        needFlush: true
    };

    tasks.push(task);

    this.flush(tasks, setTasks);
}

TaskManager.flush = function (tasks, setTasks) {
    console.log("flush");

    let prs = [];

    tasks.forEach(task => {
        if (task.needFlush === true) {
            prs.push(fetch_('/api/tasks-add', 'post', task)
                .then((r) => {
                    console.log("tasks-add ...", r);
                    if (r == null) return;
                    task.needFlush = false;
                })
            );
        }
        if (task.toDelete === true) {
            prs.push(fetch_('/api/tasks-delete', 'post', { id: task.id })
                .then((r) => {
                    if (r == null) return;
                    task.toDelete = false;
                })
            );
        }
    });

    console.log("flush 2", prs);
    Promise.all(prs).then((a) => {
        localStorage.tasks = JSON.stringify(tasks);
        setTasks([...tasks]);
    });
}
TaskManager.delete = function (task, tasks, setTasks) {
    task.toDelete = true;

    this.flush(tasks, setTasks);
}

TaskManager.load = function (tasks, setTasks) {
    console.log("load");

    fetch_('/api/tasks-list')
        .then((r) => {
            console.log("tasks-list result", r);
            if (r == null) {
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