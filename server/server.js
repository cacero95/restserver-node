/**
 * Si quire ver la documentacion en postman
 * ir a https://documenter.getpostman.com/view/1071570/S17m1rdm
 */


require('./config/config'); // va ejecutar todo el codigo de ese file
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
/**
 * const path = require('path'); me permite adecuar el path de la aplicacion
 * para poder hallar cualquier contenido en nuestro proyecto
 */
/**
 * cuando en la aplicacion se vea un .use() significa que estamos
 * llamando un middleware que funciona para ejecutarse siempre que
 * pase por esa parte el proyecto
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// con estos metodos preparo el proyecto a recivir JSON
// parse application/json
app.use(bodyParser.json());
/*
corps policy
*/

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/**
 * Google credentials
 * client-id
 * 660910679754-7tgt311r4fd02nmubaj439bmo8ou36jl.apps.googleusercontent.com
 * client-secret
 * FgckiOl6zf8sjKYnkEAGyWya
 */
/**
 * habiltar la carpeta public para meter el html
 */
app.use(express.static(path.resolve(__dirname, '../public')));
//console.log(path.resolve(__dirname + '../public'));


/**
 * configuracion de las rutas para crud
 */
app.use(require('../cruds/index')); // con esta linea indico que voy a usar las
// peticiones que cruds/cruds


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        // se llama para saber si se pudo hacer la coneccion
        if (err) throw err;
        console.log('data base online');
    });


app.listen(process.env.PORT, () => {
    console.log('escuchando puerto:', 3000);
})
