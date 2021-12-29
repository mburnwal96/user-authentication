const bcrypt = require('bcrypt');
const UserModel = require('../../models/user')
var jwt = require('jsonwebtoken');

const changePassword = function(req, res){
    try {
        let userObj 
        if (req.body.new_password !== req.body.confirm_password) {
            throw new Error("New password does not mathed with confirm password")
        }
        UserModel.findOne({ _id: req.id, email: req.email})
        .exec()
        .then((result)=>{
            userObj = result
            return bcrypt.compare(req.body.old_password.toString(), result.password)
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

module.exports = { changePassword }

/*
UserModel.findOneAndUpdate({ _id: req.id, email: req.email }, {}, {returnOriginal: false})
    .exec()
    .then((result)=>{
*/