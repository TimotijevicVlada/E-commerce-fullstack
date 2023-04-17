const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];  // ["Beared", "token key"]  -> treba nam drugi item u ovom nizu
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(401).json("Token is not valid!")
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401).json("You are not authenticated!")
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin
}