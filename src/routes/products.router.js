import { Router } from "express";
const router = Router()

const products = [
    {
        id: 1,
        title: "Casablanca",
        description: "Casablanca es una historia de amor y sacrificio ambientada durante la Segunda Guerra Mundial.",
        code: "",
        price: 1000,
        status: true,
        stock: 10,
        category: "Drama",
        thumbnails: [
            "https://http2.mlstatic.com/D_NQ_NP_735864-MLA74159033785_012024-O.webp"
        ]
    },
    {
        id: 2,
        title: "Psycho",
        description: "Psycho es un thriller psicológico sobre un asesinato en un motel que revela una oscura doble identidad.",
        code: "",
        price: 2000,
        status: true,
        stock: 7,
        category: "Terror",
        thumbnails: [
            "https://atthemovies.uk/cdn/shop/products/psycho1965os2650LB.jpg?v=1621382516"
        ]
    },
    {
        id: 3,
        title: "Metropolis",
        description: "Metrópolis es una obra de ciencia ficción que retrata una ciudad futurista dividida entre una élite dominante y trabajadores oprimidos, explorando la lucha por la justicia social.",
        code: "",
        price: 2700,
        status: true,
        stock: 3,
        category: "Sci-fi",
        thumbnails: [
            "https://http2.mlstatic.com/D_913637-MLA26668029558_012018-O.jpg"
        ]
    },
    {
        id: 4,
        title: "Django",
        description: "Django es un wéstern violento y estilizado sobre un solitario pistolero que busca venganza en un mundo brutal y corrupto.",
        code: "",
        price: 1500,
        status: true,
        stock: 2,
        category: "Western",
        thumbnails: [
            "https://cdn.posteritati.com/posters/000/000/045/928/django-md-web.jpg"
        ]
    },
    {
        id: 5,
        title: "Se7en",
        description: "Se7en es un oscuro thriller policial donde dos detectives persiguen a un asesino en serie que comete crímenes basados en los siete pecados capitales.",
        code: "",
        price: 3500,
        status: true,
        stock: 4,
        category: "Thriller",
        thumbnails: [
            "https://image.tmdb.org/t/p/original/aVNqeE2JjiW7VMSmkxPdN0Xd5xo.jpg"
        ]
    }
];


//GET: Todos los productos
router.get("/", (req,res) => {
    res.send({status: "Success", payload: products})
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

    if(!prod.title || !prod.description || !prod.code || !prod.price || !prod.status || !prod.stock || !prod.category) {
        return res.status(400).send({status: "Error", message: "Campos incompletos"})
    }
    prod.id = Math.floor(Math.random() * 100 + 1);

    products.push(prod)

    res.send({status: "Success", payload: `Agregado el film con el id: ${prod.id}`})
})

//PUT
router.put("/:productId", (req,res) => {

    const { productId } = req.params;
    let prodUpdate = req.body;
    let productPosition = products.findIndex(p => p.id === parseInt(productId))

    if(productPosition === -1) {
        return res.status(404).send({status: "Error", message: "Producto no encontrado"})
    }
    prodUpdate.id = products[productPosition].id
    products[productPosition] = prodUpdate;

    res.send({ status: "Success", payload: prodUpdate });
})

//DELETE
router.delete("/:productId", (req,res) => {

    let { productId } = req.params;
    productId = parseInt(productId);

    let productPosition = products.findIndex(p => p.id === productId)

    if(productPosition < 0) {
        return res.send({status: "Error", message: "Producto no encontrado"})
    }
    products.splice(productPosition, 1)

    res.send({status: "Success", message: `Producto con el id ${productId} eliminado exitosamente.`})

})

export default router;