const { pool } = require('./config');
const options = {capSQL: true};
const pgp = require('pg-promise')(options);

module.exports = class CartModel {

    async getCart(id) {
        try {
            const results = await pool.query('SELECT * FROM cart WHERE user_id=$1', [id]);
            return results.rows[0];
        } catch(error) {
            throw error;
        }
    }

    async createCart(id) {
        try {
            const statement = pgp.helpers.insert(id, null, 'cart') + ' RETURNING *';

            const results = await pool.query(statement);
            return results.rows[0];
        } catch(error) {
            throw error
        }
    }

}
