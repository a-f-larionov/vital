import utils from "../utils";
let apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port || 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}

let apiMetric = apiUrl + "/metric";

function MetricsManager() {

}

MetricsManager.metricTemplates = [];

MetricsManager.inProcess = false;
MetricsManager.load = function (metric, setMetric) {

    if (MetricsManager.metricTemplates.length > 0) {
        return;
    }
    MetricsManager.metricTemplates = metric;

    if (MetricsManager.inProcess) return;
    MetricsManager.inProcess = true;
    utils.fetch_(apiMetric + "/list-templates")
        .then(metricData => {
            metricData = metricData.filter((m) => {
                let s = {
                    'stopwatch': true,
                    'incrementer': true,
                    //'Страницы': true,
                    //  'Такты': true,
                    'checker': true,

                };
                return s[m.inputCode];
            });
            setMetric(metricData);
        });

}

export default MetricsManager;