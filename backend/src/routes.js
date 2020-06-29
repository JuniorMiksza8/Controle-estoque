const express = require('express');
const multer = require('multer');
const routes = express.Router();
const multerConfig = require('./multer');

const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const entryController = require('./controllers/entryController');
const movimentController = require('./controllers/movimentController');
const sessionController = require('./controllers/sessionController');

routes.post('/produto',productController.create);

routes.delete('/produto/:id',productController.delete);

routes.get('/produto',productController.index);

routes.get('/produto/:id',productController.read);

routes.post('/usuario',multer(multerConfig).single('file'),userController.create);

routes.post('/usuario/image',multer(multerConfig).single('file'),userController.createImage);

routes.post('/entrada/:id',entryController.create);

routes.get('/entrada',entryController.index);

routes.post('/movimento/:produto',movimentController.create);

routes.get('/movimento',movimentController.index);

routes.post('/movimento/retorno/:id',movimentController.return);

routes.post('/sessao',sessionController.login);

module.exports = routes;