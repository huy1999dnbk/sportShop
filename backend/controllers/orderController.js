const asyncHandler = require('express-async-handler')

const Order = require('../model/orderModel') 
const Product = require('../model/productModel')
const addOrderItems = asyncHandler(async(req,res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user:req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    const createdOrder = await order.save()
    const handleNumberProductRemain = async() => {
      for(const product of orderItems){
        const prod = await Product.findById(product.product)
        prod.countInStock = prod.countInStock - product.qty
        await prod.save()
      }
    } 
    handleNumberProductRemain()
    res.status(201).json(createdOrder)
  }
})


const getOrderById = asyncHandler(async(req,res) => {
 const order = await Order.findById(req.params.id).populate('user','name email')
 if(order) {
   res.json(order)
 }else{
   res.status(404)
   throw new Error('Order not found')
 }
})


const updateOrderToPaid = asyncHandler(async(req,res) => {
 const order = await Order.findById(req.params.id)
 
 if(order) {
  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    id:req.body.id,
    status:req.body.status,
    currency:req.body.currency,
    email_address:req.body.email_address
  }
  const updatedOrder = await order.save()
  res.json(updatedOrder)
 } else {
  res.status(404)
  throw new Error('Order not found')
 }
})


const getMyOrders = asyncHandler(async(req,res) => {
  const orders = await Order.find({user:req.user._id})
  res.json(orders)
})


const getOrders = asyncHandler(async(req,res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const count = await Order.countDocuments({})
  const orders = await Order.find({}).populate('user', 'id name').limit(pageSize).skip(pageSize * (page - 1))
  res.json({orders,page,pages:Math.ceil(count/pageSize)})
})

const getAllOrders = asyncHandler(async(req,res) => {
  const orders = await Order.find({})
  res.json(orders)
})


const updateOrderToDelivered = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id)
  
  if(order) {
   order.isDelivered = true
   order.deliveredAt = Date.now()

   const updatedOrder = await order.save()
   res.json(updatedOrder)
  } else {
   res.status(404)
   throw new Error('Order not found')
  }
 })

module.exports = {
  addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered,getAllOrders
}
