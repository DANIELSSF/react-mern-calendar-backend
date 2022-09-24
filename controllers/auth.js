const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        //! Encontrar un email repetido en la base de datos
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado',
            });
        }
        //! Fin de buscar el email repetido

        //* Crear registro en la DB
        usuario = new Usuario(req.body);

        //* Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //* Guardar registro en la DB
        await usuario.save();

        //* Crear token JWT
        const token = await generateJWT(usuario.uid, usuario.name);

        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador',
        })
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o password incorrectos',
            });
        }

        //* Confirmar password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password o email incorrectos',
            });
        }

        //* Crear token JWT
        const token = await generateJWT(usuario.uid, usuario.name);

        return res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador',
        })
    }



}

const renewToken = async (req, res = response) => {
    const { uid, name } = req;

    //generar un nuevo token
    const token = await generateJWT(uid, name);


    res.json({
        ok: true,
        token,
    });

}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}
