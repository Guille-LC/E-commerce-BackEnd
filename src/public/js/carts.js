const socket = io();

socket.emit("mensaje", "Pagina de carritos")

socket.on("msj2", data => console.log("Data: ", data))