const express = require('express')
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered,getAllOrders } = require('../controllers/orderController')
const { protect, admin } = require('../middleware/authMiddleware')
const router = express.Router()


router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/allorders').get(protect,admin,getAllOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)

module.exports = router
