const express = require('express')
const { registerUser, loginUser, privateController } = require('../controller/authController')
const protect = require('../Middleware/authMiddleware')

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/private", protect, privateController)



module.exports = router