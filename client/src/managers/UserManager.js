var apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port ? port : 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}
var apiUsers = apiUrl + "/users";

function UserManager() {


}

UserManager.register = function (googleEmail, picture, setUserProfile) {

    fetch_(apiUsers + "/register", "post", {
        googleEmail: googleEmail,
        picture: picture
    }).then((r) => {
        console.log(r);
        setUserProfile({
            id: r.id,
            picture: r.picture,
        });

        UserManager.uid = r.id;
    });
}

UserManager.getUid = function(){
    return UserManager.uid;
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

export default UserManager;