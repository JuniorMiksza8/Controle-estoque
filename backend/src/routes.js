const express = require('express');

const routes = express.Router();

const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const entryController = require('./controllers/entryController');
const movimentController = require('./controllers/movimentController');
const sessionController = require('./controllers/sessionController');

routes.post('/produto',productController.create);

routes.delete('/produto/:id',productController.delete);

routes.get('/produto',productController.index);

routes.get('/produto/:id',productController.read);

routes.post('/usuario',userController.create);

routes.post('/entrada/:id',entryController.create);

routes.get('/entrada',entryController.index);

routes.post('/movimento/:produto',movimentController.create);

routes.get('/movimento',movimentController.index);

routes.post('/movimento/retorno/:id',movimentController.return);

routes.post('/sessao',sessionController.login);

module.exports = routes;