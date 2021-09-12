const express = require('express')
const db = require('./config/db')
const models = require('./models/models')
const categoryQueries = require('./queries/categories')
const productQueries = require('./queries/products')
const storesQueries = require('./queries/stores')

app = express()

app.use(express.json())

app.use('/', require('./routes/marketplace'))

const port = 4000
const server = app.listen(port, async () => {
    console.log(`Server on! Port ${port}`)
})

module.exports = server