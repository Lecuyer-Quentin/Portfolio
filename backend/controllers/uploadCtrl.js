const Image = require('../models/Image')
const Project = require('../models/Project')

const uploadImage = async (req, res) => {
    const { path, name } = req.file
    const projectId = req.params.projectId
    if (!path || !name || !projectId) return res.status(400).json({ 'message': 'Missing required fields' })
    try {
        const existingImage = await Image.findOne({ name: name, projectId: projectId }).exec()
        if (existingImage) return res.status(400).json({ 'message': 'Image already exists' })

        const image = new Image({
            path,
            name,
            createdAt: new Date().toISOString(),
            projectId,
        })
        const result = await image.save()
        res.status(201).json({ 'success': `Image ${name} created successfully` })
    } catch (err) {
        res.status(500).json({ 'message': `Erreur lors du téléchargement`, 'error': err.message })
    }
}
const uploadImages = async (req, res) => {
    const projectId = req.params.id
    const images = req.files.map(file => {
        return {
            path: file.path,
            name: file.filename,
            createdAt: new Date().toISOString(),
            projectId,
        }
    }
    )
    if (!images) return res.status(400).json({ 'message': 'Missing required fields' })
    try {
        // const existingImages = images.map(async image => await Image.findOne({ name: image.name, projectId: projectId }).exec())
        // if (existingImages) return res.status(400).json({ 'message': 'Image already exists' })

        const result = await Image.insertMany(images)
        res.status(201).json({ 'success': `Images created successfully` })
    } catch (err) {
        res.status(500).json({ 'message': `Erreur lors du téléchargement`, 'error': err.message })
    }
}



const deleteImage = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'No image id provided' })
    const image = await Image.findOne({ _id: req.params.id }).exec()
    if (!image) return res.status(204).json({ 'message': 'No image found' })
    try {
        await image.remove()
        res.status(200).json({ 'success': `Image ${image.name} deleted successfully` })
    } catch (err) {
        res.status(500).json({ 'message': `Erreur lors de la suppression`, 'error': err.message })
    }
}

const getAllImages = async (req, res) => {
    const images = await Image.find()
    if (!images) return res.status(204).json({ 'message': 'No images found' })
    try {
        res.json(images)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const getImageById = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'No image id provided' })
    const image = await Image.findOne({ _id: req.params.id }).exec()
    if (!image) return res.status(204).json({ 'message': 'No image found' })
    try {
        res.status(200).json(image)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const getImagesByProjectId = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'No project id provided' })
    const images = await Image.find({ projectId: req.params.id }).exec()
    if (!images) return res.status(204).json({ 'message': 'No images found' })
    try {
        res.status(200).json(images)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = {
    uploadImage,
    uploadImages,
    deleteImage,
    getAllImages,
    getImageById,
    getImagesByProjectId,
}