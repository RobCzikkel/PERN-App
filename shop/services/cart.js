const CartInstance = require('../models/carts');
const CartItemInstance = require('../models/cartItem');
const OrderInstance = require('../models/orders');
const OrderItemInstance = require('../models/orderItems');
const OrderItemModel = new OrderItemInstance();
const CartModel = new CartInstance();
const CartItemModel = new CartItemInstance();
const OrderModel = new OrderInstance();
const createError = require('http-errors'); 
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51JyfStFN5eUTHR46KZJAsrkYN0sXfnahMPYQrBPrWnMDEzyM0qPl1uV57xxQcsxZFoIaTnnQDif4zRU8t4atE1yq00LeFoNgB4')

module.exports = {

    getCart: async(data) => {
        const cart = await CartModel.getCart(data);
        const items = await CartItemModel.getItems(cart.id);

        cart.items=  items
        return cart;
    },

    getCartForUser: async(data) => {
        const cart = await CartModel.getCart(data);

        return cart;
    },

    createCart: async(id) => {
        const response = await CartModel.createCart(id);
        return response;
    },

    createCartItem: async(user_id, data) => {
        const cart = await CartModel.getCart(user_id);
        const params = {cart_id: cart.id, ...data}
        const response = await CartItemModel.addItem(params);
        return response;
    },

    updateItem: async(id, params) => {
        const response = await CartItemModel.updateItem(id, params);
        return response;
    },

    deleteItem: async(id) => {
        const response = await CartItemModel.deleteItem(id);
        return response;
    },

    checkout: async(cart_id, id, amount, email, address, first, last, user_id) => {

        const items = await CartItemModel.getItems(cart_id);

        const total = items.reduce((total, cur) => {
            return total += (Number(cur.price) * Number(cur.quantity))}, 0);

        

        const order = await OrderModel.createOrder({ user_id, total });
        const order_id = order.id;
        
        order.items = await Promise.all(items.map(async (item) => await OrderItemModel.createItem({order_id: order.id, price:item.price, quantity:item.quantity, prod_id:item.prod_id})));
            
        
        const payment = await stripe.paymentIntents.create({
            amount: total,
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

        if(payment.hasOwnProperty('message')) {
            return payment;
        }

        order.items = await OrderItemModel.getItems(order.id);
        order.payment = payment;

        const cartCleared = await CartItemModel.clearCart(cart_id);
        return order;
    },
}