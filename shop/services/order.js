const OrderInstance = require('../models/orders');
const OrderModel = new OrderInstance();
const OrderItemInstance = require('../models/orderItems');
const OrderItemModel = new OrderItemInstance();

module.exports = {

    getOrders: async(user_id) => {
        const orders = await OrderModel.getOrders(user_id);
        const response = await Promise.all(orders.map(async(order) => ({
            ...order,
            items: await OrderItemModel.getItems(order.id)
        })))
        return response;
    },

    findOrder: async(id) => {
        const response = await OrderModel.findOrder(id)
        return response;
    }
}