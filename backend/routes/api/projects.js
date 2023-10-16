const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/projectsCtrl');
// const multer = require('../../config/multer');
const upload = require('../../config/multer');
// const ROLES_LIST = require('../../config/roleList');
// const verifyRoles = require('../../middlewares/verifyRoles');
//! verifyRoles(ROLES_LIST.Admin) don't work
const verifyJWT = require('../../middlewares/verifyJWT');


router.route('/')
    .get(projectsCtrl.getAllProjects)
    .post(verifyJWT, upload.array('images', 10), projectsCtrl.createProject);

router.route('/:id')
    .get(projectsCtrl.getProjectById)
    .put(verifyJWT, projectsCtrl.updateProject) // verifyJWT,
    .delete(verifyJWT, projectsCtrl.deleteProject);// verifyJWT,

module.exports = router;