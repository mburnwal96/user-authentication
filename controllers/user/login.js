const bcrypt = require('bcrypt');
const UserModel = require('../../models/user')
var jwt = require('jsonwebtoken');

const userLogin = function(req, res){
    UserModel.findOne({email:req.body.email, isDeleted: false})
    .exec()
    .then((result)=>{
        if (!result) {
            res.status(401).json({
                message: "Login Failed."
            })
        }else{
            bcrypt.compare(req.body.password.toString(), result.password, (err, hashed) =>{
                if (err) {
                    res.status(401).json({
                        message: "Authentication Failed."
                    })
                }
                if (!hashed) {
                    res.status(401).json({
                        message: "Login Failed."
                    })
                }else{
                    let token = jwt.sign({ email: result.email, id:result._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                    let refresh_token = jwt.sign({ id:result._id }, process.env.JWT_REFRESH_TOKEN_KEY, { expiresIn: '7d' });
                    res.status(200).json({
                        message: "Login Successfull...",
                        Access_Token: token,
                        refresh_token: refresh_token
                    })
                }
            })
        }
    })
    .catch((err)=>{
        res.status(422).json({
            message: "Unable to login please try again."
        })
    })    
}

module.exports = { userLogin }