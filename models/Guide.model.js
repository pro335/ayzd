var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Config = require('../config/config');

var GuideSchema = new mongoose.Schema({
    title: {type: String, default: "" },    
    full_description: {type: String, default: "" },    
    is_video_guide: {type: Boolean, default: false },
    media_video: {type: Schema.Types.ObjectId, ref: "Media", default: Config.fake_mongodb_id },
    media_image: {type: Schema.Types.ObjectId, ref: "Media", default: Config.fake_mongodb_id },
    project: {type: Schema.Types.ObjectId, ref: "Project", default: Config.fake_mongodb_id },
});

var Guide = mongoose.model('Guide', GuideSchema);

module.exports = Guide;
