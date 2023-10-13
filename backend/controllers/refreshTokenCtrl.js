const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    // check if refresh token is provided
    if (!cookies?.jtw) return res.sendStatus(401)
    const refreshToken = cookies.jtw
    // check if refresh token is valid
    const checkUser = await User.findOne({ refreshToken }).exec()
    if (!checkUser) return res.sendStatus(403)
    // check if refresh token is expired
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || decoded.username !== checkUser.username) return res.sendStatus(403)

        const roles = Object.values(checkUser.roles)
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
                expiresIn: '1h'
            }
        )
        res.json({ accessToken })
    }
    )
}
module.exports = { handleRefreshToken }