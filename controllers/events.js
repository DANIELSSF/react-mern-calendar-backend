
const { response } = require('express');
const Events = require('../models/Events');


const getEvents = async (req, res = response) => {

    const events = await Events.find().populate('user', 'name');

    if (events.length == 0) {
        return res.status(200).json({
            ok: false,
            msg: 'No hay eventos',
        });
    }

    res.status(200).json({
        ok: true,
        events,
    });

}

const createEvent = async (req, res = response) => {

    const evento = new Events(req.body);

    try {
        evento.user = req.uid;

        const saveEvent = await evento.save();

        res.status(201).json({
            ok: true,
            event: saveEvent,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el admin',
        })
    }

}

const updateEvent = async (req = response, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Events.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe con ese id',
            })
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para editar este evento',
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const updatedEvent = await Events.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: updatedEvent,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        })
    }
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Events.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un ningún evento con ese ID',
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'NO tienes permisos suficientes para modificar el evento',
            });
        }

         await Events.findByIdAndDelete(eventId);

        res.json({ ok: true,});


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el admin',
        });
    }


}


module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent,
}