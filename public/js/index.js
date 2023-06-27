const btnGetIn = document.querySelector("#btn-getIn");
const btnGetNewGame = document.querySelector("#btn-newGame");
const formGetIn = document.querySelector("#form-getIn");
const socket = io();

const infoUser = {
    id: localStorage.getItem("id"),
    username: localStorage.getItem("nameUser")
}

if (infoUser.id && infoUser.username) {
    socket.emit("info-salas-usuario", infoUser.id, (info) => {
        if (Object.keys(info).length > 0) {
            window.location = "sala-espera.html"
        }
    })
} else {
    window.location = "./login.html"

}


btnGetNewGame.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("newGame", true)
    window.location = "sala-espera.html"
})

formGetIn.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formGetIn);

    if (formData.get("inpt-code__sala").trim()) {
        socket.emit("exists-sala", formData.get("inpt-code__sala"), (exists) => {
            if (exists) {
                localStorage.setItem("code-sala", formData.get("inpt-code__sala"))
                window.location = "sala-espera.html"
            } else {
                alert("El codigo de la sala no existe")
            }
        })
        // localStorage.setItem("newGame",false)
        // localStorage.setItem("role", "player")

        // window.location = "./login.html"
    } else {
        alert("No has ingresado un codigo")
    }
})



socket.on("connect", () => {
    console.log("das")
})