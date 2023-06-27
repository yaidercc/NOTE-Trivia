const {
    v4: uuid
} = require("uuid");
const TriviaModel = require("../model/trivia-model")
const triviaModel = new TriviaModel();

const socketController = async (socket, io) => {

    socket.on("entrar-juego", (payload) => {
       
    })
    socket.on("info-sala", ({
        id,
        name,
        idUser
    },callback) => {
        const data = triviaModel.infoSala(id, name, idUser)
        socket.join(data.id);
        console.log(data.players)
        io.to(data.id).emit("nuevo-jugador",data.players)
        io.to(data.id).emit("info-sala",data);
    })
    socket.on("nuevo-juego", ({
        id,
        username
    }) => {
        const data = triviaModel.createGame(id, username)
        socket.join(data.id)
        socket.emit("nuevo-juego", data)
    })

    socket.on("exists-sala", (
        id, callback) => {
        const exists = triviaModel.existSala(id);
        callback(exists)
    })

    socket.on("nuevo-usuario", () => {
        socket.emit("nuevo-usuario", {
            id: uuid()
        })
    })
}

module.exports = {
    socketController
}