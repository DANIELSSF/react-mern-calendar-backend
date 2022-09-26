
const { response } = require('express');


const getEvents = (req, res = response) => {

    return res.status(200).json({
        ok: true,
        msg: 'getEvents',
    });

}

const createEvent = (req, res = response) => {

    console.log(req.body);

    return res.status(200).json({
        ok: true,
        msg: 'createEvents',
    });
}

const updateEvent = async (req = response, res = response) => {

    return res.status(200).json({
        ok: true,
        msg: 'updateEvents',
    });
}

const deleteEvent = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'deleteEvents',
    });
}


module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent,
}