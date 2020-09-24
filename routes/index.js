const express = require('express')
const router = express.Router()

const records = require('./modules/records')

router.use('/records', records)

module.exports = router