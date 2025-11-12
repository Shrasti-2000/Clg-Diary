const express = require('express')
const router = require('./authRoutes')
const { sendMessage, getMessages } = require('../controller/messageController')
const protect = require('../Middleware/authMiddleware')

const route = express.Router()

router.get("/", protect, getMessages), 
router.post("/:pid", protect, sendMessage)


module.exports = router 