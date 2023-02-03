const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const avaliacaoController = require('./src/controllers/avaliacaoController');
const middlewares = require('./src/middlewares/middleware');

route.get('/', homeController.paginaInicial);
route.post('/ano', homeController.selecionaAno);
route.post('/avaliacao', middlewares.avaliacao, avaliacaoController.pagina);
route.post('/avaliacao/iniciada', avaliacaoController.iniciada);
route.get('/avaliacao/iniciada', middlewares.verificaSessao, avaliacaoController.iniciada);
route.post('/correcao', middlewares.verificaSessao, avaliacaoController.iniciada);
route.get('/correcao', middlewares.verificaSessao, avaliacaoController.iniciada);





module.exports = route;
