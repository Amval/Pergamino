var mongoose = require('mongoose');

var Comments = new mongoose.Schema({
    author: String,
    text: String,
});

var post = new mongoose.Schema({
    author: String,
    title: String,
    body: String,
    comments : [Comments],
    date: { type: Date, default: Date.now}
});


post.statics.edit = function (req, callback) {
  var id = req.param('id');
  var author = req.session.user;

  // validate current user authored this blogpost
  var query = { _id: id, author: author };

  var update = {};
  update.title = req.param('title');
  update.body = req.param('body');

  this.update(query, update, function (err, numAffected) {
    if (err) return callback(err);

    if (0 === numAffected) {
      return callback(new Error('no post to modify'));
    }

    callback();
  })
}   

module.exports = mongoose.model('Post', post);
