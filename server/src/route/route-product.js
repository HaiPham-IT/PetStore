var route = require('express').Router()
var {createProduct, getProducts, modifyProduct} = require('../service/product-service')
var {createProductType} = require('../service/type-service')

route.post('/createProduct', createProduct)
        .get('/all', getProducts)
        .put('/modifyProduction', modifyProduct)
        .post('/type/createType', createProductType)

module.exports = route