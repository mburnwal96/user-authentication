const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data)=>{
            if (err) {
                throw new Error("Authentication Failed")
            }
            req.id = data.id
            req.email = data.email
            next()
        })
    } catch (error) {
        return res.status(403).json({
            message: "Authentication Failed"
        })
    }
}