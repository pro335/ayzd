var mongoose = require('mongoose');

var ChainSchema = new mongoose.Schema({
    name: {type: String, default: "" },
});

var Chain = mongoose.model('Chain', ChainSchema);

module.exports = Chain;
