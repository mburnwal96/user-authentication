const bcrypt = require('bcrypt');
const UserModel = require('../../models/user')
const helper = require('../../helper/helper')

const createNewUser = async function(req, res){
    helper.isUserExist(req.body.email)
    .then((result)=>{
        if (result) {
            res.status(409).json({
                message: "User already exist."
            })
        } else {
            bcrypt.hash(req.body.password.toString(), 10, (err, hash) =>{
                if(err){
                    res.status(500).json({
                        error: err
                    })
                }else{
                    const user = new UserModel({
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        email : req.body.email,
                        password : hash.trim(),
                        isDeleted : false,
                    })
                    user.save()
                    .then((result)=>{
                        res.status(201).json({
                            message: "User has been successfully created"
                        })
                    }).catch((error)=>{
                        throw "Unable to create the user."
                    })
                }
            })
        }

    })
    .catch((err)=>{
        res.status(422).json({
            message: "Unable to create the user."
        })
    })
}

module.exports = {createNewUser}