const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // Check if authorization header is present
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // Check if authorization header is in the correct format
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    // Check if authorization header contains a valid token
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.username = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )

}

module.exports = verifyJWT;