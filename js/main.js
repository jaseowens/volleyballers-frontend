var token;
var playerID;
var content;
var player;

const apiHost = 'https://volleyballers.herokuapp.com';

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
    fetch(`${apiHost}/api/game/getAllGames?playerID=${playerID}`, {
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
    fetch(`${apiHost}/api/game/get?gameID=${gameID}`, {
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
    fetch(`${apiHost}/api/team/get?teamID=${teamID}`, {
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
    fetch(`${apiHost}/api/player/get?playerID=${playerID}`, {
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
    let vidWrapper = document.createElement('div');
    vidWrapper.id = 'yt-player-wrapper';
    let vidSrc = getYouTubeIDFromURL(videoURL);
    vidWrapper.innerHTML = `<iframe id='yt-player' width='100%' height='100%' src='https://www.youtube.com/embed/${vidSrc}?enablejsapi=1&modestbranding=1&autohide=1&showinfo=0&controls=0' frameborder='0'></ifram>`;
    
    //Video created, now create card with team titles and score
    let titlebar = document.createElement('div');
    titlebar.classList.add('level');
    titlebar.classList.add('game-title-bar');

    //Left team (winning team)
    let leftTeam = document.createElement('div');
    leftTeam.classList.add('level-item');
    leftTeam.classList.add('team-name');
    let leftDetailsWrapper = document.createElement('div');
    let leftTeamName = document.createElement('div');
    leftTeamName.id = 'team-name';
    leftTeamName.innerText = winningTeamName;

    leftDetailsWrapper.appendChild(leftTeamName);

    var wtp = winningTeamPlayers.split(',');
    for(var i = 0; i < wtp.length; i++){
        var p = getPlayerByID(parseInt(wtp[i]));
        p.then(player => {
            console.log(player);
            if(player.success){
                var pic = document.createElement('img');
                pic.id = `${wtp[i]}-small-team-pic`
                //var pp = document.getElementById(`${player.id}-small-team-pic`);
                pic.src = `${apiHost}${player.profileImage}`;
                pic.classList.add('small-team-portrait');
                pic.style.height = '30px';
                pic.style.width = '30px';
                if(player.displayName != null){
                    pic.title = player.displayName;
                } else{
                    pic.title = player.username;
                }
                leftDetailsWrapper.appendChild(pic);
            }
        });
    }
    leftTeam.appendChild(leftDetailsWrapper);
    titlebar.appendChild(leftTeam);

    var array = score.split('-');
    let scoreOne = array[0].trim();
    let scoreTwo = array[1].trim();
    scoreOne = parseInt(scoreOne);
    scoreTwo = parseInt(scoreTwo);
    let winningScore;
    let losingScore;
    if(scoreOne > scoreTwo){
        winningScore = scoreOne;
        losingScore = scoreTwo;
    } else{
        winningScore = scoreTwo;
        losingScore = scoreOne;
    }
    let scoreElem = document.createElement('div');
    scoreElem.classList.add('level-item');
    scoreElem.classList.add('score');
    scoreElem.style.fontSize = '1.25rem';
    scoreElem.innerHTML = `<p style='color:green'>${winningScore}</p><p style='margin-left:10px;margin-right:10px;'> - <p><p style='color:red'>${losingScore}</p>`;
    titlebar.appendChild(scoreElem);

    ///Right team (losing team)
    let rightTeam = document.createElement('div');
    rightTeam.classList.add('level-item');
    rightTeam.classList.add('team-name');
    let rightDetailsWrapper = document.createElement('div');
    let rightTeamName = document.createElement('div');
    rightTeamName.id = 'team-name';
    rightTeamName.innerText = losingTeamName;

    rightDetailsWrapper.appendChild(rightTeamName);

    var ltp = losingTeamPlayers.split(',');
    for(var i = 0; i < ltp.length; i++){
        var p = getPlayerByID(parseInt(ltp[i]));
        p.then(player => {
            console.log(player);
            if(player.success){
                var pic = document.createElement('img');
                pic.id = `${wtp[i]}-small-team-pic`;
                pic.src = `${apiHost}${player.profileImage}`;
                pic.classList.add('small-team-portrait');
                pic.style.height = '30px';
                pic.style.width = '30px';
                pic.title = player.displayName;
                rightDetailsWrapper.appendChild(pic);
            }
        });
    }
    rightTeam.appendChild(rightDetailsWrapper);
    titlebar.appendChild(rightTeam);

    //Here is where the stats are created
    let chartWrapper = document.createElement('div');
    chartWrapper.classList.add('level');
    chartWrapper.classList.add('game-stats-wrapper');

    let faultsStats = document.createElement('canvas');
    faultsStats.id = 'faults-stats';
    faultsStats.classList.add('mh-100');
    faultsStats.style.height = '100%';
    faultsStats.style.width = '100%';
    chartWrapper.appendChild(faultsStats);

    content.appendChild(vidWrapper);
    content.appendChild(titlebar);
    content.appendChild(chartWrapper);

        // Bar chart
        new Chart(document.getElementById("faults-stats"), {
            type: 'bar',
            data: {
            labels: ['Jase Owens','Zoe Walker','Natalie Dalton','Tyler Vaughn','Joy Walker','Thomas Cox'],
            datasets: [
                {
                label: "Faults",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
                data: [1,3,2,3,0,5]
                }
            ]
            },
            options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Team Faults'
            }
            }
        });
}
function onPlayerReady(event) {
    event.target.playVideo();
}
function onPlayerStateChange(event) {
    //event.target.playVideo();
}
function stopVideo() {
    player.stopVideo();
}
window.onYouTubeIframeAPIReady = function() {
    console.log('Made it');
    player = new YT.Player('yt-player', {
        events: {
        'onReady': onPlayerReady
        }
    });
    console.log('Made it');
}
function getYouTubeIDFromURL(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
