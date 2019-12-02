const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  isDone: Boolean
})

const Todo = mongoose.model('Item', todoSchema)

module.exports = Todo
