var token;

window.onload = init();

function init(){
    //check if token exists in local storage, if so hide login and signup
    if(localStorage.getItem('token') == null){
        window.location.href = '/login.html';
    }

    let game = getGameByID(1);
    game.then(game => {
       console.log(game);
        console.log('promise success');
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