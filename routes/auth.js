/*
 Rutas para auth // Auth Routes
 host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { createUser, loginUser, renewToken } = require('../controllers/auth');

const route = Router();


//* POST
route.post(
    '/new',
    [   //* Middelwares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({ min: 6 }),
        //! Middelwares
        validateFields,
    ],
    createUser
);


route.post(
    '/',
    [ //* Middelware
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
        //! Middelwares
        validateFields,
    ],
    loginUser
);

//*GET
route.get('/renew', renewToken);

module.exports = route;