const express = require('express')
const router = express.Router()

const clients = require('./clients')
const products = require('./products')
const orders = require('./orders')


router.use('/clients', clients)
router.use('/products', products)
router.use('/orders', orders)

module.exports = router
