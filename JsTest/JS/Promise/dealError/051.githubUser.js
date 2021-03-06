class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

function loadJson(url) {
    return fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new HttpError(response);
            }
        })
}
function demoGithubUser() {
    // FIXME:prompt中间的引号必须是    双引号
    let name = prompt("Enter a name?", "iliakan");
    document.body.style.opacity = 0.3;
    return loadJson(`https://api.github.com/users/${name}`)
        .then(user => {
            console.log(`full name:${user.name}.`);
            return user;
        })
        .catch(err => {
            if (err instanceof HttpError && err.response.status == 404) {
                console.log("No such user,please reenter");
                return demoGithubUser();
            } else {
                throw err;
            }
        })
}

demoGithubUser();