const User = require('../models/User')
const Project = require('../models/Project')


const getAllUsers = async (req, res) => {
    const users = await User.find().exec()
    if (!users?.length) return res.status(204).json({ 'message': 'No users found' })
    try {
        res.json(users)
        console.log(users)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const getUserById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).exec()
    if (!user) return res.status(204).json({ 'message': 'No user found' })
    try {
        res.json(user)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const updateUser = async (req, res) => {
    const { id, username, password, roles } = req.body
    if (!id) return res.status(400).json({ 'message': 'No user id provided' })

    const checkUser = await User.findOne({ _id: id }).exec()
    if (!checkUser) return res.status(204).json({ 'message': 'No user found' })

    //! don't work
    const duplicate = await User.findOne({ username: username }).lean().exec()
    if (duplicate && duplicate._id.toString() != id) return res.status(409).json({ 'message': 'Username already exists' })
    //! don't work
    
    if (username) checkUser.username = username
    if (roles) checkUser.roles = roles

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        checkUser.password = hashedPassword
    }
    const result = await checkUser.save()
    res.json({ 'success': `User ${username} updated successfully` })
}

const deleteUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).exec()
    if (!user) return res.status(204).json({ 'message': 'No user found' })
    const projects = await Project.find({ owner: user.username }).exec()
    if (projects?.length) return res.status(409).json({ 'message': 'Cannot delete user with projects' })
    try {
        const result = await user.deleteOne(_id = req.params.id)
        res.json({ 'success': `User ${user.username} deleted successfully` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}


module.exports = { 
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}