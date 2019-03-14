const express = require('express');
const app = express();

app.use(require('./cruds')); // con esta linea indico que voy a usar las
// peticiones que cruds/cruds

app.use(require('./login'));

module.exports = app;