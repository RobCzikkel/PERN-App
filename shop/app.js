var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');  // session is required if we want authentication
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session')

const swaggerUi = require('swagger-ui-express');  // for loading swagger UI
const yaml = require('js-yaml');    // for loading yaml files
const fs = require('fs');

// Routes
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/product')
const cartsRouter = require('./routes/cart')
const ordersRouter = require('./routes/order')
// const swaggerRouter = require('./routes/swagger')
require('./services/passportService')
var app = express();



const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, './swagger.yml'), 'utf8'));


 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "https://localhost:3000",
  methods:'GET,POST,PUT,DELETE',
  credentials: true
}))

// app.use(session({
//   secret: 'anything',
//   cookie: {
//     maxAge: 5*24*60*60*1000,
//     path: '/'
//   }}));  // needed for Passport.js
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: ['bambambam']
}))
app.use(passport.initialize());            // passport functions
app.use(passport.session());




// Index endpoints
app.use('/', indexRouter)
// Users endpoints
app.use('/users', usersRouter);
// Products endpoints
app.use('/products', productsRouter);
// Carts endpoints
app.use('/cart', cartsRouter);
// Orders endpoint
app.use('/orders', ordersRouter);
// Swagger docs
app.use(
  '/docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
  res.render('error');
});

module.exports = app;
