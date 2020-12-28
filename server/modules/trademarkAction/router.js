const express = require('express')
const router = express.Router()
const {createTrademark, deleteTrademark} = require('./trademark-crud')

router.post('/', createTrademark)
        .delete('/:name', deleteTrademark)


module.exports = router