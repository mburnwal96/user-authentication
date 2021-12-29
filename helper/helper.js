const UserModel = require('../models/user')

const isUserExist = async function(email){
    const result = await UserModel.find({email:email})
    if (result.length >0) {
        return true
    }else{
        return false
    }
}

module.exports = { isUserExist }