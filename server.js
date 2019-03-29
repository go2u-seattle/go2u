const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello Go2U!')
})

app.listen(3000, () => {
    console.log('Listening on Port 3000')
    console.log('adding to test git')
    console.log('this will test pr')
})