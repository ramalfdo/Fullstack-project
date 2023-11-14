const express = require('express')
const router = express.Router()

const create = require('./create')
const list = require('./list')
const details = require('./details')
const update = require('./update')
const deleteP = require('./delete')

router.post('/', create)
router.get('/', list)
router.get('/:id', details)
router.put('/:id', update)
router.delete('/:id', deleteP)



module.exports = router
