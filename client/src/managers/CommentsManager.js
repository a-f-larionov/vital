import UserManager from "./UserManager";

var apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port ? port : 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}
var apiComments = apiUrl + "/comments";

function CommentManager() {

}

CommentManager.init = function ( setComments ) {
    let comments = localStorage.comments === undefined ? [] : JSON.parse(localStorage.comments)
    this.flush(comments, (comment) => {
        comments = comment;
        this.load(comments, (cmnts) => {
            comments = cmnts;
            localStorage.comments = JSON.stringify(comments);
            setComments(comments);
        })
    });
}

CommentManager.flushInProgress = false;
CommentManager.needFlush = false;
CommentManager.flush = function (comments, setComments) {

    if (CommentManager.flushInProgress) {
        CommentManager.needFlush = true;
        return;
    }
    CommentManager.flushInProgress = true;
    let prs = [];
    comments.forEach(comment => {
        if (comment.needFlush === true) {
            prs.push(
                fetch_(apiComments + '/add', 'post', comment)
                    .then((r) => {
                        if (r == null) return;
                        comment.needFlush = false;
                    }));
        }
        if (comment.needArchive === true) {
            prs.push(
                fetch_(apiComments + '/archive', 'post', { uid: UserManager.getUid(), id: comment.id })
                    .then((r) => {
                        if (r == null) return;
                        comment.needArchive = false;
                        comments = comments.filter(c => c.id !== comment.id);
                    }));
        }
        if (comment.needUpdate === true) {
            prs.push(
                fetch_(apiComments + '/update', 'post', comment)
                    .then((r) => {
                        if (r == null) return;
                        comment.needUpdate = false;
                    }));
        }
    });

    Promise.all(prs).then((a) => {
        localStorage.comments = JSON.stringify(comments);
        setComments([...comments]);
        CommentManager.flushInProgress = false;
        if (CommentManager.needFlush) {
            CommentManager.needFlush = false;
            CommentManager.flush(comments, setComments);
        }
    });
}

CommentManager.load = function (comments, setComments) {

    fetch_(apiComments + '/list', 'post', { uid: UserManager.getUid() })
        .then((r) => {
            if (r == null) {
                // skip data from server
                setComments(comments);
            } else {

                localStorage.comments = JSON.stringify(r);
                setComments(r);
            }
        });
};

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

export default CommentManager;