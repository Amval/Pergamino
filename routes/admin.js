var mongoose = require('mongoose');

var isAdmin = require('../middleware/isAdmin');


module.exports = function (app) {
    app.get("/admin", isAdmin, function (req, res, next ) {
        return res.render("admin.jade")
    })    
}
