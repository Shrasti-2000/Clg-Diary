const express = require('express')
const { getAllUsers, updateUsers, addEvent, updateEvent, updateProduct, getAllComment } = require('../controller/adminController')
const adminProtect = require('../Middleware/adminMiddleware')

const router = express.Router()

router.get("/users", adminProtect, getAllUsers)

router.put("/users/:uid", adminProtect, updateUsers)

router.post("/event",adminProtect, addEvent)

router.put("/event/:eid", adminProtect, updateEvent)

router.put("/product/:pid", adminProtect, updateProduct)

router.get("/comment/:eid",adminProtect, getAllComment)





module.exports = router