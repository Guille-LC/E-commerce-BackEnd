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
            'Content-Type': 'application/json',
        }
    }).then(async result => {
        if(result.status == 200) {
            const resData = await result.json()
            const nameOfUser = resData.user.name
            const roleOfUser = resData.user.role

            if(roleOfUser === 'user') {
                Swal.fire({
                    title: `¡Bienvenido ${roleOfUser} ${nameOfUser}!`,
                    icon: "success"
                });
                setTimeout(() => {
                    window.location.replace("/views/users/profile")
                }, 2000)
            } else if (roleOfUser === 'admin') {
                Swal.fire({
                    title: `¡Bienvenido ${roleOfUser} ${nameOfUser}!`,
                    icon: "success"
                });
                setTimeout(() => {
                    window.location.replace("/views/users/admin")
                }, 2000)
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "NO SE PUDO LOGUEAR",
                text: "¡Algo salio mal!"
            });
        }
    }).catch(error => { 
        console.log(error)
    })
})