const express = require('express')
// const router = require('./authRoutes')
const { getEvents, getEvent } = require('../controller/eventController')

const router = express.Router()

router.get("/", getEvents)

router.get("/:eid", getEvent)

router.use("/:eid/comment", require("./commentRoutes"))

module.exports = router