const express = require('express');
const bcrypt = require('bcrypt'); // se encarga de encriptar data
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
/**
 * el jwt hace refenrencia a un tipo de token
 */
const Usuario = require('../models/usuario');

const app = express();

/**
 * google config
 */

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }


    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
}
// verify().catch(console.error);





app.post('/google', async(req, res) => {
    let token = req.body.idtoken;
    let google_user = await verify(token)
        .catch(err => { //indicamos si el token a expirado, o hay problema con las credenciales
            return res.status(403).json({
                ok: false,
                err
            })
        })
        /**
         * si no entra en el catch significa que el usuario esta loggeado
         */
    Usuario.findOne({ email: google_user.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: err
            });
        }
        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Debe de usar su auntenticación normal'
                    }
                });
            } else {
                // se le renueva el token
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
            }
            return res.json({
                ok: true,
                usuario: usuarioDB,
                token
            })
        } else {
            // quiere decir que el usuario se esta autenticando por primera vez
            let user = new Usuario();

            user.nombre = google_user.nombre;
            user.email = google_user.email;
            user.img = google_user.img;
            user.google = google_user.google;
            user.password = ':)';
            /**
                       lo mando asi ya que quiero pasar la autenticacion
                       pero el password va a pasar por un hash de 10 vueltas
                       */
            user.save((err, usuarioDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: err
                    });
                }
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })

            })
        }
    })

});

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
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