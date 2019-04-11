var token;
var playerID;
var playerUsername;
var content;
var player;

//const apiHost = 'https://volleyballers.herokuapp.com';
const apiHost = 'http://localhost:8080';

window.onload = init();

function init(){

    //check if token exists in local storage, if so hide login and signup
    if(localStorage.getItem('token') != null){
        playerID = localStorage.getItem('user_id');
        playerUsername = localStorage.getItem('username');
        token = localStorage.getItem('token');
        var loginButton = document.getElementById('login');
        var signupButton = document.getElementById('signup');
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        //Get logged in user info
        let cPlayer = getPlayerByUsername(playerUsername);
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

function getPlayersGames(username){
    return new Promise((resolve, reject) => {
    fetch(`${apiHost}/api/game/getAllGames?username=${username}`, {
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
function openAddGame(){
    clearContent();
    let createFormWrapper = document.createElement('div');
    createFormWrapper.classList.add('bg-white');
    createFormWrapper.classList.add('mt-2');
    createFormWrapper.classList.add('columns');
    createFormWrapper.classList.add('is-multiline');

    let dateField = createSimpleFormInColumn("Date", "Date", "update-date", "eg. '03/03/2019'");
    let scoreField = createSimpleFormInColumn("Score", "Score", "update-score", "eg. '25-21,25-20,15-10'");
    let winningTeamID = createSimpleFormInColumn("Winning Team ID", "Winning Team ID", "update-winning-team-id", "eg. '5'");
    let winningTeamName = createSimpleFormInColumn("Winning Team Name", "Winning Team Name", "update-winning-team-name", "eg. 'Volleyballers'");
    let winningTeamPlayers = createSimpleFormInColumn("Winning Team Players", "Winning Team Players", "update-winning-team-players", "eg. '5,7,8,12,14,51'");
    let losingTeamID = createSimpleFormInColumn("Losing Team ID", "Losing Team ID", "update-losing-team-id", "eg. '5'");
    let losingTeamName = createSimpleFormInColumn("Losing Team Name", "Losing Team Name", "update-losing-team-name", "eg. 'Volleyballers'");
    let losingTeamPlayers = createSimpleFormInColumn("Losing Team Players", "Losing Team Players", "update-losing-team-players", "eg. '5,7,8,12,14,51'");
    let videoURL = createSimpleFormInColumn("Video URL","Video URL", "update-video-url","eg. https://www.youtube.com/watch?v=adfooOOa");

    //Append fields
    createFormWrapper.appendChild(dateField);
    createFormWrapper.appendChild(scoreField);
    createFormWrapper.appendChild(winningTeamID);
    createFormWrapper.appendChild(winningTeamName);
    createFormWrapper.appendChild(winningTeamPlayers);
    createFormWrapper.appendChild(losingTeamID);
    createFormWrapper.appendChild(losingTeamName);
    createFormWrapper.appendChild(losingTeamPlayers);
    createFormWrapper.appendChild(videoURL);
    
    let saveButton = document.createElement('a');
    saveButton.classList.add('button');
    saveButton.classList.add('is-medium');
    saveButton.innerHTML = `<span class="icon is-medium"> <i class="fas fa-save"></i> </span>`;
    saveButton.onclick = function() {
        console.log('updating');
        saveButton.classList.add('is-loading');
        let uDate = document.getElementById('update-date').value;
        let uScore = document.getElementById('update-score').value;
        let uWinningTeamID = document.getElementById('update-winning-team-id').value;
        let uWinningTeamName = document.getElementById('update-winning-team-name').value;
        let uWinningTeamPlayers = document.getElementById('update-winning-team-players').value;
        let uLosingTeamID = document.getElementById('update-losing-team-id').value;
        let uLosingTeamName = document.getElementById('update-losing-team-name').value;
        let uLosingTeamPlayers = document.getElementById('update-losing-team-players').value;
        let uVideoURL = document.getElementById('update-video-url').value;

        //Integer values on backend cant be passed in as "", need to change to null if empty string.
        if(uScore == ""){
            uScore = null;
        }
        if(uWinningTeamID == ""){
            uWinningTeamID = null;
        }
        if(uLosingTeamID == ""){
            uLosingTeamID = null;
        }

        let addTheGame = addGame(uDate, uScore, uWinningTeamID, uWinningTeamName, uWinningTeamPlayers, uLosingTeamID, uLosingTeamName, uLosingTeamPlayers, uVideoURL);
        addTheGame.then(response =>{
            getPlayersGames(playerUsername);
        });
    }

    let cancelButton = document.createElement('a');
    cancelButton.classList.add('button');
    cancelButton.classList.add('is-medium');
    cancelButton.innerHTML = `<span class="icon is-medium"> <i class="fas fa-window-close"></i> </span>`;
    cancelButton.onclick = function() {
        getPlayersGames(playerUsername);
    }

    //Append elements to form wrapper
    content.appendChild(createFormWrapper);
    content.appendChild(saveButton);
    content.appendChild(cancelButton);
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
function getPlayerNames(usernames){
    return new Promise((resolve, reject) => {
    fetch(`${apiHost}/api/player/getManyNames?usernames=${usernames}`, {
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
function createSimpleForm(labelText, inputPlaceholder, helpText){
    //Form
    //---Field
    let field = document.createElement('div');
    field.classList.add('field');
    //---Label
    let label = document.createElement('label');
    label.classList.add('label');
    label.innerText = labelText;
    //---Control
    let control = document.createElement('div');
    control.classList.add('control');
    //--- ---Input
    let input = document.createElement('input');
    input.classList.add('input');
    input.type = "text";
    input.placeholder = inputPlaceholder;
    control.appendChild(input);
    //---Help Text
    let help = document.createElement('p');
    help.classList.add('help');
    help.innerText = helpText;
    //Append to field
    field.appendChild(label);
    field.appendChild(control);
    field.appendChild(help);
    return field;
}
function createSimpleFormInColumn(labelText, inputPlaceholder, inputID, helpText){
    let column = document.createElement('div');
    column.classList.add('column');
    column.classList.add('is-half');
    //Form
    //---Field
    let field = document.createElement('div');
    field.classList.add('field');
    //---Label
    let label = document.createElement('label');
    label.classList.add('label');
    label.innerText = labelText;
    //---Control
    let control = document.createElement('div');
    control.classList.add('control');
    //--- ---Input
    let input = document.createElement('input');
    input.classList.add('input');
    input.type = "text";
    input.id = inputID;
    input.placeholder = inputPlaceholder;
    control.appendChild(input);
    //---Help Text
    let help = document.createElement('p');
    help.classList.add('help');
    help.innerText = helpText;
    //Append to field
    field.appendChild(label);
    field.appendChild(control);
    field.appendChild(help);
    column.appendChild(field);
    return column;
}
function createSimpleFormInColumnSetInputValue(labelText, inputValue, inputID, inputPlaceholder, helpText){
    let column = document.createElement('div');
    column.classList.add('column');
    column.classList.add('is-half');
    //Form
    //---Field
    let field = document.createElement('div');
    field.classList.add('field');
    //---Label
    let label = document.createElement('label');
    label.classList.add('label');
    label.innerText = labelText;
    //---Control
    let control = document.createElement('div');
    control.classList.add('control');
    //--- ---Input
    let input = document.createElement('input');
    input.classList.add('input');
    input.type = "text";
    input.value = inputValue
    input.id = inputID;
    input.placeholder = inputPlaceholder;
    control.appendChild(input);
    //---Help Text
    let help = document.createElement('p');
    help.classList.add('help');
    help.innerText = helpText;
    //Append to field
    field.appendChild(label);
    field.appendChild(control);
    field.appendChild(help);
    column.appendChild(field);
    return column;
}
function getPlayerByID(playerID){
    return new Promise((resolve, reject) => {
    fetch(`${apiHost}/api/player/getById?playerID=${playerID}`, {
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
function getPlayerByUsername(username){
    return new Promise((resolve, reject) => {
    fetch(`${apiHost}/api/player/getByUsername?username=${username}`, {
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

    let gameCreateBar = document.createElement('div');
    gameCreateBar.classList.add('level');
    gameCreateBar.classList.add('p-2');
    gameCreateBar.classList.add('bg-white');
    gameCreateBar.style.marginBottom = '0.75rem';

    let gameCreateBarLeft = document.createElement('div');
    gameCreateBarLeft.classList.add('level-left');
    let gcbLeftText = document.createElement('div');
    gcbLeftText.classList.add('level-item');
    gcbLeftText.classList.add('has-text-centered');
    gcbLeftText.innerText = "Add Game"
    gameCreateBarLeft.appendChild(gcbLeftText);

    let gameCreateBarRight = document.createElement('div');
    gameCreateBarRight.classList.add('level-right');
    let gcbRightButton = document.createElement('div');
    gcbRightButton.classList.add('level-item');
    gcbRightButton.classList.add('button');
    //gcbRightButton.classList.add('is-outlined');
    //gcbRightButton.classList.add('is-primary');
    gcbRightButton.innerHTML = `<span class="icon"><i class="fas fa-plus-square fa-2x"></i></span>`;
    gcbRightButton.onclick = function() {
        openAddGame();
    }
    //here add icon
    gameCreateBarRight.appendChild(gcbRightButton);

    gameCreateBar.appendChild(gameCreateBarLeft);
    gameCreateBar.appendChild(gameCreateBarRight);
    content.appendChild(gameCreateBar);

    let game = getPlayersGames(playerUsername);
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
    
    //If user is an admin, want to give more options, edit view is here
    let editBar = document.createElement('div');
    editBar.classList.add('level');
    editBar.classList.add('bg-white');
    editBar.classList.add('p-2');

    editButton = document.createElement('a');
    editButton.classList.add('button');
    editButton.classList.add('level-item');
    editButton.classList.add('is-medium');
    editButton.style.border = '0';
    editButton.innerHTML = `<span class="icon h-red"> <i class="fas fa-edit fa-lg"></i> </span>`;
    editButton.onclick = function() {
        openGameEditView(id, date, score, winningTeamID, winningTeamName, winningTeamPlayers, losingTeamID, losingTeamName, losingTeamPlayers, videoURL);
    }

    statsButton = document.createElement('a');
    statsButton.classList.add('button');
    statsButton.classList.add('level-item');
    statsButton.classList.add('is-medium');
    statsButton.style.border = '0';
    statsButton.innerHTML = `<span class="icon h-red"> <i class="fas fa-chart-bar fa-lg"></i> </span>`;
    statsButton.onclick = function() {
        openGameEditStatsView(id, date, score, winningTeamID, winningTeamName, winningTeamPlayers, losingTeamID, losingTeamName, losingTeamPlayers, videoURL);
    }

    editBar.appendChild(editButton);
    editBar.appendChild(statsButton);

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
        console.log(`This many players on winning team: ${wtp.length}`);
        var p = getPlayerByUsername(wtp[i]);
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
        console.log(`This many players on losing team: ${ltp.length}`);
        var p = getPlayerByUsername(ltp[i]);
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
    content.appendChild(editBar);
    content.appendChild(titlebar);
    content.appendChild(chartWrapper);

}
function openGameEditView(id, date, score, winningTeamID, winningTeamName, winningTeamPlayers, losingTeamID, losingTeamName, losingTeamPlayers, videoURL){
    clearContent();
    let updateFormWrapper = document.createElement('div');
    updateFormWrapper.classList.add('bg-white');
    updateFormWrapper.classList.add('mt-2');
    updateFormWrapper.classList.add('columns');
    updateFormWrapper.classList.add('is-multiline');

    let dateField = createSimpleFormInColumnSetInputValue("Date", date, "update-date", "Date", "eg. '03/03/2019'");
    let scoreField = createSimpleFormInColumnSetInputValue("Score", score, "update-score", "Score", "eg. '25-21,25-20,15-10'");
    let winningTeamIDField = createSimpleFormInColumnSetInputValue("Winning Team ID", winningTeamID, "update-winning-team-id", "Winning Team ID", "eg. '5'");
    let winningTeamNameField = createSimpleFormInColumnSetInputValue("Winning Team Name", winningTeamName, "update-winning-team-name", "Winning Team Name", "eg. 'Volleyballers'");
    let winningTeamPlayersField = createSimpleFormInColumnSetInputValue("Winning Team Players", winningTeamPlayers, "update-winning-team-players", "Winning Team Players", "eg. '5,7,8,12,14,51'");
    let losingTeamIDField = createSimpleFormInColumnSetInputValue("Losing Team ID", losingTeamID, "update-losing-team-id", "Losing Team ID", "eg. '5'");
    let losingTeamNameField = createSimpleFormInColumnSetInputValue("Losing Team Name", losingTeamName, "update-losing-team-name", "Losing Team Name", "eg. 'Volleyballers'");
    let losingTeamPlayersField = createSimpleFormInColumnSetInputValue("Losing Team Players", losingTeamPlayers, "update-losing-team-players", "Losing Team Players", "eg. '5,7,8,12,14,51'");
    let videoURLField = createSimpleFormInColumnSetInputValue("Video URL", videoURL, "update-video-url", "Video URL","eg. https://www.youtube.com/watch?v=adfooOOa");

    let saveButton = document.createElement('a');
    saveButton.classList.add('button');
    saveButton.classList.add('is-medium');
    saveButton.innerHTML = `<span class="icon is-medium"> <i class="fas fa-save"></i> </span>`;
    saveButton.onclick = function() {
        console.log('updating');
        let uDate = document.getElementById('update-date').value;
        let uScore = document.getElementById('update-score').value;
        let uWinningTeamID = document.getElementById('update-winning-team-id').value;
        let uWinningTeamName = document.getElementById('update-winning-team-name').value;
        let uWinningTeamPlayers = document.getElementById('update-winning-team-players').value;
        let uLosingTeamID = document.getElementById('update-losing-team-id').value;
        let uLosingTeamName = document.getElementById('update-losing-team-name').value;
        let uLosingTeamPlayers = document.getElementById('update-losing-team-players').value;
        let uVideoURL = document.getElementById('update-video-url').value;

        //Integer values on backend cant be passed in as "", need to change to null if empty string.
        if(uScore == ""){
            uScore = null;
        }
        if(uWinningTeamID == ""){
            uWinningTeamID = null;
        }
        if(uLosingTeamID == ""){
            uLosingTeamID = null;
        }

        let updateTheGame = updateGame(id, uDate, uScore, uWinningTeamID, uWinningTeamName, uWinningTeamPlayers, uLosingTeamID, uLosingTeamName, uLosingTeamPlayers, uVideoURL);
        updateTheGame.then(response =>{
            saveButton.classList.add('is-loading');
            console.log("Updated");
            openGameDetailView(id, uDate, uScore, uWinningTeamID, uWinningTeamName, uWinningTeamPlayers, uLosingTeamID, uLosingTeamName, uLosingTeamPlayers, uVideoURL);
        });
    }

    let cancelButton = document.createElement('a');
    cancelButton.classList.add('button');
    cancelButton.classList.add('is-medium');
    cancelButton.innerHTML = `<span class="icon is-medium"> <i class="fas fa-window-close"></i> </span>`;
    cancelButton.onclick = function() {
        openGameDetailView(id, date, score, winningTeamID, winningTeamName, winningTeamPlayers, losingTeamID, losingTeamName, losingTeamPlayers, videoURL);
    }

    //Append fields
    updateFormWrapper.appendChild(dateField);
    updateFormWrapper.appendChild(scoreField);
    updateFormWrapper.appendChild(winningTeamIDField);
    updateFormWrapper.appendChild(winningTeamNameField);
    updateFormWrapper.appendChild(winningTeamPlayersField);
    updateFormWrapper.appendChild(losingTeamIDField);
    updateFormWrapper.appendChild(losingTeamNameField);
    updateFormWrapper.appendChild(losingTeamPlayersField);
    updateFormWrapper.appendChild(videoURLField);
    
    //Append elements to form wrapper
    content.appendChild(updateFormWrapper);
    content.appendChild(saveButton);
    content.appendChild(cancelButton);
}
function openGameEditStatsView(id, date, score, winningTeamID, winningTeamName, winningTeamPlayers, losingTeamID, losingTeamName, losingTeamPlayers, videoURL){
    clearContent();

    let statEditWrapper = document.createElement('div');
    statEditWrapper.classList.add('p-2');
    statEditWrapper.classList.add('bg-white');

    let killStats = document.createElement('div');
    killStats.classList.add('level');
    killStats.id = 'kill-stats';
    let statTitle = document.createElement('h2');
    statTitle.innerText = 'Kills';
    statTitle.classList.add('title');

    // let killStats = getGameStatsBasedOnType("KILL", id);
    // killStats.then(stats => {
    //     for(var i = 0; i < stats.length; i++){
    //         //create row of stats 
            
    //     }
    // });



    // let blockStats = getGameStatsBasedOnType("BLOCK", 1);
    // let killStats = getGameStatsBasedOnType("KILL", 1);
    // let killStats = getGameStatsBasedOnType("KILL", 1);
    // let killStats = getGameStatsBasedOnType("KILL", 1);
    // let killStats = getGameStatsBasedOnType("KILL", 1);
    
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

function addGame(date, score, winningTeamID, winningTeamName, winningTeamPlayers, losingTeamID, losingTeamName, losingTeamPlayes, videoURL){
    return new Promise(function(resolve, reject){
    //Url with initialization params
    fetch(`${apiHost}/api/game/add`, {
        method: 'POST',
        body: JSON.stringify({
            date: date,
            score: score,
            winningTeamID: winningTeamID,
            winningTeamName: winningTeamName,
            winningTeamPlayers: winningTeamPlayers,
            losingTeamID: losingTeamID,
            losingTeamName: losingTeamName,
            losingTeamPlayers: losingTeamPlayes,
            videoURL: videoURL
        }),
        headers: {
            "Content-Type": 'application/json; charset=utf-8'
        }
    })
    .then(response => response.json()) 
    .then(response => {
        console.log(response);
    })
    .catch(response =>{ 
        console.log(response);
    }); 
    });
}
function updateGame(id, date, score, winningTeamID, winningTeamName, winningTeamPlayers, losingTeamID, losingTeamName, losingTeamPlayes, videoURL){
    //Url with initialization params
    console.log(`updating with wtp: ${winningTeamPlayers}`);
    return new Promise(function(resolve, reject){
    fetch(`${apiHost}/api/game/update`, {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            date: date,
            score: score,
            winningTeamID: winningTeamID,
            winningTeamName: winningTeamName,
            winningTeamPlayers: winningTeamPlayers,
            losingTeamID: losingTeamID,
            losingTeamName: losingTeamName,
            losingTeamPlayers: losingTeamPlayes,
            videoURL: videoURL
        }),
        headers: {
            "Content-Type": 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        console.log('response 1');
        response.json()
    })
    .then(response => {
        console.log(response);
        resolve(response);
    })
    .catch(response =>{ 
        console.log(response);
        reject(response);
    });
    });
}
function addStats(gameID, playerID, type, total){
//Url with initialization params
return new Promise(function(resolve, reject){
    fetch(`${apiHost}/api/game/update`, {
        method: 'POST',
        body: JSON.stringify({
            gameID: gameID,
            playerID: playerID,
            type: type,
            total: total
        }),
        headers: {
            "Content-Type": 'application/json; charset=utf-8'
        }
    })
    .then(response => response.json()) 
    .then(response => {
        console.log(response);
        resolve(response);
    })
    .catch(response =>{ 
        console.log(response);
        reject(response);
    });
    });
}

