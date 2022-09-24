const { response } = require('express');
const Usuario = require('../models/Usuario');

const createUser = async (req, res = response) => {
    // const { email, name, password } = req.body;

    try {
        const usuario = new Usuario(req.body);

        await usuario.save();

        return res.status(201).json({
            ok: true,
            msg: 'Crear usuario',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador',
        })

    }
}

const loginUser = (req, res = response) => {
    const { email, password } = req.body;

    return res.status(201).json({
        ok: true,
        msg: 'Login del usuario',
        email,
        password
    });

}

const renewToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Revalidar Token',
    });

}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}
