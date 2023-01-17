var express = require('express')
var router = express.Router()
const clientController = require('../controllers/client')

router.get('/products', clientController.getProducts)
router.get('/customers', clientController.getCustomers)
router.get('/transactions', clientController.getTransactions)

module.exports = router