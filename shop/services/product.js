const ProductInstance = require('../models/products');
const ProductModel = new ProductInstance();


module.exports = {

    getProductById: async (data) => {
        const response = await ProductModel.getProductById(data);
        return response;
    },

    getProductByCategory: async() => {
        const response = await ProductModel.getProductByCategory();
        return response;
    }
}