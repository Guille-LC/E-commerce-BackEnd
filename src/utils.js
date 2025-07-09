import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Variables constantes
const rutaCarrito = `${__dirname}/data/carts.json`
const rutaProductos = `${__dirname}/data/products.json`
const codeFormat = 'utf-8'

export async function leerProductos() {
    try {
        const data = await fs.readFile(rutaProductos,codeFormat);
        return JSON.parse(data) ;
    } catch (error) {
        console.error("❌ Error al leer archivo:", error.message);
        return [];
    }
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
        const data = await fs.readFileSync(rutaProductos,codeFormat);
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