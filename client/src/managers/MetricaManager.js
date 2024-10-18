
var apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port ? port : 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}

var apiMetrica = apiUrl + "/metrica";

function MetricaManager() {

}
MetricaManager.metricTemplates = [];

MetricaManager.inProcess = false;
MetricaManager.load = function (metrica, setMetrica) {

    if (MetricaManager.metricTemplates.length > 0) {
        return;
    }
    MetricaManager.metricTemplates = metrica;

    if (MetricaManager.inProcess) return;
    MetricaManager.inProcess = true;
    fetch_(apiMetrica + "/list-templates")
        .then(metricaData => {
            metricaData = metricaData.filter((m) => {
                var s ={ 
                    'stopwatch': true,
                    'incrementer': true,
                    //'Страницы': true,
                    //  'Такты': true,
                    'checker': true,

                };
                return s[m.inputCode];
            });
            setMetrica(metricaData);
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


export default MetricaManager;