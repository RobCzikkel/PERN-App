var express = require('express');
const process = require('process')
const user = require('../services/user');
var usersRouter = express.Router();

const userService = require('../services/user');

/* GET users listing. */
usersRouter.get('/', async(req,res, next) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json(result);
  } catch(err) {
    next(err)
  }
  
});
usersRouter.get('/:id', async(req,res,next) => {
  try {
    const result = await userService.getUserById(req.params);
    res.status(200).json(result);
  } catch(err) {
    next(err);
  }
});

usersRouter.put('/:id', async(req,res,next) => {
  try { 
    const id = req.params.id;
    const params = req.body;
    const result = await userService.updateUser(id,params);
    res.status(201).json(result);
  } catch(error) {
    res.status(404).send(error)
  }
});
usersRouter.delete('/:id', async(req,res,next) => {
  try {
    const result = await userService.deleteUser(req.params);
    res.status(201).json(result);
  } catch(error) {
    res.status(400).json(error);
  }
  
})

module.exports = usersRouter;
