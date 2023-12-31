const Project = require('../models/Project')

const getAllProjects = async (req, res) => {
    const projects = await Project.find()
    if (!projects) return res.status(204).json({ 'message': 'No projects found' })
    try {
        res.json(projects)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}
const getProjectById = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'No project id provided' })
    const project = await Project.findOne({ _id: req.params.id }).exec()
    if (!project) return res.status(204).json({ 'message': 'No project found' })
    try {
        res.status(200).json( project )
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const createProject = async (req, res) => {
    const { title, description, owner, technologies, link } = req.body
    console.log(req.body)
    if (!title || !description || !owner) return res.status(400).json({ 'message': 'Missing required fields' })
    try {
        const existingProject = await Project.findOne({ title: title }).exec()
        if (existingProject) return res.status(400).json({ 'message': 'Project already exists' })

        const project = new Project({
            title,
            description,
            owner,
            technologies,
            link,
            createdAt: new Date().toISOString(),
        })
        const result = await project.save()
        res.status(201).json({ 'success': `Project ${title} created successfully`, 'project': result, 'id': result._id })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const updateProject = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'No project id provided' })
    const { title, description, owner, images, technologies, link } = req.body
    const project = await Project.findOne({ _id: req.params.id }).exec()
    if (!project) return res.status(204).json({ 'message': 'No project found' })

    if (req.body?.title) return project.name = title
    if (req.body?.description) return project.description = description
    if (req.body?.owner) return project.owner = owner
    if (req.body?.images) return project.images = images
    if (req.body?.technologies) return project.technologies = technologies
    if (req.body?.link) return project.link = link
    
    try {
        const result = await project.save()
        res.status(200).json({ 'success': `Project ${title} updated successfully` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const deleteProject = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'No project id provided' })
    const project = await Project.findOne({ _id: req.params.id }).exec()
    if (!project) return res.status(204).json({ 'message': 'No project found' })
    try {
        const result = await project.deleteOne({ _id: req.params.id })
        res.status(200).json({ 'success': `Project ${project.name} deleted successfully` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { 
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}