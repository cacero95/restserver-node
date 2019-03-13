require('./config/config'); // va ejecutar todo el codigo de ese file
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

app.use(require('../cruds/cruds')); // con esta linea indico que voy a usar las
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