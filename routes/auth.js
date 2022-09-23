/*
 Rutas para auth // Auth Routes
 host + /api/auth
*/

const { Router } = require('express');
const route = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');

//* POST
route.post('/new', createUser);
route.post('/', loginUser);

//*GET
route.get('/renew', renewToken);

module.exports = route;