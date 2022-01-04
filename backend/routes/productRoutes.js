const express = require('express')
const { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts, getTrendProducts } = require('../controllers/productController')
const { admin, protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.get('/top',getTopProducts)
router.get('/trend', getTrendProducts)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)


module.exports = router
