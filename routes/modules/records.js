const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/category')
const mongoose = require('mongoose')

//Add new
router.get('/new', (req, res) => {
  let categoryList = new Array()
  Category.find()
    .lean()
    .then(categories => {
      categoryList = categories.map(category => category.categoryName)
      res.render('new', { categoryList })
    })
    .catch(error => console.log(error))
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, Category, date, amount } = req.body
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})



router.get('/edit', (req, res) => {
  return res.render('edit')
})

router.post('/', (req, res) => {
  const userId = req.body._id
  const { name, categoryName, date, amount } = req.body
  return Record.create({ userId, name, categoryName, date, amount })
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

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const { name, categoryName, date, amount } = req.body
  return Record.findOne({ _id })
    .then(record => {
      record.name = name
      record.categoryName = categoryName
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/home'))
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