const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const uploadCtrl = require('../../controllers/uploadCtrl');
const verifyJWT = require('../../middlewares/verifyJWT');


router.route('/')
    .get(uploadCtrl.getAllImages)


router.route('/:id')
    .post(verifyJWT, upload.array('images', 10), uploadCtrl.uploadImages)
    .post(verifyJWT, upload.single('images'), uploadCtrl.uploadImage)
    .delete(verifyJWT, uploadCtrl.deleteImage)
    .get(uploadCtrl.getImageById)
    .get(uploadCtrl.getImagesByProjectId)

module.exports = router;