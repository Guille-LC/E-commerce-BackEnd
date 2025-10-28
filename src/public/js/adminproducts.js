const socket = io();

const form = document.getElementById('formCrearProducto');

form.addEventListener('submit', async (e) => {
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

    try {
            const res = await fetch(`/api/create`,{
            method:"POST",
            body: JSON.stringify(nuevoProducto),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error("Error al crear el producto");

        const data = await res.json();
        console.log(data);

        Swal.fire({
        title: "¡Producto creado!",
        text: "(La lista de productos se ha actualizado)",
        icon: "success"
        });
        
        form.reset();
    } catch(error) {
        Swal.fire({
            title: "Error",
            text: "No se pudo crear el producto",
            icon: "error"
        });
    }
});

const deleteForm = document.getElementById('deleteproduct');

deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value.trim();

    if(!id) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un ID válido",
            icon: "error"
        });
        return;
    }

    try {
        const res = await fetch(`/api/${id}`,{
            method: "DELETE"
        });

        if(!res.ok)  throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json()
        console.log(data);
        Swal.fire({
            title: "¡Producto eliminado!",
            text: `(ID: ${id})`,
            icon: "success"
        });

        deleteForm.reset();
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el producto",
            icon: "error"
        });
    }
})