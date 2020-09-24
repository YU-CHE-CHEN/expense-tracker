const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  totalAmount: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Record', RecordSchema)