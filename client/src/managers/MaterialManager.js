import UserManager from "./UserManager";
import utils from "../utils";
import React from "react";

let apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port ? port : 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}
let apiMaterials = apiUrl + "/materials";

function MaterialManager() {

}


MaterialManager.materials = [];
MaterialManager.add = function (title) {

    let material = {
        id: crypto.randomUUID(),
        uid: UserManager.getUid(),
        title: title
    };
    material.needFlush = true;

    MaterialManager.materials.push(material);

    this.flush();
}


MaterialManager.init = function (setMaterials) {
    if (MaterialManager.init.inProgress) return;
    MaterialManager.init.inProgress = true;
    let clientMaterials;
    try {
        clientMaterials = JSON.parse(localStorage.materials)
        if (!Array.isArray(clientMaterials)) {
            clientMaterials = [];
        }
    } catch {
        clientMaterials = [];
    }
    MaterialManager.setMaterials = function (materials) {
        setMaterials(materials);
        localStorage.materials = JSON.stringify(materials);
    };
    MaterialManager.materials = clientMaterials;
    setMaterials(clientMaterials);
    this.flush((flushedMaterials) => {
        this.load(flushedMaterials);
    });
}
MaterialManager.setState = function (materials, setMaterials) {
    MaterialManager.materials = materials;
}

MaterialManager.flush = function (setMaterials) {

    let materials = MaterialManager.materials;
    if (MaterialManager.flushInProgress) {
        MaterialManager.needFlush = true;
        return;
    }

    MaterialManager.flushInProgress = true;
    let prs = [];
    materials.forEach(material => {
        if (material.needFlush === true) {
            prs.push(
                utils.fetch_(apiMaterials + '/add', 'post', material)
                    .then((r) => {
                        if (r === null) return;
                        material.needFlush = false;
                    }));
        }
    });

    Promise.all(prs).then((a) => {
        if (setMaterials) {
            setMaterials([...materials]);
        } else {
            MaterialManager.setMaterials([...materials]);
        }

        setTimeout(() => {
            MaterialManager.flushInProgress = false;
            if (MaterialManager.needFlush) {
                MaterialManager.needFlush = false;
                MaterialManager.flush();
            }
        }, 1000);
    });
}

MaterialManager.load = function (clientMaterials) {

    utils.fetch_(apiMaterials + '/list', 'post', { uid: UserManager.getUid() })
        .then((serverMaterials) => {
            if (serverMaterials === null) {
                // ignore data from server
                MaterialManager.setMaterials(clientMaterials);
            } else {

                MaterialManager.setMaterials(serverMaterials);
            }
        });
};


export default MaterialManager;