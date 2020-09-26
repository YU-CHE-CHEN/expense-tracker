const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../Record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(
        Record.create(
          {
            name: '早餐',
            categoryName: 'fas fa-utensils',
            date: '2020-01-01',
            amount: '60',
            merchant: 'XXX restaurant',
            userId: userId
          },
          {
            name: '公車',
            categoryName: 'fas fa-shuttle-van',
            date: '2020-01-01',
            amount: '20',
            merchant: 'XXX 客運',
            userId: userId
          },
          {
            name: '電影',
            categoryName: 'fas fa-grin-beam',
            date: '2020-01-01',
            amount: '200',
            merchant: 'XX 影城',
            userId: userId
          },
          {
            name: '修馬桶',
            categoryName: 'fas fa-home',
            date: '2020-01-01',
            amount: '2000',
            merchant: 'XX 水電行',
            userId: userId
          },
        )
      )
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})