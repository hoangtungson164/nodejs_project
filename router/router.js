var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var verifyToken = require('../service/verifyToken.js')

var AuthController = require('../controller/AuthController');
var ItemController = require('../controller/ItemController')

router.get('/items', verifyToken, ItemController.get);
router.get('/items/:id', verifyToken, ItemController.getById);
router.put('/items/:id', verifyToken, ItemController.updateItem);
router.post('/items', verifyToken, ItemController.createNewItem);
router.delete('/items/:id', verifyToken, ItemController.deleteItem);

router.get('/me', AuthController.getUser);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/logout', AuthController.logout);
router.get('/verify', AuthController.verify);

module.exports = router