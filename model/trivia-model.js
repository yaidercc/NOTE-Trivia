const {
    v4: uuid
} = require("uuid");
const fs = require("fs")
const path = require("path")
class TriviaModel {
    constructor() {
        this.games = [];
        this.init();
    }
    init() {
        this.games = require("../db/db.json") ?? {}
    }
    createGame(id, name) {
        const idGame = uuid().split("-")[0];
        const infoGame = {
            status: true,
            owner: {
                id,
                name
            },
            players: [{
                id,
                name,
                buenas:0,
                malas:0,
                noRespondidas:0
            },]
        }
        this.games[idGame] = infoGame;
        const dbPath = path.join(__dirname, "../db/db.json")
        fs.writeFileSync(dbPath, JSON.stringify(this.games))

        return {id:idGame,players:infoGame.players};
    }
    infoSala(id,name, idUser) {
        if (this.games.hasOwnProperty(id)) {
            const game = this.games[id]
            if (game.status) {
                const searchUser = game.players.some(item => item?.id == idUser)
                if (game.owner.id != idUser && !searchUser) {
                    console.log()
                    game.players.push({
                        id:idUser,
                        name,
                        buenas:0,
                        malas:0,
                        noRespondidas:0
                    })
                }
                
                this.games[id]=game;
                game.players.map(player=>({
                    name:player.name
                }))
                return {
                    ok: true,
                    id,
                    players:game.players
                }
            } else {
                return {
                    ok: false,
                    msg: "sala no existe"
                }
            }
        } else {
            return {
                ok: false,
                msg: "sala no existe"
            }
        }
    }
    existSala(id){
        return this.games.hasOwnProperty(id);
    }
    infoPLayer(id){
        let salaInfo={}
        this.games.map(game=>{
            if(game.players.some(player=>player.id===id) && game.status){
                salaInfo=game
            }
        })
        return salaInfo;
    }
}
module.exports = TriviaModel