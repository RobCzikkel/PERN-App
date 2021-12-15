var express = require('express');
var productsRouter = express.Router();
 const productService = require('../services/product');

/* GET users listing. */
productsRouter.get('/:id', async (req,res,next) => {
  try {
    const result = await productService.getProductById(req.params.id);
    res.status(200).json(result);
  } catch(error) {
    next(error)
  }
  
});


productsRouter.get('/', async (req,res,next) => {
  try {
    const result = await productService.getProductByCategory();
    res.status(200).json(result);
  } catch(error) {
    next(error)
  }
  
});


module.exports = productsRouter;