var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Config = require('../config/config');

var GuideSchema = new mongoose.Schema({
    title: {type: String, default: "" },    
    full_description: {type: String, default: "" },    
    media: {type: Schema.Types.ObjectId, ref: "Media", default: Config.fake_mongodb_id },
    created_time: {type: Date, default: Date.now },
});

var Guide = mongoose.model('Guide', GuideSchema);

module.exports = Guide;
