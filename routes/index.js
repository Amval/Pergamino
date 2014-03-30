var errors = require('./errors');
var login = require('./login');
var post = require('./post');
var admin = require('./admin');

var mongoose = require('mongoose');
var BlogPost = mongoose.model('Post');


module.exports = function (app) {

    app.get('/', function (req, res) {
        BlogPost.find().exec(function (err, posts) {
            if (err) return next(err);
            console.log(post)
            if (req.session.isLoggedIn) {
                res.render('index.jade', { posts: posts, user: req.session.user })
            }
            else {
                res.render('index.jade', { posts: posts })
            }
        })
    });

    // Authentication routes
    login(app);

    // Admin panel
    admin(app);

    // Post CRUD operations
    post(app);

    //error handlers
    errors(app);
} 