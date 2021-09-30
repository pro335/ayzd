var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Config = require('../config/config');

var LivefeedSchema = new mongoose.Schema({
    title: {type: String, default: "" },    
    description: {type: String, default: "" },    
    media: {type: String, default: "" },        // media url of cloud storage(not aws storage url)
    newsfeedSource: {type: Schema.Types.ObjectId, ref: "NewsfeedSource", default: Config.fake_mongodb_id },
    project: {type: Schema.Types.ObjectId, ref: "Project", default: Config.fake_mongodb_id },
    link: {type: String, default: "http://google.com" },
    tag: {type: Number, default: 0 },   // 0: none, 1: Bearish, 2: Bullish, 3: LMAO
    created_time: {type: Date, default: Date.now },
});

var Livefeed = mongoose.model('Livefeed', LivefeedSchema);

module.exports = Livefeed;
