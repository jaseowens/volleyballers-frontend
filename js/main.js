var token;
var playerID;
var content;
var player;

//const apiHost = 'https://volleyballers.herokuapp.com';
const apiHost = 'http://localhost:8080';

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

function getPlayersGameStats(playerID, gameID){
    return new Promise((resolve, reject) => {
    fetch(`${apiHost}/api/stats/get?playerID=${playerID}&gameID=${gameID}`, {
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
function getGameStatsBasedOnType(type, gameID){
    return new Promise((resolve, reject) => {
    fetch(`${apiHost}/api/stats/get?type=${type}&gameID=${gameID}`, {
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
function getPlayerNames(playerIDs){
    return new Promise((resolve, reject) => {
    fetch(`${apiHost}/api/player/getManyNames?playerIDs=${playerIDs}`, {
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
            container.style.marginTop = '0.5rem';
            container.style.marginBottom = '0px';

            //Each individual item or row
            var gameDate = document.createElement('div');
            gameDate.classList.add('level-item');
            let d = new Date(games[i].date);
            console.log('date:');
            console.log(games[i].date);
            let formatDate = `${d.getMonth() + 1}/${d.getUTCDate()}/${d.getFullYear()}`;
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
    let names = getPlayerNames(winningTeamPlayers);
    let displayNames = [];
    names.then(players => {
        for(var i = 0; i < players.length; i ++){
            displayNames[i] = players[i].displayName;
        }
    });
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
    scoreWrapper.classList.add('level-item');
    scoreWrapper.classList.add('is-mobile');
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

    var killValues = [0,0,0,0,0,0];
    var setValues = [0,0,0,0,0,0];
    var blockValues = [0,0,0,0,0,0];
    var tipValues = [0,0,0,0,0,0];
    var ufeValues = [0,0,0,0,0,0];
    var aceValues = [0,0,0,0,0,0];
    var digValues = [0,0,0,0,0,0];

    var killStats = getGameStatsBasedOnType('KILL', id);
    killStats.then(stats => {
        for (var j = 0; j < stats.length; j++){
            let cPlayerID = stats[j].playerID;
            let index = wtp.indexOf(cPlayerID.toString());
            killValues[index] = stats[j].total;
        }    
        let kill = createBarChart(
            'Dynamic Team Kills', 
            displayNames, 
            killValues, 
            'Kills Truly Dynamic');
        chartWrapper.appendChild(kill);
    });
    var setStats = getGameStatsBasedOnType('SET', id);
    setStats.then(stats => {
        for (var j = 0; j < stats.length; j++){
            let cPlayerID = stats[j].playerID;
            let index = wtp.indexOf(cPlayerID.toString());
            setValues[index] = stats[j].total;
        }    
        let set = createBarChart(
            'Dynamic Team Sets', 
            ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'], 
            setValues, 
            'Sets Dynamic');
        chartWrapper.appendChild(set);
    });
    var blockStats = getGameStatsBasedOnType('BLOCK', id);
    blockStats.then(stats => {
        for (var j = 0; j < stats.length; j++){
            let cPlayerID = stats[j].playerID;
            let index = wtp.indexOf(cPlayerID.toString());
            blockValues[index] = stats[j].total;
        }    
        let block = createBarChart(
            'Dynamic Team Blocks', 
            ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'], 
            blockValues, 
            'Blocks Dynamic');
    
        chartWrapper.appendChild(block);
    });
    var tipStats = getGameStatsBasedOnType('TIP', id);
    tipStats.then(stats => {
        for (var j = 0; j < stats.length; j++){
            let cPlayerID = stats[j].playerID;
            let index = wtp.indexOf(cPlayerID.toString());
            tipValues[index] = stats[j].total;
        }    
        let tip = createBarChart(
            'Dynamic Team Tips', 
            ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'], 
            tipValues, 
            'Tips Dynamic');
    
        chartWrapper.appendChild(tip);
    });
    var ufeStats = getGameStatsBasedOnType('UFE', id);
    ufeStats.then(stats => {
        for (var j = 0; j < stats.length; j++){
            let cPlayerID = stats[j].playerID;
            let index = wtp.indexOf(cPlayerID.toString());
            ufeValues[index] = stats[j].total;
        }    
        let ufe = createBarChart(
            'Dynamic Team Unforced Errors', 
            ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'], 
            ufeValues, 
            'Unforced Erros Dynamic');
    
        chartWrapper.appendChild(ufe);
    });
    var aceStats = getGameStatsBasedOnType('ACE', id);
    aceStats.then(stats => {
        for (var j = 0; j < stats.length; j++){
            let cPlayerID = stats[j].playerID;
            let index = wtp.indexOf(cPlayerID.toString());
            aceValues[index] = stats[j].total;
        }    
        let ace = createBarChart(
            'Dynamic Team Aces', 
            ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'], 
            aceValues, 
            'Aces Dynamic');
    
        chartWrapper.appendChild(ace);
    });
    var digStats = getGameStatsBasedOnType('DIG', id);
    digStats.then(stats => {
        for (var j = 0; j < stats.length; j++){
            let cPlayerID = stats[j].playerID;
            let index = wtp.indexOf(cPlayerID.toString());
            digValues[index] = stats[j].total;
        }    
        let dig = createBarChart(
            'Dynamic Team Digs', 
            ['Jase Owens','Natalie Dalton','Brandon Taylor','Katelyn Goodwin','Joy Walker','Jackie Cox'], 
            digValues, 
            'Digs Dynamic');
    
        chartWrapper.appendChild(dig);
    });

    content.appendChild(vidWrapper);
    content.appendChild(titlebar);
    content.appendChild(chartWrapper);

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

//Title: title of chart
//Labels: labels for data set
//Data: data set
//Label: text on hover 
function createBarChart(title, labels, data, label){
    // start of chart block
    let wrapper = document.createElement('div');
    wrapper.classList.add('column');
    wrapper.classList.add('is-half');

    let stats = document.createElement('canvas');
    stats.classList.add('column');
    wrapper.appendChild(stats);
    // end of chart block

    // Bar chart
    new Chart(stats, {
        type: 'bar',
        data: {
        labels: labels,
        datasets: [
            {
            label: label,
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#424242"],
            data: data
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: title
        }
        }
    });

    return wrapper;
}
    

