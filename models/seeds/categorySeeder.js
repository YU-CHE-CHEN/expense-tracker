
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const db = require('../../config/mongoose')
const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他'].map(category => ({ categoryName: category }))
const categoryIcons = [
  '<i class="fas fa-home fa-2x"></i>',
  '<i class="fas fa-shuttle-van fa-2x"></i>',
  '<i class="fas fa-grin-beam fa-2x"></i>',
  '<i class="fas fa-utensils fa-2x"></i>',
  '<i class="fas fa-pen fa-2x"></i>'
]

categories.map(category => {
  category.categoryIcon = categoryIcons[categories.indexOf(category)]
})

db.once('open', () => {
  Category.insertMany(categories).then(() => {
    console.log('Categories are created')
    db.close()
  })
})