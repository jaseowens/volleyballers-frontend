var token;

window.onload = init();

function init(){
    //check if token exists in local storage, if so hide login and signup
    if(localStorage.getItem('token') != null){
        var loginButton = document.getElementById('login');
        var signupButton = document.getElementById('signup');
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
    }

}