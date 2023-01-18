var express = require('express')
var router = express.Router()
const salesController = require('../controllers/sales')

router.get('/sales', salesController.getSales)

module.exports = router