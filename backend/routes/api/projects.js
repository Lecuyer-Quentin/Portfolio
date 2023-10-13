const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/projectsCtrl');
// const ROLES_LIST = require('../../config/roleList');
// const verifyRoles = require('../../middlewares/verifyRoles');
//! verifyRoles(ROLES_LIST.Admin) don't work
const verifyJWT = require('../../middlewares/verifyJWT');


router.route('/')
    .get(projectsCtrl.getAllProjects)
    .post(verifyJWT, projectsCtrl.createProject)// verifyJWT, 

router.route('/:id')
    .get(projectsCtrl.getProjectById)
    .put(verifyJWT, projectsCtrl.updateProject) // verifyJWT,
    .delete(verifyJWT, projectsCtrl.deleteProject);// verifyJWT,

module.exports = router;