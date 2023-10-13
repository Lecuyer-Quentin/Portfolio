const User = require('../models/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { username, password } = req.body
    // check if username and password are provided
    if (!username || !password) {
        res.status(400).json({ 'message': "Username and password are required" })
        // return
    }
    // check if username already exists
    const duplicateUser = await User.findOne({ username: username }).exec()
    if (duplicateUser) return res.status(409).json({ 'message': "Username already exists" })
        
    
    // hash password and create new user
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await User.create({
            'username': username,
            'password': hashedPassword
        })
        res.status(201).json({ 'success': `User ${username} created successfully` })

    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}
module.exports = { handleNewUser }