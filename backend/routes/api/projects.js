const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/projectsCtrl');
// const upload = require('../../config/multer');
// const uploadCtrl = require('../../controllers/uploadCtrl');
const verifyJWT = require('../../middlewares/verifyJWT');

const multer = require('multer');

const parse = multer();


router.route('/')
    .get(projectsCtrl.getAllProjects)
    .post(verifyJWT, parse.none(), projectsCtrl.createProject)

router.route('/:id')
    .get(projectsCtrl.getProjectById)
    .put(verifyJWT, projectsCtrl.updateProject)
    .delete(verifyJWT, projectsCtrl.deleteProject)
    // .post(verifyJWT, upload.array('images', 10), uploadCtrl.uploadImages);


module.exports = router;