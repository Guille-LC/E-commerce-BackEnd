//http://localhost:8080

import express, { response } from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose, { mongo } from 'mongoose'
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import addToCart from './routes/add.router.js'
import { __dirname, leerCarrito, guardarArchivos, generarIdUnico, leerArchivos } from './utils.js'

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

//Ruta de Handlebars para ver los productos y los carritos
app.get('/realTimeProducts', async (req,res) => {
    const products = await leerArchivos();
    res.render("realTimeProducts", {
      style: 'main.css',
      products})
})

app.get('/home', async (req,res) => {
  const carritos = await leerCarrito();
  res.render("home", {
    style: "main.css",
    carritos})
})

//Rutas de producto y carrito
app.use("/api", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api", addToCart)

const httpServer = app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));

//Socket
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  socket.on('nuevoProducto', async data => {
    try {
      let productos = await leerArchivos();
      const nuevoProducto = {
        id: generarIdUnico(productos),
        ...data
      }
      productos.push(nuevoProducto);
      await guardarArchivos(productos);
      socketServer.emit('actualizarProductos', productos);
    } catch (error) {
      console.log("Error: ", error);
    }
  })

  socket.on('mensaje',data => console.log("Data: ", data))
  socket.emit("msj2", "Soy el backend")
  socket.emit("msj3", "Soy el backend")
})

//Mongoose
const pathDB = "mongodb+srv://guillermolavi96:x6HvQGJDYv9ltign@cluster0.ijlxqem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectMongoDB = async () => {
  await mongoose.connect(pathDB);
  try {
    await mongoose.connect(pathDB)
    console.log("Conectado a la base de MongoDB!");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos..." , error);
    process.exit()
  }
}

connectMongoDB();