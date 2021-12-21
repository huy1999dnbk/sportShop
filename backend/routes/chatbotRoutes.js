import express from "express";
import { sendQuery,sendEvent } from "../controllers/chatbotController.js";
const router = express.Router()

router.route('/df_text_query').post(sendQuery)
router.route('/df_event_query').post(sendEvent)

export default router