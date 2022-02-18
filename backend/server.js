const path = require('path')
const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const morgan = require('morgan')
var cors = require('cors')
const { v4: uuidv4 } = require('uuid');

const stripe = require('stripe')('sk_test_51KU0KNHzr2aPULLHGeblYVb4jr06VbHcVRQ4pkzaXXM1NgdNXaIeklml5fVKfGGzFt62oLHopz3l9PCS04FFFVIm00LBj13rIA');

const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const Product = require('./model/productModel')
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())

dotenv.config()

connectDB()


app.post('/payment', async (req, res) => {
  const { token,
    totalPrice } = req.body
  const idempontencyKey = uuidv4()
  return stripe.customers.create({
    email:token.email,
    source:token.id
  }).then(customer => {
    return stripe.charges.create({
      amount: Math.ceil(totalPrice),
      currency: 'usd',
      customer:customer.id,
    },{idempotencyKey: idempontencyKey})
  }).then(result => {
    res.status(200).json(result)
  }).catch(err => console.log(err))
});
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))


app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API IS RUNNING......')
  })
}



app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`This server is running on ${process.env.NODE_ENV} mode at port ${PORT}`)
})