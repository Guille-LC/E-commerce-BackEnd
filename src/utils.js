import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


//Variables constantes
const rutaCarrito = `${__dirname}/data/carts.json`
const rutaProductos = `${__dirname}/data/products.json`
const codeFormat = 'utf-8'

//JWT
const PRIVATE_KEY = 'k0d3rs3cr3tk3y'
export const generateToken = user => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '1h'})
}

export const authToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({error: 'Token missing'})
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    
    jwt.verify(token,PRIVATE_KEY,(err, credentials) => {
        if(err) {
            return res.status(403).send({error: 'Token invalido'})
        }

        req.user = credentials.user;

        next()
    })
}

//Bcrypt
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));
export const isValidPassword = (passwordDB, passwordClient) => {
    return bcrypt.compareSync(passwordClient,passwordDB)
}

export async function leerCarrito() {
    try {
        const cartData = await fs.readFile(rutaCarrito,codeFormat);
        return JSON.parse(cartData)
    } catch (error) {
        console.error("❌ Error al leer archivo:", error.message);
        return [];
    }
}

export async function leerArchivos() {
    try {
        const data = await fs.readFile(rutaProductos,codeFormat);
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ Error al leer archivo:", error.message);
        return [];
    }
}

export async function guardarArchivos(products) {
    try {
        await fs.writeFile(rutaProductos, JSON.stringify(products, null, 2),codeFormat);
        return true
    } catch (error) {
        console.error("❌ Error al leer archivo:", error.message);
        return false
    }
}

export async function guardarCarrito(data) {
    try {
        await fs.writeFile(rutaCarrito,JSON.stringify(data, null, 2),codeFormat);
        return true;
    } catch (error) {
        console.error("❌ Error al guardar archivo:", error.message);
        return false;
    }
}

export function generarIdUnico(productos) {
    let id;
    let existe;

    do {
        id = Math.floor(Math.random() * 100) + 1;
        existe = productos.some(p => p.id === id);
    } while (existe);

    return id;
}

export {__dirname};