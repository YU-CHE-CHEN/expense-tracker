const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/Record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

const app = express()
const PORT = 3000

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(Record => res.render('index', { Record }))
    .catch(err => console.error(err))
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.get('/records/edit', (req, res) => {
  return res.render('edit')
})

app.get('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('detail', { record }))
    .catch(error => console.log(error))
})

app.post('/records', (req, res) => {
  const userId = req.body._id
  const { name, category, date, amount } = req.body
  return Record.create({ userId, name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.delete('/records/:id', (req, res) => {
  const userId = req.body._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})