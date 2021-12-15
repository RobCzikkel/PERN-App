var express = require('express');
var ordersRouter = express.Router();

const OrderService = require('../services/order');

const authCheck = (req,res,next) => {
    if (!req.user) {
        res.status(401);
    } else {
        next();
    }
}

ordersRouter.get('/', authCheck, async(req,res,next) => {
    try {
        const orders = await OrderService.getOrders(req.user.id);
        res.status(200).json(orders);
    } catch(error) {
        next(error);
    }
});

ordersRouter.get('/:id', authCheck, async(req,res,next) => {
    try {
        const order = await OrderService.findOrder(req.params.id);
        res.status(200).json(order);
    } catch(error) {
        next(error)
    }
});



module.exports = ordersRouter;