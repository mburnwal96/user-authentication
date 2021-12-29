const bcrypt = require('bcrypt');
const UserModel = require('../../models/user')
var jwt = require('jsonwebtoken');

const forgotPassword = function(req, res){
    try {
        let userObj 
        if (!req.body.email) {
            throw new Error("Please enter valid email id.")
        }
        // validate email if given email is present or not in db
        UserModel.findOne({ email: req.body.email })
        .exec()
        .then((result)=>{
            // generate reset_password token to send in email to reset password
            return jwt.sign({ email: result.email, id:result._id }, process.env.JWT_SECRET_KEY, { expiresIn: '900s' });
        })
        .then((result) => {
            if (!result) {
                throw new Error("Please enter your valid old password")
            }
            return bcrypt.hash(req.body.new_password.toString(), 10) //req.body.new_password
        })
        .then((hashedPwd) =>{
            console.log(hashedPwd)
            if (hashedPwd) {
                userObj.password = hashedPwd
                userObj.save()
                return res.status(200).json({
                    message: "Password changed Successfully..."
                })
            }
        })
        .catch((err)=>{

        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }    
}

module.exports = { forgotPassword }
