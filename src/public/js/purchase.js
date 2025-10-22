const purchaseForm = document.getElementById('purchasecart'); 

purchaseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = purchaseForm.email.value;
    const cartId = purchaseForm.dataset.cartId;
    console.log("este es el id del carrito en el script de purchase que va a confirmar la compra: ",cartId);
    
    try {
        const response = await fetch(`/api/carts/68e2f5ee3fc2cb85c04ea639/purchase`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();

        if(result.status === "Success") {
            alert('Compra realizada con exito')
        } else {
            alert('Error al confirmar la compra')
        }
    } catch (error) {
        console.log(error);
    }
})