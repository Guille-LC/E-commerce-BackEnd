const form = document.getElementById("loginForm");

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form)
    const obj = {}
    data.forEach((value,key) => {
        obj[key] = value
    })
    fetch("/api/sessions/login",{
        method:"POST",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status == 200) {
            Swal.fire({
                title: `¡Bienvenido!`,
                icon: "success"
            });
            setTimeout(() => {
                window.location.replace("/views/users/profile")
            }, 2000)
        } else {
            Swal.fire({
                icon: "error",
                title: "NO SE PUDO LOGUEAR",
                text: "¡El usuario no existe!"
            });
        }
    }).catch(err => { 
        console.log(err);
    })
})