var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var ObjectId = mongoose.Schema.ObjectId;

var loggedIn = require('../middleware/loggedIn');

module.exports = function (app) {

    app.get('/post/create', loggedIn, function (req, res) {
        res.render('post/create.jade');
    })

    app.post('/post/create', loggedIn, function (req, res, next) {

        var post = {
            author : req.session.user,
            title: req.param('title'),
            body: req.param('body')
        };
        Post.create(post, function (err, post) {
            if (err) {
                if (err instanceof mongoose.Error.ValidationError) {
                    console.log("invalid post");
                }
                return next(err);
            }
            return res.redirect('/post/'+ post.id)
        })
    })

    app.get("/post/:id", function (req, res, next) {
        var id = req.param('id');
        var query = Post.findById(id);
        query.exec(function (err, post) {
            if (err) return next(err);

            if (!post) return next();

            res.render('post/view.jade', {post: post});
        })
    })

    // EDIT POST

    app.get("/post/edit/:id", loggedIn, function (req, res, next) {
        res.render('post/edit.jade', {
            post: Post.findById(req.param('id'))
        }); 
    })

    app.post("/post/edit/:id", loggedIn, function (req, res, next) {
        // Custom method for our Schema
        Post.edit(req, function (err) {
            if (err) return next(err);
            res.redirect("/post/" + req.param('id'));
        })
    })

    // DELETE
    app.get("/post/delete/:id", loggedIn, function (req, res, next) {
        var id = req.param('id');
        Post.findOne({_id: id}, function (err, post) {
            if (err) return next(err);

            post.remove(function (err) {
                if (err) return next(err);
                res.redirect("/");
            })
        })
    });

    // ADD COMMENT
    app.post("/post/comment/:id", loggedIn, function (req, res, next) {
        var id = req.param('id');
        Post.findOne({_id: id}, function (err, post) {
            if (err) return next(err);

            post.comments.push({
                author: req.session.user,
                title: req.param('title'),
                text: req.param('text')
            });

            post.save();
        });
        res.redirect("/post/"+ id);
    });
    
}