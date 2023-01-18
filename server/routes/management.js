var express = require('express')
var router = express.Router()
const adminController = require('../controllers/management')

router.get('/admins', adminController.getAdmins)
router.get("/performance/:id", adminController.getUserPerformance)

module.exports = router