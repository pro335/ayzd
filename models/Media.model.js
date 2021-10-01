var mongoose = require('mongoose');

var MediaSchema = new mongoose.Schema({
    name: {type: String, default: "general_avatar.png" },     // file name in the aws s3 bucket
    url: {type: String, default: "https://ayzd-storage.s3.us-east-2.amazonaws.com/general_avatar.png"}, // whole media url including aws link
    type: {type: Number, default: 0 },  // 0: image, 1: video, 2: other
    // relation: {type: Number, default: 0 },  // 0: user, 1: guide, 2: project Member, 4: liveNews, 5: main_image of project, 6: other medias of the project
});

var Media = mongoose.model('Media', MediaSchema);

module.exports = Media;
