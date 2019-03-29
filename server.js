const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello Go2U!')
})

app.get('/test/', (req, res) => {
    res.send('Hello Test Go2U :)')
})

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})