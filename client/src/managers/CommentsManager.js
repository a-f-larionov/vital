import UserManager from "./UserManager";
import utils from "../utils";

let apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port || 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}
let apiComments = apiUrl + "/comments";

function CommentManager() {

}

CommentManager.comments = [];
CommentManager.setComments = null;

CommentManager.add = function (comment, taskId, tikId, objId) {

    CommentManager.comments.push({
        id: crypto.randomUUID(),
        uid: UserManager.getUid(),
        taskId: taskId,
        tikId: tikId,
        objId: objId,
        text: comment,
        needFlush: true
    });

    CommentManager.flush();
}

CommentManager.init = function (setComments) {
    CommentManager.setComments = function (comments) {
        CommentManager.comments = comments;
        localStorage.comments = JSON.stringify(comments);
        setComments(comments);
    };
    let comments = localStorage.comments === undefined ? [] : JSON.parse(localStorage.comments)
    this.flush(comments, (comment) => {
        comments = comment;
        this.load(comments, (cmnts) => {
            comments = cmnts;
            CommentManager.setComments(comments);
        })
    });
}

CommentManager.flushInProgress = false;
CommentManager.needFlush = false;
CommentManager.flush = function () {
    let comments = CommentManager.comments;
    if (CommentManager.flushInProgress) {
        CommentManager.needFlush = true;
        return;
    }
    CommentManager.flushInProgress = true;
    let prs = [];
    comments.forEach(comment => {
        if (comment.needFlush === true) {
            prs.push(
                utils.fetch_(apiComments + '/add', 'post', comment)
                    .then((r) => {
                        if (r === null) return;
                        comment.needFlush = false;
                    }));
        }
        if (comment.needArchive === true) {
            prs.push(
                utils.fetch_(apiComments + '/archive', 'post', { uid: UserManager.getUid(), id: comment.id })
                    .then((r) => {
                        if (r === null) return;
                        comment.needArchive = false;
                        comments = comments.filter(c => c.id !== comment.id);
                    }));
        }
        if (comment.needUpdate === true) {
            prs.push(
                utils.fetch_(apiComments + '/update', 'post', comment)
                    .then((r) => {
                        if (r === null) return;
                        comment.needUpdate = false;
                    }));
        }
    });

    Promise.all(prs).then((a) => {
        CommentManager.setComments([...comments]);
        CommentManager.flushInProgress = false;
        if (CommentManager.needFlush) {
            CommentManager.needFlush = false;
            CommentManager.flush();
        }
    });
}

CommentManager.load = function (comments, setComments) {

    utils.fetch_(apiComments + '/list', 'post', { uid: UserManager.getUid() })
        .then((r) => {
            if (r === null) {
                // skip data from server
                CommentManager.setComments(comments);
            } else {
                CommentManager.setComments(r);
            }
        });
};

export default CommentManager;