var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Config = require('../config/config');

var NewsfeedSourceSchema = new mongoose.Schema({
    link: {type: String, default: "" },     // Rss link
    project: {type: Schema.Types.ObjectId, ref: "Project", default: Config.fake_mongodb_id },
    keyword_list: {type: Array, default: [] },     // the list of the keywords
});

var NewsfeedSource = mongoose.model('NewsfeedSource', NewsfeedSourceSchema);

module.exports = NewsfeedSource;
