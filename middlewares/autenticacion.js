/**
 *  Verifica Token
 */

const jwt = require('jsonwebtoken');

let verifica_token = (req, res, next) => {
    let token = req.get('Authorization'); // nombre del header que quiero recivir

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        /**
         * verifica si el token es valido osea tiene firma, header, and payload
         */
        if (err) {
            return res.status(401).json({ /// error de autorizacion
                ok: false,
                err
            })
        }
        // decoded hace referencia al payload
        req.usuario = decoded.Usuario;
        /**
               aqui puedo saber que usuario esta haciendo la peticion
                */

        /**
         * con este req.usuario habilito toda la informacion que se esta mandando
         * del usuario, y lo puedo ver en cualquier parte que se use
         * verifica_token osea este metodo
         */
        next();
    });

};
module.exports = {

    verifica_token

}