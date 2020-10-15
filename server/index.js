require('dotenv').config()
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dbInfo = require('./connection')

app.use(bodyparser.json())
app.use('/public/img', express.static('img'))

const routeProduct = require('./src/route/route-product')

//Connect db
// console.log(dbInfo.getUrlConnection())
mongoose.connect(dbInfo.getUrlConnection(), {useNewUrlParser: true, useUnifiedTopology: true})

//Route
app.use('/product', routeProduct)
//listen port
app.listen(process.env.LISTEN_PORT|3000, ()=> {
    console.log(`Listen in port ${process.env.LISTEN_PORT|3000}`)
})
