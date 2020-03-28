const express = require('express');
const ongControle = require('./controller/OngController');
const incidentsControle = require('./controller/incidentsController');
const profileControle = require('./controller/ProfileController');
const SessionControle = require('./controller/SessionController');

const routes = express.Router();


routes.post('/session', SessionControle.create);

// rotas das ongs
routes.get('/ongs', ongControle.index);
routes.post('/ongs',  ongControle.create);

routes.post('/incidents',  incidentsControle.create);
routes.get('/incidents',  incidentsControle.index);
routes.delete('/incidents/:id',  incidentsControle.delete);

routes.get('/profile', profileControle.index);

module.exports = routes;


