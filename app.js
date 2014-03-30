// Dependencies
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');


require('express-mongoose');

var models = require('./models');
var middleware = require('./middleware');
var routes = require('./routes');



mongoose.connect('mongodb://localhost/app', function (err) {
    if (err) throw err;
    console.log('Connected to mongodb://localhost');

    var app = express();
    app.use(express.static(path.join(__dirname, 'public')));

    middleware(app);
    routes(app);

    app.listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
})



