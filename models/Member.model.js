var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Config = require('../config/config');

var MemberSchema = new mongoose.Schema({
    name: {type: String, default: "" },
    avatar: {type: Schema.Types.ObjectId, ref: "Media", default: Config.fake_mongodb_id },
    position: {type: String, default: "" },
    facebook_link: {type: String, default: "" },
    twitter_link: {type: String, default: "" },
    dribbble_link: {type: String, default: "" },
    instagram_link: {type: String, default: "" },
    medium_link: {type: String, default: "" },
});

var Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
