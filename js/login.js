//Initialize app
window.onload = init();

const apiHost = 'https://volleyballers.herokuapp.com';
//const apiHost = 'http://localhost:8080';

//Initalize function
function init(){
    deleteAllCookies();
    localStorage.clear();
    localStorage.setItem("test", "1");

    //Call login function when user clicks login button
    let loginButton = document.getElementById('btnLogin');
    loginButton.onclick = function(){
        event.preventDefault();
        login();
    }
    
    var token;
}

function login(){
        var username = document.getElementById('txtUsername').value;
        var password = document.getElementById('txtPassword').value;
        console.log(`logging in ${username}..`);

        //Url with initialization params
        fetch(`${apiHost}/api/authenticate`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": 'application/json; charset=utf-8'
            }
        })
        .then(response => response.json()) 
        .then(response => {
            if(response.success == true){
                localStorage.setItem("token",response.token);
                localStorage.setItem("username",response.username);
                localStorage.setItem("user_id", response.user_id);
                window.location = 'index.html'; 
        } else{
            console.log('error logging in');
        }
        })
        .catch(response =>{ 
            console.log(response);
        });
}

//Deletes all cookies
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}