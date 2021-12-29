var express = require('express');
const createNewUser = require('../controllers/user/create_new_user')
const login = require('../controllers/user/login')
const checkAuth = require('../midleware/validateAuthToken')
const regenrateToken = require('../controllers/user/regenerate_token')
const changePassword = require('../controllers/user/change_password')
var app = express.Router();


app.post("/register", async function(req,res){
    await createNewUser.createNewUser(req, res)
})

app.post("/login", async function(req,res){
    await login.userLogin(req, res)
})

app.post("/forgot_password", async function(req,res){
})

app.post("/change_password", checkAuth, async function(req,res){
    await changePassword.changePassword(req, res)
})

app.get("/test", checkAuth, async function(req,res){
    console.log(req.headers)
    return res.status(200).json({
            message: "test..."
    })
})

app.post("/regenerate_token", async function(req,res){
    await regenrateToken.regenrateToken(req, res)
})

module.exports = app;

