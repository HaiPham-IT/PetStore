const express = require('express')
const router = express.Router()
const {createUser} = require('./user-crud')

router.post('/', createUser)
        .post('/login', require('../auth').login)

module.exports = router