import ProductsDAO from "../DAO/products.dao.js";

const productsModel = new ProductsDAO();

//GET: Todos los productos
export const getProductsService = async() => {
    return await productsModel.getAll();
}

//GET por ID
export const getProductById = async(pid) => {
    return await productsModel.getById(pid);
}

//POST
export const createProduct = async(productsData) => {
    return await productsModel.postProduct(productsData);
}

//PUT 
export const updateProduct = async(pid,updateData) => {
    return await productsModel.putProduct(pid,updateData);
}

//DELETE 
export const deleteProductById = async(pid) => {
    return await productsModel.deleteProduct(pid);
}