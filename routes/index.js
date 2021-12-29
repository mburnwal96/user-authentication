const express = require('express');
const greetings = require('../controllers/greetings/greetings')
const app = express.Router();

app.get('/greetings', greetings)

module.exports = app;