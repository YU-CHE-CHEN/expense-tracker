const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const mongoose = require('mongoose')


router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/edit', (req, res) => {
  return res.render('edit')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('detail', { record }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.body._id
  const { name, category, date, amount } = req.body
  return Record.create({ userId, name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.body._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router