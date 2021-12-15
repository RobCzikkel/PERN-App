 var express = require('express');
const { isHttpError } = require('http-errors');
var passport = require('passport');
var indexRouter = express.Router();

const userService = require('../services/user');
const cartService = require('../services/cart')

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

indexRouter.post('/register', async(req,res,next) => {
  try {
    const user = await userService.addUser(req.body);
    const cart = await cartService.createCart({user_id: user.id})

    req.login(user, function(err) {       // Passport login function to log user right after signup
      if (err) { return next(err); }
      return res.status(201).json(cart.id);
    });
    
  } catch(error) {
      next(error)
  }
});

indexRouter.post('/login',
  passport.authenticate('local'), 
  async(req,res,next) => {
    try {
      const user = await userService.login(req.body);
      const cart = await cartService.getCartForUser(user.id);
      res.status(200).json(cart.id);
    } catch(error) {
      next(error)
    }
  }
);

indexRouter.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/')
})


indexRouter.get('/authcheck', async(req, res, next) => {
    try{
      const response = await userService.getUserById(req.user.id);
      const cart = await cartService.getCartForUser(req.user.id);
      const user = {
        ...response,
        cart_id: cart.id
      }
      res.status(200).json(user)
    } catch(err) {
      next(err)
    }
})


indexRouter.get('/google', passport.authenticate('google', {
  scope: ['email','profile']
}));


indexRouter.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'https://localhost:3000/login',
  failureRedirect: 'https://localhost:3000/login'
}), (req,res) => {
  res.redirect('/');
})

module.exports = indexRouter;
