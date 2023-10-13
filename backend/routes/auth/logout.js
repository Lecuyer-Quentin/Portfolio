const express = require('express')
const router = express.Router()
const logoutCtrl = require('../../controllers/logoutCtrl')

router.get('/', logoutCtrl.handleLogout)

module.exports = router