const express = require('express')
const { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts, getTrendProducts,getProductRecommmend,addMentionProduct,setDefaultMention } = require('../controllers/productController')
const { admin, protect } = require('../middleware/authMiddleware')

const router = express.Router()


router.route('/recommendproduct').get(protect,getProductRecommmend)
router.route('/').get(getProducts).post(protect,admin,createProduct).put(setDefaultMention)
router.route('/:id/reviews').post(protect,createProductReview)
router.get('/trend', getTrendProducts)
router.get('/top/:qty',getTopProducts)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct).post(addMentionProduct)


module.exports = router
