const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Records = require('./models/Record')


const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongoose connected!')
})

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(Records => res.render('index', { Records }))
    .catch(err => console.error(err))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})