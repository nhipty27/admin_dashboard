var express = require('express')
var router = express.Router()
const userController = require('../controllers/general')

router.get('/user/:id', userController.getUser)

module.exports = router