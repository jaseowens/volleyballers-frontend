//Initialize app
window.onload = init();

//const apiHost = 'https://volleyballers.herokuapp.com';
const apiHost = 'http://localhost:8080';

//Initalize function
function init(){
    localStorage.clear();

    //Call login function when user clicks login button
    let signupButton = document.getElementById('btnSignup');
    signupButton.onclick = function(){
        event.preventDefault();
        signup();
    }
    
    var token;
}

function signup(){
    
    var username = document.getElementById('txtUsername').value;
    var password = document.getElementById('txtPassword').value;
    var password2 = document.getElementById('txtPassword2').value;
    var displayName = document.getElementById('txtDisplayName').value;
    if(password != password2){
        console.log("Passwords must match");
        alert();
    } else{
        console.log("Passwords match");
        //Url with initialization params
        fetch(`${apiHost}/signup`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                displayName: displayName
            }),
            headers: {
                "Content-Type": 'application/json; charset=utf-8'
            }
        })
        .then(response => response.json()) 
        .then(response => {
            console.log(response);
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
}