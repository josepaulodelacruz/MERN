const Todo = require('../models/Todo')

class TodoRepository {
  constructor(model) {
    this.model = model
  }

  //findAll data
  findAll() {
    return this.model.find()
  }

  create(name) {
    const todo = {
      name: name,
      isDone: false
    }
    const createTodo = new this.model(todo)

    return createTodo.save()
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id)
  }

  updateById(id, object) {
    const query = { _id: id }
    return this.model.findOneAndUpdate(query, {
      $set: {
        name: object.name,
        isDone: object.isDone
      }
    })
  }

}

module.exports = new TodoRepository(Todo)
