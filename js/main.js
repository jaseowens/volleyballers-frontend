var token;
var playerID;
var content;

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
        //Get logged in user info
        let cPlayer = getPlayerByID(playerID);
        cPlayer.then(player => {
            console.log(player);
            var wrapper = document.getElementById('account-display-name');
            wrapper.innerText = `Hello, ${player.displayName}`;
        });
    } else {
        window.location.href = '/login.html';
    }
    
    content = document.getElementById('main-content-wrapper');
    loadGameCardView();
    
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
function getPlayerByID(playerID){
    return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/api/player/get?playerID=${playerID}`, {
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
function clearContent(){
    content.innerHTML = ``;
}
function loadGameCardView(){
    clearContent();
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

            let gameMeta = document.createElement('div');
            gameMeta.id = `${games[i].id}`
            gameMeta.style.display = 'none';

            let gameMetaDate = document.createElement('span');
            let gameMetaScore = document.createElement('span');
            let gameMetaWinningTeamID = document.createElement('span');
            let gameMetaWinningTeamName = document.createElement('span');
            let gameMetaWinningTeamPlayers = document.createElement('span');
            let gameMetaLosingTeamID = document.createElement('span');
            let gameMetaLosingTeamName = document.createElement('span');
            let gameMetaLosingTeamPlayers = document.createElement('span');
            let gameMetaVideoURL = document.createElement('span');

            //set meta data
            gameMetaDate.innerText = `${formatDate}`;
            gameMetaScore.innerText = `${games[i].score}`;
            gameMetaWinningTeamID.innerText = `${games[i].winningTeamID}`;
            gameMetaWinningTeamName.innerText = `${games[i].winningTeamName}`;
            gameMetaWinningTeamPlayers.innerText = `${games[i].winningTeamPlayers}`;
            gameMetaLosingTeamID.innerText = `${games[i].losingTeamID}`;
            gameMetaLosingTeamName.innerText = `${games[i].losingTeamName}`;
            gameMetaLosingTeamPlayers.innerText = `${games[i].losingTeamPlayers}`;
            gameMetaVideoURL.innerText = `${games[i].videoURL}`;

            //set meta data id, so easy to get
            gameMetaDate.id = `${games[i].id} - date`;
            gameMetaScore.id = `${games[i].id} - score`;
            gameMetaWinningTeamID.id = `${games[i].id} - winningTeamID`;
            gameMetaWinningTeamName.id = `${games[i].id} - winningTeamName`;
            gameMetaWinningTeamPlayers.id = `${games[i].id} - winningTeamPlayers`;
            gameMetaLosingTeamID.id = `${games[i].id} - losingTeamID`;
            gameMetaLosingTeamName.id = `${games[i].id} - losingTeamName`;
            gameMetaLosingTeamPlayers.id = `${games[i].id} - losingTeampPlayers`;
            gameMetaVideoURL.id = `${games[i].id} - videoURL`;

            //Append meta data
            gameMeta.appendChild(gameMetaDate);
            gameMeta.appendChild(gameMetaScore);
            gameMeta.appendChild(gameMetaWinningTeamID);
            gameMeta.appendChild(gameMetaWinningTeamName);
            gameMeta.appendChild(gameMetaWinningTeamPlayers);
            gameMeta.appendChild(gameMetaLosingTeamID);
            gameMeta.appendChild(gameMetaLosingTeamName);
            gameMeta.appendChild(gameMetaLosingTeamPlayers);
            gameMeta.appendChild(gameMetaVideoURL);

            //Append items/rows to wrapper
            container.appendChild(gameMeta);
            container.appendChild(details);
            container.appendChild(gameDate);

            container.onclick = getDataAndOpenGame;

            //Append wrapper to content div on page
            content.appendChild(container);
        }
    });
}
function displayMetaData(event){
    let me = event.currentTarget;
    let meID = me.firstChild.id;
    let date = document.getElementById(`${meID} - date`).innerText;
    let score = document.getElementById(`${meID} - score`).innerText;
    let wTeamID = document.getElementById(`${meID} - winningTeamID`).innerText;
    let wTeamName = document.getElementById(`${meID} - winningTeamName`).innerText;
    let wTeamPlayers = document.getElementById(`${meID} - winningTeamPlayers`).innerText;
    let lTeamID = document.getElementById(`${meID} - losingTeamID`).innerText;
    let lTeamName = document.getElementById(`${meID} - losingTeamName`).innerText;
    let lTeamPlayers = document.getElementById(`${meID} - losingTeampPlayers`).innerText;
    let videoURL = document.getElementById(`${meID} - videoURL`).innerText;

    console.log(
        `
        Clicked Game Info:
        ------------------
            Date - ${date}
            Score - ${score}
            Winning Team - ID: ${wTeamID} | Name: ${wTeamName} | Players: ${wTeamPlayers}
            Losing Team - ID: ${lTeamID} | Name: ${lTeamName} | Players: ${lTeamPlayers}
            VideoURL - ${videoURL}
        `
    );
}
function getDataAndOpenGame(event){
    let me = event.currentTarget;
    let meID = me.firstChild.id;
    let date = document.getElementById(`${meID} - date`).innerText;
    let score = document.getElementById(`${meID} - score`).innerText;
    let wTeamID = document.getElementById(`${meID} - winningTeamID`).innerText;
    let wTeamName = document.getElementById(`${meID} - winningTeamName`).innerText;
    let wTeamPlayers = document.getElementById(`${meID} - winningTeamPlayers`).innerText;
    let lTeamID = document.getElementById(`${meID} - losingTeamID`).innerText;
    let lTeamName = document.getElementById(`${meID} - losingTeamName`).innerText;
    let lTeamPlayers = document.getElementById(`${meID} - losingTeampPlayers`).innerText;
    let videoURL = document.getElementById(`${meID} - videoURL`).innerText;
    openGameDetailView(meID, date, score, wTeamID, wTeamName, wTeamPlayers, lTeamID, lTeamName, lTeamPlayers, videoURL);
}
function openGameDetailView(id, date, score, winningTeamID, winningTeamName, winningTeamPlayers, losingTeamID, losingTeamName, losingTeamPlayers, videoURL){
    clearContent();
    content.innerHTML=
    `
    <div>
        <p>Game ID: ${id}</p>
        <p>Game Date: ${date}</p>
        <p>Game Score: ${score}</p>
        <p>Winning Team ID: ${winningTeamID}</p>
        <p>Winning Team Name: ${winningTeamName}</p>
        <p>Winning Team Players: ${winningTeamPlayers}</p>
        <p>Losing Team ID: ${losingTeamID}</p>
        <p>Losing Team Name: ${losingTeamName}</p>
        <p>Losing Team Players: ${losingTeamPlayers}</p>
        <p>Video URL: ${videoURL}</p>
    </div>
    `
}