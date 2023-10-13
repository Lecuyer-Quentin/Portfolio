const express = require('express');
const router = express.Router();
const registerCtrl = require('../../controllers/registerCtrl');

router.post('/', registerCtrl.handleNewUser);

module.exports = router;