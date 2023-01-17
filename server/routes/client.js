var express = require('express')
var router = express.Router()
const clientController = require('../controllers/client')

router.get('/products', clientController.getProducts)

module.exports = router