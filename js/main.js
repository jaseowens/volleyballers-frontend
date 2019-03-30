var token;
var playerID;

window.onload = init();

function init(){
    //check if token exists in local storage, if so hide login and signup
    if(localStorage.getItem('token') != null){
        playerID = localStorage.getItem('user_id');
        token = localStorage.getItem('token');
        var loginButton = document.getElementById('login');
        var signupButton = document.getElementById('signup');
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
    } else {
        window.location.href = '/login.html';
    }
    
    var content = document.getElementById('main-content-wrapper');

    let game = getPlayersGames(playerID);
    game.then(games => {
        for(var i = 0; i < games.length; i ++){
        //Wrapper for all the items
            var container = document.createElement('div');
            container.classList.add('level');
            container.classList.add('match-row');
            container.classList.add('bg-white');
            container.classList.add('mouse-hover');
            container.style.marginLeft = '0.75rem';
            container.style.marginRight = '0.75rem';
            container.style.marginTop = '0.5rem';
            container.style.marginBottom = '0px';

            //Each individual item or row
            var gameDate = document.createElement('div');
            gameDate.classList.add('level-item');
            let d = new Date(Date.parse(games[i].date));
            let formatDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
            gameDate.innerHTML = `<p>${formatDate}</p>`;

            var details = document.createElement('div');
            details.classList.add('level-item');
            
            var losingTeam = games[i].losingTeamName;
            var winningTeam = games[i].winningTeamName;

            details.innerHTML = `<p><strong>${winningTeam}</strong> vs. <strong>${losingTeam}</strong></p>`;

            //Append items/rows to wrapper
            container.appendChild(details);
            container.appendChild(gameDate);
            //Append wrapper to content div on page
            content.appendChild(container);
        }
    });
}

function getPlayersGames(playerID){
    return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/api/game/getAllGames?playerID=${playerID}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        return response.json()
    }) 
    .then(response => {
        resolve(response);
    })
    .catch(err =>{ 
        reject(err);
    });
    });
}

function getGameByID(gameID){
    return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/api/game/get?gameID=${gameID}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        return response.json()
    }) 
    .then(response => {
        resolve(response);
    })
    .catch(err =>{ 
        reject(err);
    });
    });
}
function getTeamByID(teamID){
    return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/api/team/get?teamID=${teamID}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        return response.json()
    }) 
    .then(response => {
        resolve(response);
    })
    .catch(err =>{ 
        reject(err);
    });
});
}