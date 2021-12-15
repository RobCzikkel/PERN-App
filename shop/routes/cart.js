var express = require('express');
const cart = require('../services/cart');
var cartsRouter = express.Router();

const CartService = require('../services/cart')
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51JyfStFN5eUTHR46KZJAsrkYN0sXfnahMPYQrBPrWnMDEzyM0qPl1uV57xxQcsxZFoIaTnnQDif4zRU8t4atE1yq00LeFoNgB4')



cartsRouter.get('/', async(req,res,next) => {
  try {
    const result = await CartService.getCart(req.user.id);
    res.status(200).json(result);
  } catch(error) {
    next(error)
  }
});

cartsRouter.post('/', async(req,res,next) => {
  try {
    const result = await CartService.createCart({user_id: req.user.id});
    res.status(201).json(result);
  } catch(error) {
    next(error)
  }
})

cartsRouter.post('/items', async(req,res,next) => {
  try {
    const result = await CartService.createCartItem(req.user.id, req.body);
    res.status(200).json(result);
  } catch(error) {
    next(error)
  }
})

cartsRouter.put('/items/:id', async(req,res,next) => {
  try {
    const result = await CartService.updateItem(req.params.id, req.body);
    res.status(201).json(result);
  } catch(error) {
    next(error)
  }
})

cartsRouter.delete('/items/:id', async(req,res,next) => {
  try {
    const result = await CartService.deleteItem(req.params.id);
    res.status(201).json(result);
  } catch(error) {
    next(error)
  }
})

cartsRouter.post('/checkout', async(req,res,next) => {
  const { cart_id, id, amount, email, address, first, last } = req.body;
  try {
    const result = await CartService.checkout(cart_id, id, amount, email, address, first, last, req.user.id);
    res.status(200).json(result);
  } catch(error) {
    next(error);
  }
})

cartsRouter.post('/secret', async (req, res,) => {
  const { cart_id, id, amount, email, address, first, last } = req.body;
  try {
    const response = await stripe.paymentIntents.create({
      amount,
      currency: 'gbp',
      payment_method: id,
      receipt_email: email,
      description: 'shoestore',
      confirm: true,
      shipping: {
        address: {
          line1: address.line1,
          city: address.city,
          postal_code: address.postcode
        },
        name: `${first} ${last}`
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.json(error)
  }
});



module.exports = cartsRouter;