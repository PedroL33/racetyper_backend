const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkAuth(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, process.env.JWTSECRETKEY)
        next();
    } catch(err) {
        res.status(500).json({
            error: "Authorization failed."
        })
    }
}

module.exports = {
    checkAuth
}
