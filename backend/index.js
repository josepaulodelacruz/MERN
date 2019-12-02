const express = require('express')
const app = express()

// Connection
app.get('/', (req, res) => {
    res.send('Connected to API')
})
//PORT
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
