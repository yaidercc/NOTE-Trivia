const formLogin = document.querySelector("#form-login");
const socket = io();

if (localStorage.getItem("nameUser")) {
    window.location = "index.html"
}

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formLogin);

    if (formData.get("inpt-username").trim()) {
        socket.emit("nuevo-usuario",formData.get("inpt-username"))
        socket.on("nuevo-usuario",({id})=>{
            localStorage.setItem("nameUser", formData.get("inpt-username"))
            localStorage.setItem("id",id)
            window.location = "index.html"
        })
    } else {
        alert("No has ingresado un username")
    }
})



socket.on("connect", () => {
    console.log("das")
})