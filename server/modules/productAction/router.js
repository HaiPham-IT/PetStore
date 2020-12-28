const express = require('express')
const router = express.Router()
const {createProduct, getAllProduct, updateProduct, deleteProduct} = require('./prodcut-crud')
const {checkTrademark} = require('../middleware/check-trademark-middle')

router.post('/', checkTrademark, createProduct)
        .get('/', getAllProduct)
        .put('/', checkTrademark, updateProduct)
        .delete('/:id', deleteProduct)


module.exports = router