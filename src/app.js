import express from 'express'
import cartsRouter from './routes/carts.products.js'
import productsRouter from './routes/products.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true }));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views/");
app.set('view engine', 'handlebars');

//Rutas
app.use("/api", productsRouter)
app.use("/api", cartsRouter)

app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));