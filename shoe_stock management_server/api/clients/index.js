const express = require('express')
const router = express.Router()

const register = require('./register_client')
const login = require('./login')
const list = require('./list')

router.post('/register', register)
router.post('/login', login)
router.get('/', list)


module.exports = router