//http://localhost:8080
//Para correr la aplicacion escribir en consola: nodemon src/app.js

import express, { response } from 'express'
import exphbs from 'express-handlebars'
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { Server } from 'socket.io'
import mongoose, { mongo } from 'mongoose'
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import addToCart from './routes/add.router.js'
import cookiesRouter from './routes/cookies.router.js'
import { __dirname, leerCarrito, guardarArchivos, generarIdUnico, leerArchivos } from './utils.js'
import { filmsModel } from './models/products.models.js'
import { cartModel } from './models/carritos.models.js'
import FileStore from 'session-file-store'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express();
const PORT = 8080;

const pathDB = "mongodb+srv://guillermolavi96:x6HvQGJDYv9ltign@cluster0.ijlxqem.mongodb.net/EcommerceFilms?retryWrites=true&w=majority&appName=Cluster0"

//Configuracion de Express
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', exphbs.engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('views', __dirname + "/views/");
app.set('view engine', 'handlebars');

//Session Storage
app.use(session({
  store: MongoStore.create({
    mongoUrl: pathDB,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 20
  }),
  secret:'s3cr3ts3ss10n',
  resave:true,
  saveUninitialized:true
}))

//Ruta de Handlebars para ver los productos y los carritos
app.get('/realTimeProducts', async (req,res) => {
    let products = await filmsModel.find();

    let page = await parseInt(req.query.page)
    let limit = await parseInt(req.query.limit)

    if (!page) page = 1;
    if (!limit) limit = 5;

    let result = await filmsModel.paginate({}, {limit: limit, page: page, lean: true})

    result.prevLink = result.hasPrevPage ? `http://localhost:8080/realTimeProducts?page=${result.prevPage}` : ``
    result.nextLink = result.hasNextPage ? `http://localhost:8080/realTimeProducts?page=${result.nextPage}` : ``

    result.isValid = !(page <= 0 || page > result.totalPages)

    res.render("realTimeProducts", {
      style: 'main.css',
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
      page: result.page,
      totalPages: result.totalPages})
})

app.get('/home', async (req,res) => {
  const carritos = await cartModel.find();
  res.render("home", {
    style: "main.css",
    carritos})
})

//Rutas de producto y carrito
app.use("/api", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api", addToCart)

const httpServer = app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));

//Cookies
app.use("/", cookiesRouter)

//Socket
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  socket.on('nuevoProducto', async data => {
    try {
      let productos = await filmsModel.find();
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
const connectMongoDB = async () => {
  try {
    await mongoose.connect(pathDB)
    console.log("Conectado a la base de MongoDB!");
    let response = await filmsModel.find().explain("executionStats")
    console.log(response);

    let movies = await filmsModel.paginate({},{limit: 5});
    console.log(movies);

    /* cartModel.create({}) */
    /* const cart = await cartModel.findOne({_id: "68910f5d090b1522c269a183"})
    cart.products.push({productId: "688a81ad6cec6b7fadcd721e"})
    const result = await cartModel.updateOne({_id: "68910f5d090b1522c269a183"}, cart) */
    /* let cart = await cartModel.findOne({_id: "68910f5d090b1522c269a183"}).populate('products.productId')
    console.log(JSON.stringify(cart,null,2)); */
    
  } catch (error) {
    console.log("No se pudo conectar a la base de datos..." , error);
    process.exit()
  }
}

connectMongoDB();