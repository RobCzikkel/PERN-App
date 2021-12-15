const { PayloadTooLarge } = require('http-errors');
const { pool } = require('./config');
const options = {capSQL: true};
const pgp = require('pg-promise')(options);

module.exports = class CartItems {

    // this will load all items related to a cart
    async getItems(id) {
        try {
            const statement = `
            SELECT c.id, c.cart_id, c.quantity, c.prod_id, p.name, p.price, p.description, p.photo
            FROM cart_item c
            INNER JOIN products p ON p.id = c.prod_id
            WHERE cart_id =${id};
            `

            const results = await pool.query(statement);
            return results.rows;
        } catch(error) {
            throw error;
        }
    }

    async addItem(params) {
        try { 
            const statement = pgp.helpers.insert(params, null, 'cart_item') + ' RETURNING *';
            const results = await pool.query(statement);
            return results.rows;
        } catch(error) {
            throw error;
        }
    }

    async updateItem(id, params) {
        try {
            const statement = pgp.helpers.update(params, null, 'cart_item') + ` WHERE prod_id=${id} RETURNING *`
            const results = await pool.query(statement);
            return results.rows[0];
        } catch(error) {

        }
    }

    async deleteItem(id) {
        try { 
            const results = await pool.query('DELETE FROM cart_item WHERE prod_id=$1', [id]);
            return true;
        } catch(error) {
            throw error;
        }
    }

    async clearCart(id) {
        try {
            const results = await pool.query('DELETE FROM cart_item WHERE cart_id=$1', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}