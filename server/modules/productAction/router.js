const express = require('express')
var router = new express.Router()
var {createProduct, getProducts, modifyProduct} = require('../service/product-service')
var {createTrademark} = require('../service/trademark-service')
var {createProductType} = require('../service/type-service')

router.post('/createProduct', createProduct)
        .get('/all', getProducts)
        .put('/modifyProduction', modifyProduct)
        .post('/type/createType', createProductType)
        .post('/trademark/createTrademark', createTrademark)

module.exports = route