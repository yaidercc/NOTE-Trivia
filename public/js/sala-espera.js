

const salaTitle = document.querySelector("#txt-salaCode");
const users= document.querySelector("#users")
const socket = io();
const players=[]

const newGame = localStorage.getItem("newGame");
if (newGame == "true") {
    const username = localStorage.getItem("nameUser");
    // const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");

    if (username && id) {
        
        socket.emit("nuevo-juego", {
            id: id ?? "",
            username,
        })

        socket.on("nuevo-juego", (game) => {
            salaTitle.innerHTML = game.id
            localStorage.setItem("code-sala",game.id);
            localStorage.removeItem("newGame");
            console.log(game);
            game.players.map(player=>pintarUsuarios(player))
            
        })

       
    } else {
        window.location = "index.html"
    }


} else {
    const sala = localStorage.getItem("code-sala");
    const username = localStorage.getItem("nameUser");
    const id = localStorage.getItem("id")
    if (sala && username && id) {
        socket.emit("info-sala", {
            id: sala,
            name: username,
            idUser: id
        })
        socket.on("info-sala",(payload) => {
            if (payload.ok) {
                salaTitle.innerHTML = sala;
                payload.players.map(player=>{
                    if(!players.some(pl=>pl.id==player.id)){
                        players.unshift(player)
                    }
                })
                // players.unshift(...payload.players)
                console.log(players)
                pintarUsuarios()
            } else {
                console.log(payload)
                // resetLocalStorage()
                // window.location = "index.html"
            }
            localStorage.removeItem("newGame")
        })
    } else {
        window.location = "index.html"
    }
}

// socket.on("nuevo-jugador",(player)=>{
//     players.unshift(player)
//     pintarUsuarios()
// })
const resetLocalStorage = () => {
    localStorage.removeItem("code-sala")
    localStorage.removeItem("role")
}

const pintarUsuarios=()=>{
    let html=""
    players.map(player=>{
        html+=`<p>${player.name}</p>`
    })
    users.innerHTML=html
}

