
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];

        const result = req.roles.map(role => {
            return rolesArray.includes(role);
        });

        if (result.includes(true)) {
            next();
        } else {
            res.sendStatus(401);
        }
    }
}
module.exports = verifyRoles;