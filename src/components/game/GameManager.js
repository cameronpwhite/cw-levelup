export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


// ADD FUNCTIONALITY TO POST GAME TO DATABASE
export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
    headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(game),
    })
    .then(response => response.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
     })
        .then(response => response.json())
}
