require('./config/config'); // va ejecutar todo el codigo de ese file
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/**
 * cuando en la aplicacion se vea un .use() significa que estamos 
 * llamando un middleware que funciona para ejecutarse siempre que
 * pase por esa parte el proyecto
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {

    res.json('get usuario')
});

app.post('/usuario', function(req, res) {
    // cuando mandamos información por post se le llama payload
    let body = req.body; // este body va a aparecer cuando el body-parser
    // note un payload
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'falta el nombre del usuario'
        });
    } else {
        res.json({
            persona: body
        });
    }



});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id; // aqui tomo la variable que se esta mandando

    res.json({ // aqui indico que uiero que retorne cualquier cosa que mande el usuario
        id
    })
});
app.delete('/usuario', function(req, res) {

    res.json('delete usuario')
});

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto:', 3000);
})