const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const index = require('./routes/index')
const user = require('./routes/users')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/user');

app.use('/',index)
app.use("/user",user)

module.exports = app
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })