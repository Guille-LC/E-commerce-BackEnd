import { Router } from "express";
const router = Router()

const products = [
    {
        id:1,
        title: "Casablanca",
        description: "Casablanca es una historia de amor y sacrificio ambientada durante la Segunda Guerra Mundial.",
        code: "",
        price: 1000,
        status: true,
        stock: 10,
        category: "Drama",
        thumbnails: []
    },
    {
        id:2,
        title: "Psycho",
        description: "Psycho es un thriller psicológico sobre un asesinato en un motel que revela una oscura doble identidad.",
        code: "",
        price: 2000,
        status: true,
        stock: 7,
        category: "Terror",
        thumbnails: []
    },
    {
        id:3,
        title: "Metropolis",
        description: "Metrópolis es una obra de ciencia ficción que retrata una ciudad futurista dividida entre una élite dominante y trabajadores oprimidos, explorando la lucha por la justicia social.",
        code: "",
        price: 2700,
        status: false,
        stock: 3,
        category: "Sci-fi",
        thumbnails: []
    },
    {
        id:4,
        title: "Django",
        description: "Django es un wéstern violento y estilizado sobre un solitario pistolero que busca venganza en un mundo brutal y corrupto.",
        code: "",
        price: 1500,
        status: false,
        stock: 2,
        category: "Western",
        thumbnails: []
    },
    {
        id:5,
        title: "Se7en",
        description: "Se7en es un oscuro thriller policial donde dos detectives persiguen a un asesino en serie que comete crímenes basados en los siete pecados capitales.",
        code: "",
        price: 3500,
        status: true,
        stock: 4,
        category: "Thriller",
        thumbnails: []
    }
]

//GET: Todos los productos
router.get("/", (req,res) => {
    res.send({status: "Succes", payload: products})
})

//GET: Por su ID
router.get("/:productId", (req,res) => {
    let { productId } = req.params;
    productId = parseInt(productId);
    let productIndex = products.findIndex(p => p.id === productId) 
    if(productIndex === -1) {
        return res.status(404).send({ status: "Error", message: "Producto no encontrado" });
    }
    res.send({status: "Success", payload: products[productIndex]})
})

//POST
router.post("/", (req,res) => {
    let prod = req.body;
    prod.id = Math.floor(Math.random() * 100 + 1);
    if(!prod.title || !prod.description) {
        return res.status(400).send({status: "Error", message: "Formato invalido"})
    }
    products.push(prod)
    res.send({status: "Succes", payload: `Agregado el film con el id: ${prod.id}`})
})

//PUT
router.put("/:productId", (req,res) => {

    let { productId } = req.params;

    let prodUpdate = req.body;

    let productPosition = products.findIndex(p => p.id === parseInt(productId))

    if(productPosition > 0) {
        return res.send({status: "Error", message: "Producto no encontrado"})
    }
    prodUpdate.id = products[productPosition.id]
    products[productPosition] = prodUpdate;
})

export default router;