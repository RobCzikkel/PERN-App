const { pool } = require('./config');

module.exports = class ProductModel {

    async getProductById(id) {
        try {
            const results = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
            if (!results) {
                return null;
            }
            return results.rows[0];
        } catch(error) {
            throw error;
        }
    }

    async getProductByCategory() {
        try {
            const results = await pool.query('SELECT * FROM products');
            if (!results) {
                return null;
            }
            return results.rows;
        } catch(error) {
            throw error;
        }
    }


}