const express = require('express');
const config = require('./config/init');

const mongoose = require('./config/mongoose')
// var bodyParser = require('body-parser')
const router = require('./routes');

const app = express();
const setupExpress = require('./config/express');

setupExpress(app);


mongoose(app)
app.use(router);

app.listen(config.PORT , ()=> {console.log(`Listenng on port ${config.PORT}`)})