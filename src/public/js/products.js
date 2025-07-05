const socket = io();

const form = document.getElementById('formCrearProducto');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = parseFloat(document.getElementById('price').value);
    const activo = document.getElementById('activo').value === 'true';
    const stock = parseInt(document.getElementById('stock').value);
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;

    const nuevoProducto = { title, description, code, price, status: activo, stock, category, image };

    socket.emit('nuevoProducto', nuevoProducto);
    
    form.reset();
});

socket.on('actualizarProductos', (productos) => {
    const ul = document.getElementById('listaProductos');
    ul.innerHTML = "";
    productos.forEach(p => {
        ul.innerHTML += `<li>${p.title} - $${p.price}</li>`;
    });
});

socket.emit("mensaje", "Pagina de productos")

socket.on("msj3", data => console.log("Data: ", data))