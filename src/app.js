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

app.use("/", productsRouter)

app.use("/", cartsRouter)

app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));