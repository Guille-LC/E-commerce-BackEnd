import express from 'express'
import cartsRouter from './routes/carts.products.js'
import productsRouter from './routes/products.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views/");
app.set('view engine', 'handlebars');

//Ejercicio
/* const users = [
  {
    nombre: "Lucía",
    apellido: "Gómez",
    edad: 28,
    correo: "lucia.gomez@example.com",
    telefono: "+54 11 2345 6789"
  },
  {
    nombre: "Martín",
    apellido: "Pérez",
    edad: 35,
    correo: "martin.perez@example.com",
    telefono: "+54 11 3456 7890"
  },
  {
    nombre: "Camila",
    apellido: "Rodríguez",
    edad: 24,
    correo: "camila.rodriguez@example.com",
    telefono: "+54 11 4567 8901"
  },
  {
    nombre: "Julián",
    apellido: "Fernández",
    edad: 41,
    correo: "julian.fernandez@example.com",
    telefono: "+54 11 5678 9012"
  },
  {
    nombre: "Sofía",
    apellido: "López",
    edad: 30,
    correo: "sofia.lopez@example.com",
    telefono: "+54 11 6789 0123"
  }
]; */
/* app.get("/test", (req,res) => {
    let randomNum = Math.floor(Math.random() * users.length)
    res.render('index', users[randomNum])
}) */


app.get("/saludo", (req,res) =>{
    res.send('Bienvenidos')
})

app.use("/", productsRouter)

app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));