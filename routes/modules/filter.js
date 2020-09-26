const express = require('express')
const router = express.Router()
const helper = require('../../helper')
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  const filter = req.query.filter
  if (filter === 'ALL') {
    res.redirect('/')
  } else {
    Record.find({ categoryName: `${filter}` })
      .lean()
      .then(records => {
        let totalAmount = 0
        for (let i = 0; i < records.length; i++) {
          totalAmount += records[i].amount
        }
        res.render('index', { records, totalAmount, filter })
      })
      .catch(error => console.log(error))
  }

})

module.exports = router