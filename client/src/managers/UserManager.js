import utils from "../utils";

let apiUrl = "/api";
if (window.location.href.search("localhost") !== -1) {
    let port = (new URLSearchParams(window.location.search)).get('port');
    port = port ? port : 8081;
    apiUrl = "http://localhost:" + port + apiUrl;
}
let apiUsers = apiUrl + "/users";

function UserManager() {

}

//@todo onInit - fetchUserProfile and update profile data
UserManager.register = function (googleEmail, picture, setUserProfile) {

    utils.fetch_(apiUsers + "/register/google", "post", {
        googleEmail: googleEmail,
        picture: picture
    }).then((r) => {
        let data = {
            id: r.id,
            picture: r.picture,
        };
        localStorage.setItem('userProfile', JSON.stringify(data));
        setUserProfile(data);
        UserManager.data = data;
    });
}
UserManager.setUserProfile = function (data) {  
    UserManager.data = data;
}

UserManager.getUid = function () {
    return UserManager.data ? UserManager.data.id : undefined;
}
UserManager.getPicture = function () {
    return UserManager.data ? UserManager.data.picture : undefined;
}

export default UserManager;