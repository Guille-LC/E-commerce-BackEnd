//http://localhost:8080
//Para correr la aplicacion escribir en consola: nodemon src/app.js

import express, { response } from 'express'
import exphbs from 'express-handlebars'
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { Server } from 'socket.io'
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import addToCart from './routes/add.router.js'
import cookiesRouter from './routes/cookies.router.js'
import { __dirname, guardarArchivos, generarIdUnico } from './utils.js'
import { filmsModel } from './models/products.models.js'
import { cartModel } from './models/carritos.models.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import userViewsRouter from './routes/user.views.router.js'
import sessionRouter from './routes/sessions.router.js'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import MongoDBSingleton from './config/mongodbSingleton.js'

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cookieParser())

//Ruta para la base de datos
const pathDB = process.env.MONGO_URL;

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
    mongoOptions: {},
    ttl: 20
  }),
  secret:'s3cr3ts3ss10n',
  resave:true,
  saveUninitialized:true
}))

app.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado el sitio: '${req.session.counter}' veces`)
    } else {
        req.session.counter = 1
        res.send("Bienvenido!!..")
    }
})

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Ruta de Handlebars para ver los productos y los carritos
app.get('/realTimeProducts', async (req,res) => {
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

//Rutas & endpoints para POSTMAN
app.use("/api", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api", addToCart)

//Login & Register
app.use("/views/users", userViewsRouter)
app.use("/api/sessions", sessionRouter)

//Cookies
app.use("/", cookiesRouter)

const httpServer = app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));

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

const mongoInstance = async() => {
  try {
    await MongoDBSingleton.getInstance()
  } catch (error) {
    console.error(error);
  }
}
mongoInstance()