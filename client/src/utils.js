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


function s2hms(s, showSeconds, onlyHours, returnData) {

    if (onlyHours) return Math.floor(s / 3600);

    let time = [
        Math.floor(s / 3600), // hours
        Math.floor(s / 60) % 60, // minutes
        Math.floor(s % 60) // seconds
    ];

    if (time[2] < 10) {
        time[2] = "0" + time[2];
    }
    if (!showSeconds) time.pop();

    if (time[0] === 0 && onlyHours === undefined) {

        time.shift();
    } else {

        if (time[1] < 10) {

            time[1] = "0" + time[1];
        }
    }

    if (returnData) {
        return time;
    }
    return time.join(":");
}


export default {
    fetch_: fetch_,
    s2hms: s2hms
}