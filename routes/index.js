const express = require('express')
const router = express.Router()

const records = require('./modules/records')
const home = require('./modules/home')
const filter = require('./modules/filter')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/records', authenticator, records)
router.use('/filter', authenticator, filter)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router