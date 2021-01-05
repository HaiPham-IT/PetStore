const config = require('./config')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./modules/swagger/docs.json')
const mongoose = require('mongoose')
const dbInfo = require('./connection')

app.use(bodyparser.json())
app.use(cors())
app.use('/public/img', express.static('img'))

//swagger
app.use('/rest-api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Connect db
mongoose.connect(dbInfo.getUrlConnection(), {useNewUrlParser: true, useUnifiedTopology: true})

//Route
app.use('/api/v1/user', require('./modules/User').router)
app.use('/api/v1/product', require('./modules/productAction').router)
app.use('/api/v1/trademark', require('./modules/trademarkAction').router)
app.use('/api/v2', require('./modules/auth').verify)

//error handle
app.use((err, req, res, next) => {
    console.log('handle error')
    return res.status(err.statusCode||500).json({message: err.message})
})

//listen port
app.listen(config.port.http || 3000, ()=> {
    console.log(`Listen in port ${config.port.http || 3000}`)
})
