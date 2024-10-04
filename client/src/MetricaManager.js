var apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port ? port : 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}

var apiMetrica = apiUrl + "/metrica";

function MetricaManager() {

}

MetricaManager.load = function (callback) {

    fetch_(apiMetrica + "/list")
        .then(r => {
            callback(r);
        });

}

function fetch_(url, method, body) {

    if (!method) method = "get";

    console.log("fetch : " + url + " " + method);

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


export default MetricaManager;