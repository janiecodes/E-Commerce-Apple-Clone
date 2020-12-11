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
app.use(express.static(`${__dirname}/../build`))
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
app.post('/api/checkout', async (req, res) => {  

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Apple',
          },
          unit_amount: 149800,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://198.211.106.205:3012/',
    cancel_url: 'http://198.211.106.205:3012/cancel',
  });

  res.json({ id: session.id });
});

//HOSTING
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT, () => console.log(`Connected to port ${SERVER_PORT}`))

