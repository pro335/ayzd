var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: {type: String, default: "" },
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
