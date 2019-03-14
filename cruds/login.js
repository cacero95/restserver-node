const express = require('express');
const bcrypt = require('bcrypt'); // se encarga de encriptar data
const jwt = require('jsonwebtoken');
/**
 * el jwt hace refenrencia a un tipo de token
 */
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'No se encontro el usuariO en la base de datos'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            /**
             * contrasta el password digitado con el que tiene la base de datos segun el correo
             * arroja true is success, other way false
             */
            return res.status(400).json({
                ok: false,
                mensaje: {
                    mensaje: 'No se encontro el usuariO en la base de datos'
                }
            });

        }
        let token = jwt.sign({
            Usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        /**
               * ese expired lee el parametro de la siguiente manera
               segundos, minutos, horas, dias en this case 30 days
               */
        res.json({
            ok: true,
            Usuario: usuarioDB,
            token
        });
    });



});


module.exports = app;