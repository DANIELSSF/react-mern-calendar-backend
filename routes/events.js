/*
    Rutas para events // Events Routes
    host+/api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validateJWT');
const { isDate } = require('../helpers/isDate');

const route = Router();

//* Todos tienen que pasar por la validación del token
route.use(validateJWT);

//* GET
route.get('/', getEvents);

//* POST
route.post(
    '/',
    [
        check('title', 'El titulo es obliagtorio').not().isEmpty(),
        check('start', 'El evento debe tener una fecha de inicio').custom(isDate),
        check('end', 'El evento debe tener una fecha de finalización').custom(isDate),
        validateFields
    ],
    createEvent);

//* PUT
route.put(
    '/:id',
    [
        check('title', 'El titulo es obliagtorio').not().isEmpty(),
        check('start', 'El evento debe tener una fecha de inicio').custom(isDate),
        check('end', 'El evento debe tener una fecha de finalización').custom(isDate),
        validateFields
    ],
    updateEvent);

//* DELETE
route.delete('/:id', deleteEvent);


module.exports = route;
