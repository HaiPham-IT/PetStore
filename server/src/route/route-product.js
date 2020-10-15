var route = require('express').Router()
var {createProduct} = require('../service/product-service')

route.post('/createProduct', createProduct)

module.exports = route