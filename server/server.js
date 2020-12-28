require('dotenv').config()
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dbInfo = require('./connection')

app.use(bodyparser.json())
app.use('/public/img', express.static('img'))

//Connect db
// console.log(dbInfo.getUrlConnection())
mongoose.connect(dbInfo.getUrlConnection(), {useNewUrlParser: true, useUnifiedTopology: true})

//Route
app.use('/api/v1/product', require('./modules/productAction').router)
app.use('/api/v1/trademark', require('./modules/trademarkAction').router)

//error handle
app.use((err, req, res, next) => res.status(err.statusCode||500).json({message: err.message}))

//listen port
app.listen(process.env.LISTEN_PORT||3000, ()=> {
    console.log(`Listen in port ${process.env.LISTEN_PORT|3000}`)
})
