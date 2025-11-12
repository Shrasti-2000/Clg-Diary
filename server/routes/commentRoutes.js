const express = require('express')
const { addComment, getComments } = require('../controller/commentController')
const protect = require('../Middleware/authMiddleware')


const router = express.Router({mergeParams : true})

router.post("/", protect, addComment)

router.get("/", getComments)


module.exports = router