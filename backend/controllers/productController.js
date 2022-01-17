const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')
const Order = require('../model/orderModel')
const levenshtein = require('damerau-levenshtein')
const { resolve } = require('path');
const { rejects } = require('assert');
var stringSimilarity = require("string-similarity");

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }

})

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }

})

const getTopProducts = asyncHandler(async (req, res) => {
  const qty = Number(req.params.qty)
  const products = await Product.find({}).sort({ rating: -1 }).limit(qty)
  res.json(products)
})

const getTrendProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ countMention: -1 }).limit(4)
  res.json(products)
})

const getProductRecommmend = asyncHandler(async (req, res) => {
  const lastOrder = await (await Order.find({ user: req.user._id })).pop()
  const products = await Product.find({})
  // neu khach hang lan dau tien vao shop thi se goi y top 8 san pham co rating cao nhat
  if (!lastOrder) {
    const products = await Product.find({}).sort({ rating: -1 }).limit(8)
    return res.json(products)
  } else {
    let arrResultMeasure = []
    let arrDescProducts = []
    for (const element of lastOrder.orderItems) {
      let tmpResult = []
      const product = await Product.findById(element.product).select('description _id')
      products.forEach(item => {
        let lev = levenshtein(item.description,product.description)
        tmpResult.push({...item._doc,...lev})
      })
      tmpResult.sort((a,b) => b.similarity - a.similarity)
      tmpResult = tmpResult.slice(0,3)
      arrDescProducts = arrDescProducts.concat(tmpResult)
    }
    res.json(arrDescProducts)

  }
})

module.exports = {
  getProductRecommmend,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getTrendProducts
}

