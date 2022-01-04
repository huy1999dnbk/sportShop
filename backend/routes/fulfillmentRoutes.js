const express = require('express')
const { webHookDialogFlow } = require('../controllers/chatbotController')
const router = express.Router()

router.route('/').post(webHookDialogFlow)
module.exports = router
