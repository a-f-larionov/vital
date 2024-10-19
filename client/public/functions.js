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
