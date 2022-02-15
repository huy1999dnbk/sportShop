const path = require('path')
const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const morgan = require('morgan')

const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const app = express()

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(express.json())

dotenv.config()

connectDB()



app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/upload', require('./routes/uploadRoutes'))

app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(path.resolve(), '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html')))
} else {
  app.get('/',(req,res) => {
    res.send('API IS RUNNING......')
  })
}



app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
  console.log(`This server is running on ${process.env.NODE_ENV} mode at port ${PORT}`)
})