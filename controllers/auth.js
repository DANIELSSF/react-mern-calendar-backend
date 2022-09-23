const { response } = require('express');

const createUser = (req, res = response) => {

    const { email, name, password } = req.body;

    if (name.length < 5) {
        return res.status(400).json({
            ok: false,
            msg: 'Name debe ser mayor a 5 caracteres',
        });
    }

    res.json({
        ok: true,
        msg: 'Crear usuario',
        email,
        name,
        password,
    });

}

const loginUser = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Login del usuario',
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
