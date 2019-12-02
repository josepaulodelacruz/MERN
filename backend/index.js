const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const Todo = require('./routes/TodoRoutes')

//Connection to mongo db
const configs = require('./config')
const mongoose = require('mongoose')
mongoose.connect(configs.DB)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err))

//Middleware
app.use(cors())
app.use(morgan('dev'))

//json
app.use(express.json())

// Connection
app.get('/', (req, res) => {
    res.send('Connected to API')
})

//Routes
app.use('/api/todos', Todo)




//PORT
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
