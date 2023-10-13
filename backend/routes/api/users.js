const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/usersCtrl');

// const ROLES_LIST = require('../../config/roleList');
// const verifyRoles = require('../../middlewares/verifyRoles');
//! verifyRoles(ROLES_LIST.Admin) don't work
const verifyJWT = require('../../middlewares/verifyJWT');

router.route('/')
    .get(usersCtrl.getAllUsers)
    
router.route('/:id')
    .get(usersCtrl.getUserById)
    .put(verifyJWT, usersCtrl.updateUser)
    .delete(verifyJWT, usersCtrl.deleteUser)


module.exports = router;