module.exports = function (app) {
    
    //404s
    app.use(function (req, res, next) {
        res.status(404);

        if (req.accepts('html')) {
            return res.render('404.jade')
        }
        if (req.accepts('json')) {
            return res.json({error: 'Not Found'})
        }
    })

    app.use(function (err, req, res, next) {
        console.error('error at %s/n', req.url, err);
        res.send(500, "Something went wrong")
    })

}