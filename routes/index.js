const express = require('express')
const router = express.Router()

const records = require('./modules/records')
const home = require('./modules/home')
const filter = require('./modules/filter')

router.use('/records', records)
router.use('/', home)
router.use('/filter', filter)

module.exports = router