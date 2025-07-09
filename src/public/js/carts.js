const socket = io();

const createCart = document.getElementById("createCart");

createCart.addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/api/carts/createCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Carrito creado:", data);
            Swal.fire({
                title: "¡Carrito creado!",
                icon: "success"
            });
        } else {
            console.error("Error al crear carrito:", data.message);
        }
    } catch (error) {
        {
            console.error("Error inesperado:", err);
        }
    }
})

socket.emit("mensaje", "Pagina de carritos")

socket.on("msj2", data => console.log("Data: ", data))