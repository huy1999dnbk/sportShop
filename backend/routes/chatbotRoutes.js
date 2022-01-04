const express = require('express')
const { sendQuery, sendEvent } = require('../controllers/chatbotController')
const router = express.Router()

router.route('/df_text_query').post(sendQuery)
router.route('/df_event_query').post(sendEvent)
module.exports = router
