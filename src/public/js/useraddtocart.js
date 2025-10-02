const add2cart = document.getElementById('addtocart');

add2cart.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cartId = document.getElementById('cartid').value.trim();
    const productId = document.getElementById('productid').value.trim();

    if(!cartId || !productId) {
        throw new Error("Debe ingresar el ID del carrito y del producto");
    }

    try {
        const res = await fetch(`/api/addToCart/${cartId}/products/${productId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!res.ok) {
            throw new Error("Error al agregar el producto al carrito");
        }
        
        Swal.fire({
        title: "¡Producto agregado al carrito!",
        text: "(La lista de carritos se ha actualizado)",
        icon: "success"
        });
        add2cart.reset();
    } catch (error) {
        console.log(error);
        
    }
})