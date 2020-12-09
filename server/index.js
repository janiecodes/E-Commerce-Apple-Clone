require('dotenv').config();
const express = require('express');
const massive = require('massive');
const userCtrl = require('./userController.js')
const productCtrl = require('./productController.js')
const cartCtrl = require('./cartController.js')
const emailCtrl = require('./emailController.js')
const session = require('express-session');
const {checkUser} = require('./middleware')
const nodemailer = require("nodemailer");
const twilioCtrl= require('./twilioController.js')
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, SECRET_KEY, REACT_APP_PUB_KEY} = process.env;
const stripe = require('stripe')(SECRET_KEY);
const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db);
    console.log('Yahoo! Connected to db!')
}).catch( err => console.log(err));

//ENDPOINTS - USER
app.post('/auth/register', userCtrl.registerUser)
app.post('/auth/login', userCtrl.loginUser)
app.post('/auth/logout', userCtrl.logoutUser)
app.get('/auth/me', checkUser, userCtrl.getUser)

//ENDPOINTS - PRODUCT
app.get('/products', productCtrl.getAllProducts)
app.get('/product/:id', productCtrl.getOneProduct)

//ENDPOINTS - CART
app.get('/api/cart/me', checkUser, cartCtrl.getCartByUser)
app.put('/api/cart/product/:id', checkUser, cartCtrl.editProductInCart)
app.post('/api/cart/product/:id', checkUser, cartCtrl.addProductToCart)
app.delete('/api/cart/product/:id', checkUser, cartCtrl.deleteProductInCart)

//NODEMAILER
app.post('/api/email',emailCtrl.email)

//TWILIO
app.post('/api/sendSMS',twilioCtrl.sendSMS)

//STRIPE
app.post('/api/checkout', function(req, res, next) {
  let {price} = req.body;
const charge = stripe.charges.create({
amount: price, 
currency: 'usd',
source: req.body.token.id,
description: 'Test charge from react app'
}, function(err, charge) {
  if (err) {
    console.error(err);
    return res.sendStatus(500)
  }
  return res.sendStatus(200);
});
});

app.listen(SERVER_PORT, () => console.log(`Connected to port ${SERVER_PORT}`))