require('dotenv').config()
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const {getUrlConnection} = require('./connection')

app.use(bodyparser.json())
app.use('/public/img', express.static('img'))

//Connect db
mongoose.connect(getUrlConnection, {useNewUrlParser: true, useUnifiedTopology: true})

//Route

app.listen(process.env.LISTEN_PORT|3000)
