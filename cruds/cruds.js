const express = require('express');
const bcrypt = require('bcrypt'); // se encarga de encriptar data
const app = express();

const _ = require('underscore');
/**
 * con esta libreria expandimos las funciones que se pueden hacer con js
 */
const Usuario = require('../models/usuario');
const { verifica_token } = require('../middlewares/autenticacion');

//               para madar varios middlewares
//               [verificar_token, 'nombre_segundo middle',etc.]
//                              ^
//                              |
app.get('/usuario', verifica_token, (req, res) => {
    /**
     * app.get(ruta, middleware, callback)
     */
    //return res.json({

    //    usuario: req.usuario,
    //    nombre: req.nombre,
    //    email: req.usuario.email
    //
    //})

    let limite = req.query.limite || 5;
    limite = Number(limite);
    let desde = req.query.desde || 0; // con req.query tomo los params que manda el usuario
    desde = Number(desde); // convierte el contenido a Number
    Usuario.find({ estado: true }, 'nombre role email estado google img')
        /**
         * si quisieramos mostrar un contenido especifico como el nombre
         * y el correo usariamos la sintaxis de esta manera
         * Usuario.find({},'nombre email')
         */
        /**
         * si quisieramos filtrar por algun campo ejemplo google
         * Usuario.find({google:true}, (err, conteo) => {
         */
        .skip(desde) // salta el numero indicado de registros
        .limit(limite) // indica el numero de registros que se desea
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                /**
                 * si quisieramos filtrar por algun campo ejemplo google
                 * Usuario.count({google:true}, (err, conteo) => {
                 */
                res.json({
                    ok: true,
                    usuarios,
                    numero_usuarios: conteo
                })
            })

        })
});

app.post('/usuario', (req, res) => {
    // cuando mandamos información por post se le llama payload
    let body = req.body; // este body va a aparecer cuando el body-parser
    // note un payload
    let user = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        /*
         *->
         *que crea un hash de una sola via con el password 
         *<-
         */
        role: body.role
    });
    user.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })




});

app.put('/usuario/:id', verifica_token, function(req, res) {

    if (req.usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            mensaje: 'No tienes permisos de actualizar datos'
        })
    }

    let id = req.params.id; // aqui tomo la variable que se esta mandando

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    /**
     * _.pick() es increible pero estoy usando el require underscore
     * y me funciona para indicarle que campos de la dba quiero usar
     */


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        /**
                encuentra el usuario y lo actualiza */

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        // console.log(usuarioDB);
        res.json({ // respondo con un JSON
            ok: true,
            usuario: usuarioDB
        })

    })


});
//                      para madar varios middlewares
//                      [verificar_token, 'nombre_segundo middle',etc.]
//                              ^
//                              |
app.delete('/usuario/:id', verifica_token, (req, res) => {

    if (req.usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            mensaje: 'No tienes permisos de borrar datos'
        })
    }

    let id = req.params.id;

    let changeStatus = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, changeStatus, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

/**
 * // esto seria si quisieramos elminar fisicamente el registro lo cual casi
 * nose hace
 * app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});
 * 
 */


module.exports = app;