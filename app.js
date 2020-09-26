const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/Record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
const session = require('express-session')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const dotenv = require("dotenv");
dotenv.config();

const routes = require('./routes')

const app = express()
const PORT = 3000

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})