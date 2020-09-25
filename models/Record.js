const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: false
  },
  categoryIcon: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Record', RecordSchema)