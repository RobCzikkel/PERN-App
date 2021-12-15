const { pool } = require('./config');
const bcrypt = require('bcryptjs')
const saltRounds = 10 // in production it should be at least 12s


const options = {capSQL: true};  
const pgp = require('pg-promise')(options);    //pgp is helpful for creating query strings 


// model class for Users
module.exports = class UserModel {

    async getUsers() {
        try {
            const results = await pool.query('SELECT id, username FROM users')
            if (results.rows.length > 0) {
                return results.rows;
            }
            return null;
        } catch(error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const results = await pool.query('SELECT username, email, created, googleID FROM users WHERE id=$1', [id]);
            if (results.rows.length > 0) {
                return results.rows[0];
            }
            return null;
        } catch(error) {
            throw error;
        }
    }

    async addUser({username, email, password}) {
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            const results = await pool.query(
                'INSERT INTO users(username,email,password) VALUES($1,$2,$3) RETURNING id, username, password',
                [username, email, hash]);
            return results.rows[0];
        } catch(error) {
            throw error;
        }
    }

    async updateUser(id, params) {
        try {
            const statement = pgp.helpers.update(params, null, 'users') + ` WHERE id=${id} RETURNING id, username`;
            const results = await pool.query(statement);
            return results.rows;
        } catch(error) {
            throw error;
        }
    }

    async deleteUser({id}) {
        try {
            const results = await pool.query('DELETE FROM users WHERE id=$1', [id])
            return results;
        } catch(error) {
            throw error;
        }
    }

    async getUserByName(username) {
        try {
            const results = await pool.query('SELECT * FROM users WHERE username=$1', [username])
            if (results.rows.length > 0) {
                return results.rows[0];
            }
            return false;
            
        } catch(error) {
            throw error;
        }
    }

    async saveUser(username, email, googleID) {
        try {
            const user = await pool.query('INSERT INTO users(username, email, googleID) VALUES($1,$2,$3) RETURNING *', [username, email, googleID])
            return user.rows[0]
        } catch(error) {
            
            throw error;
        }
    }
    
}