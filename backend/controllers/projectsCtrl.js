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
        res.json(project)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}


const createProject = async (req, res) => {
    const project = JSON.parse(req.body.project)

    console.log("project CreateProject", project)
    console.log("req.files CreateProject", req.files)
    console.log("req.body.project CreateProject", req.body.project)

    delete project._id
    // delete project._userId

    const newProject = new Project({
        name: project.name,
        description: project.description,
        owner: project.owner,
        images: [
            {
                url: req.files[0].path,
                alt: req.files[0].filename
            }
        ],
        technologies: project.technologies,
        link: project.link,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
    })

    try {
        const result = await newProject.save()
        res.status(201).json({ 'success': `Project ${project.name} created successfully` })
    } catch (err) {
        res.status(400).json({ 'message': err.message })
    }
 }




// const createProject = async (req, res) => {
//     const { name, description, owner, link, images:[], technologies:[], createdAt, updatedAt } = req.body
//     // const { name, description, owner, link, createdAt, updatedAt } = req.body
//     if (!name || !description) return res.status(400).json({ 'message': 'Missing required fields' })
    
//     const project = new Project({
//         name: name,
//         description: description,
//         owner: owner,
//         images: [
//             {
//                 url: '',
//                 alt: ''
//             },
//         ],
//         technologies: [
//             {
//                 name: ''
//             },
//         ],
//         link: link,
//         createdAt: createdAt,
//         updatedAt: updatedAt
//     })
//     try {
//         const result = await project.save()
//         res.status(201).json({ 'success': `Project ${name} created successfully` })
//     } catch (err) {
//         res.status(500).json({ 'message': err.message })
//     }
// }

// const createProject = async (req, res) => {
//     if (!req?.body?.formData) return res.status(400).json({ 'message': 'No project data provided' })
//     new Project({
//         formData: {
//             name: name,
//             description: description,
//             owner: owner,
//             images: images,
//             technologies: technologies,
//             link: link,
//             createdAt: createdAt,
//             updatedAt: updatedAt
//         }
//     }).save((err) => {
//         if (err) return res.status(500).json({ 'message': err.message })
//         res.status(201).json({ 'success': `Project ${name} created successfully` })
//     })
// }

// const createProject = async (req, res) => {
//     if (!req?.body?.formData) return res.status(400).json({ 'message': 'No project data provided' })
//     const { name, description, owner, images, technologies, link, createdAt, updatedAt } = req.body.formData
//     if (!name || !description) return res.status(400).json({ 'message': 'Missing required fields' })
//     const project = new Project({
//         name: name,
//         description: description,
//         owner: owner,
//         images: images,
//         technologies: technologies,
//         link: link,
//         createdAt: createdAt,
//         updatedAt: updatedAt
//     })
//     try {
//         const result = await project.save()
//         res.status(201).json({ 'success': `Project ${name} created successfully` })
//     } catch (err) {
//         res.status(500).json({ 'message': err.message })
//     }
// }

const updateProject = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'No project id provided' })
    const { name, description, owner, images, technologies, link } = req.body
    // if (!name || !description || !owner ) return res.status(400).json({ 'message': 'Missing required fields' })
    const project = await Project.findOne({ _id: req.params.id }).exec()
    if (!project) return res.status(204).json({ 'message': 'No project found' })

    if (req.body?.name) return project.name = name
    if (req.body?.description) return project.description = description
    if (req.body?.owner) return project.owner = owner
    if (req.body?.images) return project.images = images
    if (req.body?.technologies) return project.technologies = technologies
    if (req.body?.link) return project.link = link
    
    try {
        const result = await project.save()
        res.status(200).json({ 'success': `Project ${name} updated successfully` })
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