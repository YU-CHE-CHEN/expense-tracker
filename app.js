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

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})