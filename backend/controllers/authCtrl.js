const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
// check if username and password are provided
    if (!username || !password) {
        res.status(400).json({ 'message': "Username and password are required" })
        return
    }

//check if user exists
    const checkUser = await User.findOne({ username: username }).exec()
    if (!checkUser) return res.status(401).json({ 'message': "Username or password incorrect" })
    
// check if password is correct
    try {
        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if (!checkPassword) return res.status(401).json({ 'message': "Username or password incorrect" })
        
        // check if user has roles
        const roles = Object.values(checkUser.roles)

        // generate access token and refresh token
        const accessToken = jwt.sign(
            {
                "UserInfo": 
                {
                    "username": checkUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '24h'
            }
        )
        const refreshToken = jwt.sign(
            { "username": checkUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '7d'
            }
        )
        // save refresh token in database
        checkUser.refreshToken = refreshToken
        // save user
        const result = await checkUser.save()
        // send access token and refresh token to client in cookies
        res.cookie('jtw', refreshToken, { httpOnly: true, sameSite: 'none', secure: true })
        // send access token, roles and username to client in json
        res.json({ accessToken: accessToken, roles: roles, username: result.username, refreshToken: refreshToken, _id: result._id })
        
    }
    catch (err) {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }
     