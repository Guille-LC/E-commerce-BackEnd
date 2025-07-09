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
    console.log(nuevoProducto);
    form.reset();
});

socket.on('actualizarProductos', (productos) => {
    const ul = document.getElementById('listaProductos');
    ul.innerHTML = "";
    if (productos.length > 0) {
        productos.forEach(p => {
            ul.innerHTML += `
                <li class="films">
                    <h3>Titulo: ${p.title}</h3>
                    <p>Descripcion: ${p.description}</p>
                    <p>Codigo: ${p.code}</p>
                    <p>Precio: $${p.price}</p>
                    <p>Estado: ${p.status}</p>
                    <p>Stock: ${p.stock}</p>
                    <p>Categoria: ${p.category}</p>
                    <img class="poster" src="${p.image || p.thumbnails}" alt="${p.title}">
                </li>`;
        });
    } else {
        ul.innerHTML = `<h2>No hay productos disponibles.</h2>`;
    }
});

socket.emit("mensaje", "Pagina de productos")

socket.on("msj3", data => console.log("Data: ", data))