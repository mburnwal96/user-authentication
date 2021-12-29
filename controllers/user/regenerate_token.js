const jwt = require('jsonwebtoken')
const UserModel = require('../../models/user')

const regenrateToken = function(req, res){
    let refresh_token = req.body.refresh_token
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_KEY)
    if (decoded) {
        UserModel.findOne({ _id:decoded.id })
        .exec()
        .then((result)=>{
            const token = jwt.sign({ email: result.email, id:decoded.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({
                message: "Access Token Generated Successfully...",
                access_token: token
            })
        })
        .catch((err) =>{
            res.status(404).json({
                message: "User Unauthenticated..."
            })
        })
    }
}

module.exports = { regenrateToken }