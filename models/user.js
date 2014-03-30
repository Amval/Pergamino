var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id: {type: String}, // email as id
    name: {type: String},
    salt: {type: String, required: true},
    hash: {type: String, required: true},
    role: {type: String},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', schema);