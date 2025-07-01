const socket = io();

socket.emit("mensaje", "Hola soy el cliente!")

socket.on("msj2", data => console.log("Data: ", data))