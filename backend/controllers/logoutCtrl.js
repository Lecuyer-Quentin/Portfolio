const User = require('../models/User')

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jtw) return res.sendStatus(204)
    const refreshToken = cookies.jtw

// check if refresh token is in database
    const checkUser = await User.findOne({ refreshToken }).exec()
    if (!checkUser) {
        res.clearCookie('jtw', { httpOnly: true, sameSite: 'none', secure: true })
        return res.sendStatus(204)
    }
// delete refresh token from database
    checkUser.refreshToken = undefined
    const result = await checkUser.save()

// clear refresh token cookie   
    res.clearCookie('jtw', { httpOnly: true, sameSite: 'none', secure: true })
    res.sendStatus(204)
}

module.exports = { handleLogout }