const express = require('express')
const { getProducts, addProduct, getProduct, updateProduct } = require('../controller/productController')
const protect = require('../Middleware/authMiddleware')



const router = express.Router()

router.get("/", getProducts)

router.post("/", protect , addProduct)

router.get("/:id", getProduct)

router.put("/:id",  protect , updateProduct)
 
module.exports = router