var express = require('express');
var app = express();
var cors = require('cors')
var AuthController = require('../controller/AuthController');
var router = require('../router/router.js')

app.use(cors());
app.use('/', router);

module.exports = app;