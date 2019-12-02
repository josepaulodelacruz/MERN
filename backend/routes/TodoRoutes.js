const express = require('express')
const Joi = require('joi')
const router = express.Router()

const TodoRepository = require('../repository/TodoRepository')

//List
router.get('/', (req, res) => {
  TodoRepository.findAll().then((todo) => {
    res.status(200).send(todo)
  })
      .catch((err) => console.log(err))
})

//Create todo item
router.post('/', (req, res) => {
  const { error } = inputValidator(req.body)
  if( error ) {
    res.status(400).send(error.details[0].message)
    return
  }

  TodoRepository.create(req.body.name).then((todo) => {
    res.send(todo)
  })
      .catch(err => res.status(400).send(error.details[0].message))

})

//delete by id
router.delete('/:id', (req, res) => {
  const { id } = req.params
  console.log(req.params)
  TodoRepository.deleteById(id).then((todo) => {
    res.send(todo)
  })
      .catch(err => console.log(err))
})

//update database
router.put('/:id', (req, res) => {
  const { id } = req.params
  const todo = { name: req.body.name, isDone: req.body.isDone}
  TodoRepository.updateById(id, todo).then((todo) => {
    res.send(todo)
  })
      .catch(err => console.log(err))
})

function inputValidator(name) {
  const Schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(name, Schema)
}



module.exports = router
