//http://localhost:8080

import express from 'express'
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import fs from 'fs'

//Variables constantes
const rutaArchivo = `${__dirname}/data/products.json`
const codeFormat = 'utf-8'

const app = express();
const PORT = 9090;

//Configuracion de Express
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views/");
app.set('view engine', 'handlebars');

function leerProductos() {
  const data = fs.readFileSync(rutaArchivo, codeFormat);
  return JSON.parse(data) ;
}

//Ruta de Handlebars para ver los productos
app.get('/home',(req,res) => {
    const products = leerProductos();
    res.render("home", {products})
})

//Rutas de producto y carrito
app.use("/api", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));