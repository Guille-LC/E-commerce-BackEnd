const socket = io();

socket.emit("mensaje", "Pagina de productos")

socket.on("msj3", data => console.log("Data: ", data))