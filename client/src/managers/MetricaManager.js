import utils from "../utils";
let apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port || 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}

let apiMetrica = apiUrl + "/metrica";

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
    utils.fetch_(apiMetrica + "/list-templates")
        .then(metricaData => {
            metricaData = metricaData.filter((m) => {
                let s = {
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

export default MetricaManager;