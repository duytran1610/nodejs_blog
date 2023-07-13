const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    // static file
    app.use(express.static(path.join(__dirname, '..', 'public')));

    // Template engine
    app.engine('.hbs', handlebars.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: require('../helpers/handlebars')
    }));
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, '..', 'resourses/views'));
}