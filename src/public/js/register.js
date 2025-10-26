import { logger } from "../../config/logger";

const form = document.getElementById("registerForm");

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form)
    const obj = {}
    data.forEach((value,key) => {
        obj[key] = value
    })
    fetch("/api/sessions/register",{
        method:"POST",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status === 200) {
            logger.info(`register.js => Usuario registrado`)
            Swal.fire({
                title: "¡Usuario registrado!",
                icon: "success"
            });
            setTimeout(() => {
                window.location.replace("/views/users/login")
            }, 2000)
        } else {
            logger.error(`register.js => No se pudo registrar, ele usuario ya existe.`)
            Swal.fire({
            icon: "error",
            title: "NO SE PUDO REGISTRAR",
            text: "¡El usuario ya existe!"
            });
        }
    }).catch(error => { 
        logger.error(`Algo salio mal: ${error}`)
    })
})