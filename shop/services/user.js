const { response } = require('express');
const UserInstance = require('../models/users');
const UserModel = new UserInstance();
const createError = require('http-errors');  // import it for throwing errors in validator function
const bcrypt = require('bcryptjs');
const cartService = require('./cart')

module.exports = {

    getUsers: async() => {
        const response = await UserModel.getUsers();
        return response;
    },

    getUserById: async(data) => {
        const response = await UserModel.getUserById(data);
        return response;
    },

    addUser: async(data) => {
        const response = await UserModel.addUser(data);
        
        return response;
    },

    updateUser: async(id, params) => {
        const response = await UserModel.updateUser(id, params);
        return response;
    },

    deleteUser: async(data) => {
        const response = await UserModel.deleteUser(data);
        return response;
    },

    // Function to validate user
    login: async(data) => {
        const { username, password } = data;
        try {
            const user = await UserModel.getUserByName(username);
            if (!user) {
                throw createError(404, 'User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw createError(401, 'Incorrect password')
            }
            return user
        } catch(error) {
            throw error;
        }
    },

    loginGoogle: async(username, email, googleID) => {
        const user = await UserModel.getUserByName(username);
        if(!user) {
            const user = await UserModel.saveUser(username, email, googleID);
            const cart = await cartService.createCart({user_id: user.id})
            return user;
        }

        return user
    }
}