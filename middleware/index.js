var express = require('express');
var http = require('http');
var path = require('path');

module.exports = function (app){
    // Port and config options
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    // Establishing sessions
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'building a blog' }));
    app.use(express.bodyParser());

    app.use(function (req, res, next) {
        res.locals.session = req.session;
        next();
    })  
}