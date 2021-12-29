const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userDetailsObject = new Schema({
    firstName: {
        type: String,
        required: true,
        trim     : true
    },
    lastName: {
        type: String,
        trim     : true
    },
    email: {
        type     : String,
        required : true,
        maxlength: 50,
        trim     : true,
        match    : /^[_a-zA-Z0-9\-+]+(\.[_a-zA-Z0-9\-+]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[A-Za-z]{2,4})$/
    },
    password:{
        type: String,
        required:true,
        maxlength: 60,
        trim     : true
    },
    isDeleted:{
        type: Boolean,
        required:true,
        default: false,
        trim     : true
    },
    createdDate:{
        type: Date,
        required: true,
        trim     : true,
        default: Date.now()
    },
    deletedDate: {
        type: Date,
        trim     : true
    },
    invalid_login_counter: {
        type   : Number,
        default: 0
    },
    refresh_token_hash: {
        type: Array
    },
    reset_secret_code:{
        data: String,
        default: ""
    }
});

module.exports = mongoose.model("UserDetails", userDetailsObject)