var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Config = require('../config/config');

var ProjectSchema = new mongoose.Schema({
    name: {type: String, default: "" },
    category: {type: Schema.Types.ObjectId, ref: "Category", default: Config.fake_mongodb_id },
    chain: {type: Schema.Types.ObjectId, ref: "Chain", default: Config.fake_mongodb_id },
    small_description: {type: String, default: "" },
    full_description: {type: String, default: "" },
    btn_label: {type: String, default: "" },
    btn_url: {type: String, default: "" },
    main_image: {type: Schema.Types.ObjectId, ref: "Media", default: Config.fake_mongodb_id },
    secondary_image: {type: Schema.Types.ObjectId, ref: "Media", default: null },
    newsfeedSource_list: [{type: Schema.Types.ObjectId, ref: "NewsfeedSource"}],
    app_link: {type: String, default: "" },
    twitter_link: {type: String, default: "" },
    telegram_link: {type: String, default: "" },
    discord_link: {type: String, default: "" },
    similar_list: [{type: Schema.Types.ObjectId, ref: "Project"}],
    member_list: [{type: Schema.Types.ObjectId, ref: "Member"}],
    media_list: [{type: Schema.Types.ObjectId, ref: "Media"}],
    guide_list: [{type: Schema.Types.ObjectId, ref: "Guide"}],
    created_time: {type: Date, default: Date.now },
    slug: {type: String, default: "" },
    unique_id: {type: String, default: "" },
    isUpcoming: {type: Boolean, default: false },
    price: {type: String, default: "0$" },
    upcoming_date: {type: Date, default: null },
    mint_size: {type: Number, default: 0 },
    twitter_members: {type: Number},
    discord_members: {type: Number},
    score_team: {type: Number, default: 0},
    score_uniqueness: {type: Number, default: 0},
    score_community: {type: Number, default: 0},
    score_v_quality: {type: Number, default: 0},
    score_v_potential: {type: Number, default: 0},
    score_utility: {type: Number, default: 0},
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
