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
                pic.src = `${apiHost}/uploads/${player.username}.jpg`;
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

    let scoreWrapper = document.createElement('div');
    scoreWrapper.style.textAlign = 'center';
    //scoreWrapper.classList.add('level-item');
    //scoreWrapper.classList.add('score');
    scoreWrapper.style.fontSize = '1.25rem';
    let scores = score.split(',');
    for(var i = 0; i < scores.length; i++){
        var array = scores[i].split('-');
        let scoreOne = array[0].trim();
        let scoreTwo = array[1].trim();
        scoreOne = parseInt(scoreOne);
        scoreTwo = parseInt(scoreTwo);

        let scoreElem = document.createElement('div');
        scoreElem.classList.add('score');
        scoreElem.style.fontSize = '1.25rem';
        if(scoreOne > scoreTwo){
            scoreElem.innerHTML = `<span style='color:green'>${scoreOne}</span> - <span style='color:red'>${scoreTwo}</span>`;
        } else{
            scoreElem.innerHTML = `<span style='color:red'>${scoreOne}</span> - <span style='color:green'>${scoreTwo}</span>`;
        }
        scoreWrapper.appendChild(scoreElem);
    }
    titlebar.appendChild(scoreWrapper);

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
                console.log('player:');
                console.log(player);
                pic.src = `${apiHost}/${player.username}`;
                console.log('Image src:');
                console.log(`${apiHost}/${player.username}`);
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
    chartWrapper.classList.add('columns');
    chartWrapper.classList.add('is-multiline');
    chartWrapper.classList.add('game-stats-wrapper');

    // start of chart block
    let killWrapper = document.createElement('div');
    killWrapper.classList.add('column');
    killWrapper.classList.add('is-half');

    let killStats = document.createElement('canvas');
    killStats.id = 'kill-stats';
    killStats.classList.add('column');
    killWrapper.appendChild(killStats);
    // end of chart block

    // start of chart block
    let setWrapper = document.createElement('div');
    setWrapper.classList.add('column');
    setWrapper.classList.add('is-half');

    let setStats = document.createElement('canvas');
    setStats.id = 'set-stats';
    setStats.classList.add('column');
    setWrapper.appendChild(setStats);
    // end of chart block

    // start of chart block
    let blockWrapper = document.createElement('div');
    blockWrapper.classList.add('column');
    blockWrapper.classList.add('is-half');

    let blockStats = document.createElement('canvas');
    blockStats.id = 'block-stats';
    blockStats.classList.add('column');
    blockWrapper.appendChild(blockStats);
    // end of chart block

    // start of chart block
    let tipWrapper = document.createElement('div');
    tipWrapper.classList.add('column');
    tipWrapper.classList.add('is-half');

    let tipStats = document.createElement('canvas');
    tipStats.id = 'tip-stats';
    tipStats.classList.add('column');
    tipWrapper.appendChild(tipStats);
    // end of chart block

    // start of chart block
    let ufeWrapper = document.createElement('div');
    ufeWrapper.classList.add('column');
    ufeWrapper.classList.add('is-half');

    let ufeStats = document.createElement('canvas');
    ufeStats.id = 'ufe-stats';
    ufeStats.classList.add('column');
    ufeWrapper.appendChild(ufeStats);
    // end of chart block

    // start of chart block
    let aceWrapper = document.createElement('div');
    aceWrapper.classList.add('column');
    aceWrapper.classList.add('is-half');

    let aceStats = document.createElement('canvas');
    aceStats.id = 'ace-stats';
    aceStats.classList.add('column');
    aceWrapper.appendChild(aceStats);
    // end of chart block

    // start of chart block
    let digWrapper = document.createElement('div');
    digWrapper.classList.add('column');
    digWrapper.classList.add('is-half');

    let digStats = document.createElement('canvas');
    digStats.id = 'dig-stats';
    digStats.classList.add('column');
    digWrapper.appendChild(digStats);
    // end of chart block

    chartWrapper.appendChild(killWrapper);
    chartWrapper.appendChild(setWrapper);
    chartWrapper.appendChild(blockWrapper);
    chartWrapper.appendChild(tipWrapper);
    chartWrapper.appendChild(ufeWrapper);
    chartWrapper.appendChild(aceWrapper);
    chartWrapper.appendChild(digWrapper);

    content.appendChild(vidWrapper);
    content.appendChild(titlebar);
    content.appendChild(chartWrapper);

    // Bar chart
    new Chart(document.getElementById("kill-stats"), {
        type: 'bar',
        data: {
        labels: ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'],
        datasets: [
            {
            label: "Kills",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
            data: [1,0,0,0,1,7]
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Team Kills'
        }
        }
    });
    // Bar chart
    new Chart(document.getElementById("set-stats"), {
        type: 'bar',
        data: {
        labels: ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'],
        datasets: [
            {
            label: "Sets",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
            data: [2,0,1,6,0,0]
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Team Sets'
        }
        }
    });
    // Bar chart
    new Chart(document.getElementById("block-stats"), {
        type: 'bar',
        data: {
        labels: ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'],
        datasets: [
            {
            label: "Blocks",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
            data: [0,0,1,0,0,0]
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Team Blocks'
        }
        }
    });
    // Bar chart
    new Chart(document.getElementById("tip-stats"), {
        type: 'bar',
        data: {
        labels: ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'],
        datasets: [
            {
            label: "Tips",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
            data: [0,0,0,0,1,2]
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Team Tips'
        }
        }
    });
    // Bar chart
    new Chart(document.getElementById("ufe-stats"), {
        type: 'bar',
        data: {
        labels: ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'],
        datasets: [
            {
            label: "Unforced Errors",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
            data: [4,5,1,2,1,15]
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Team Unforced Errors'
        }
        }
    });
    // Bar chart
    new Chart(document.getElementById("ace-stats"), {
        type: 'bar',
        data: {
        labels: ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'],
        datasets: [
            {
            label: "Aces",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
            data: [4,3,1,1,0,2]
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Team Aces'
        }
        }
    });
    // Bar chart
    new Chart(document.getElementById("dig-stats"), {
        type: 'bar',
        data: {
        labels: ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'],
        datasets: [
            {
            label: "Digs",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
            data: [1,4,0,2,0,0]
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Team Digs'
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
