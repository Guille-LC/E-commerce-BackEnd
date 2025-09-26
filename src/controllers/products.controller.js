import { createProduct, deleteProductById, getProductById, getProductsService, updateProduct } from "../service/products.service.js";

//GET
export const getProductsController = async (req,res) => {
    try {
        const productsData = await getProductsService();
        if(!productsData) {
            return res.status(404).send({
                status: "Error",
                message: `Controller: No se encontraron productos.`
            });
        }
        res.send({ status: "Success", payload: productsData })
    } catch (error) {
        console.log(error);
    }
}

//GET por ID
export const getProductByIdController = async (req,res) => {
    try {
        let {pid} = req.params;
        const productDataWithId = await getProductById(pid);
        if(!productDataWithId) {
            return res.status(404).send({
                status: "Error",
                message: `Controller: No se encontro el producto con el id:${pid}.`
            });
        }
        res.send({ status: "Success", payload: productDataWithId })
    } catch (error) {
        console.log("Controller: No se pudo conectar con Moongose: " + error);
    }
}

//POST
export const createProductController = async (req,res) => {
    try {
        const newProduct = await createProduct(req.body);
        return res.status(201).json({
            message: "Controller: Producto creado con éxito",
            product: newProduct,
        });
    } catch (error) {
        console.error("Controller: No se pudo crear: " + error);
        return res.status(500).json({ error: "Controller: Error al crear el producto" });
    }
}

//PUT
export const updateProductWithIdController = async (req,res) => {
    try {
        let {pid} = req.params;
        let updateData = req.body;
        if(!pid) {
            return res.status(404).send({status:"Error", message: `Controller: No se encontro el producto con el ID:${pid}`})
        }
        const updatedFilm = await updateProduct(pid,updateData)
        res.status(200).send({message: "Controller: Producto actualizado con éxito", product: updatedFilm})
    } catch (error) {
        console.error("Controller: No se pudo actualizar: " + error);
        return res.status(500).json({error: "Controller: Error al actualizar el producto"})
    }
}

//DELETE
export const deleteProductWithIdController = async (req,res) => {
    try {
        let {pid} = req.params;
        if(!pid) {
            return res.status(404).send({status:"Error", message: `Controller: No se encontro el producto con el ID:${pid}`})
        }
        const deletedFilm = await deleteProductById(pid)
        return res.status(200).json({ message: "Controller: Producto eliminado con éxito", product: deletedFilm });
    } catch (error) {
        console.error("Controller: Error al eliminar producto:", error);
    return res.status(500).json({ error: "Controller: Error del servidor al eliminar el producto" });
    }
}