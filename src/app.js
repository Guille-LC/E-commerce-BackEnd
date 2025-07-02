//http://localhost:8080

import express from 'express'
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import addToCart from './routes/add.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import fs from 'fs'
import { Server } from 'socket.io'

const app = express();
const PORT = 8080;

//Configuracion de Express
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views/");
app.set('view engine', 'handlebars');

function leerProductos() {
  const data = fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8');
  return JSON.parse(data) ;
}

function leerCarrito() {
    try {
        const cartData = fs.readFileSync(`${__dirname}/data/carts.json`,'utf-8');
        return JSON.parse(cartData)
    } catch (error) {
        console.error("❌ Error al leer archivo:", error.message);
        return [];
    }
}

//Ruta de Handlebars para ver los productos y los carritos
app.get('/realTimeProducts',(req,res) => {
    const products = leerProductos();
    res.render("realTimeProducts", {
      style: 'main.css',
      products})
})

app.get('/home',(req,res) => {
  const carritos = leerCarrito();
  res.render("home", {
    style: "main.css",
    carritos})
})

app.get('/socket', (req,res) => {
  res.render("socket")
})

//Rutas de producto y carrito
app.use("/api", productsRouter)
app.use("/api/carts", cartsRouter)

app.use("/api", addToCart)

const httpServer = app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));

//Socket
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  socket.on('mensaje',data => console.log("Data: ", data))
  socket.emit("msj2", "Soy el backend")
})