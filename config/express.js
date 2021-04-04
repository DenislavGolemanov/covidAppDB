const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')


function setupExpress(app) {

    app.use(express.json({ extended: false }));

    app.engine("hbs" , handlebars({extname: 'hbs'}))

    app.set('view engine' , "hbs");

    app.use(express.static('static'))

    app.use(express.urlencoded({extended: true}))

    app.use(cookieParser())


    app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        next();
    });
}

module.exports = setupExpress;