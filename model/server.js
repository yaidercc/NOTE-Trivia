const express = require("express");
const {
    socketController
} = require("../sockets/controllers");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = require("http").createServer(this.app)
        this.io = require("socket.io")(this.server)

        this.middlewares();
        this.sockets();

    }
    sockets() {
        this.io.on("connection", (socket) => socketController(socket, this.io));
    }

    middlewares() {
        this.app.use(express.static("public"));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Conectado en el puerto ${this.port}`);
        })
    }
}

module.exports = {
    Server
};