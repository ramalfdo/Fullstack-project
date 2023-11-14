const express = require('express')
const router = express.Router()

const create = require('./create')
const list = require('./list')


router.post('/', create)
router.get('/', list)




module.exports = router
