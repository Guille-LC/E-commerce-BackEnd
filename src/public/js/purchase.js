const purchaseForm = document.getElementById('purchasecart'); 

purchaseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = purchaseForm.email.value;
    const cartId = purchaseForm.dataset.cartId;
    
    try {
        const response = await fetch(`/api/carts/${cartId}/purchase`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        console.log(result);
        
        if(result.status === "Success") {
            Swal.fire({
                title: "¡Compra realizada con exito!",
                icon: "success"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "No se pudo realizar la compra...",
                text: "¡Algo salio mal!"
            });
        }
    } catch (error) {
        console.log(error);
    }
})