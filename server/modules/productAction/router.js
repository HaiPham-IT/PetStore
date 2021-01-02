const express = require('express')
const router = express.Router()
const {createProduct, getAllProduct, updateProduct, deleteProduct} = require('./prodcut-crud')
const {checkTrademark} = require('../middleware/check-trademark-middle')
const {verify} = require('../auth')

router.post('/', verify, checkTrademark, createProduct)
        .get('/', getAllProduct)
        .put('/', verify, checkTrademark, updateProduct)
        .delete('/:id', verify, deleteProduct)


module.exports = router