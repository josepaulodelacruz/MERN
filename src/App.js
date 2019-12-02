import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap'
import axios from 'axios'
import Modal from './components/Modal'
import './App.css'
const BASE_URL = 'http://localhost:4000/api/todos'

class App extends Component {
  state = {
    newTodo: '',
    todos: [],
    isShown: false,
    updateItem: {}
  }

  componentDidMount () {
    axios.get(BASE_URL)
        .then((res) => {
          console.log(res.data)
          this.setState({todos: res.data})
        })
        .catch(err => console.log(err))
  }

  handleAddItem = () => {
    axios.post(BASE_URL, {
      name: this.state.newTodo
    })
        .then((res) => {
          axios.get(BASE_URL).then((res) => this.setState({todos: res.data}, () => this.setState({ newTodo: ''})))
        })
        .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({newTodo: e.target.value})
  }

  handleDelete= async (_id) => {
    axios.delete(`http://localhost:4000/api/todos/${_id}`)
        .then(res => {
          axios.get(BASE_URL).then(res => this.setState({todos: res.data}))
        })
        .catch(err => console.log(err))
  }

  handleUpdate= (todo) => {
    this.setState(state => ({
      isShown: !state.isShown,
      updateItem: todo
    }))
  }

  handleModalClose = (close) => {
    this.setState({ isShown: close })

  }

  render(){
    return(
      <div className={'App-header'}>
        <h1>Todo List</h1>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Enter Todo Item</Label>
            <div className="form-input">
              <Input placeholder={'Enter anything'} value={this.state.newTodo} onChange={this.handleChange}/>
              <Button onClick={() => this.handleAddItem()} style={{marginLeft: 10}} color={'success'}>Add</Button>
            </div>
          </FormGroup>
        </Form>
        <div>
          <ul>
            { this.state.todos.map(todo => (
                <Row key={todo._id}>
                  <Col xs="6">
                    <h4 style={{marginRight: 20}}>{todo.name}</h4>
                  </Col>
                  <Col xs="3">
                    <div className="buttons">
                      <Button onClick={() => this.handleDelete(todo._id)} color={'danger'}>Delete</Button>
                      <Button onClick={() => this.handleUpdate(todo)} color={'primary'}>Udpate</Button>
                    </div>
                  </Col>
                </Row>
            ))}
          </ul>
        </div>
        { <Modal isShown={this.state.isShown} updateItem={this.state.updateItem} closeModal={(modal) => this.handleModalClose(modal)}/> }
      </div>
    )
  }
}

export default App
