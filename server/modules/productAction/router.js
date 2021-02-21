const express = require('express')
const router = express.Router()
const {createProduct, getAllProduct, updateProduct, deleteProduct} = require('./prodcut-crud')
// const {checkTrademark} = require('../middleware/check-trademark-middle')
const {verify} = require('../auth')

router.post('/', verify, require('./create-product').createProduct)
        .get('/', require('./search-product').searchProduct)
        .put('/', verify, require('./modify-product').modifyProduct)
        .delete('/:id', verify, require('./delete-product').deleteProduct)


module.exports = router