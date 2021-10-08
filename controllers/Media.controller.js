var mongoose = require('mongoose');
const Media = mongoose.model('Media');
const Project = mongoose.model('Project');
var utility = require('../utility');

exports.createMedia = async (req, res) =>  {
    let newMedia = new Media(req.body);

    newMedia.save(async (err) => {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while uploading new media."});
        } else {
            res.json({success: true, media: newMedia});
        }
    }); 
}

exports.allMedias = async (req, res) =>  {
    Media.find().exec(function(err, medias) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole medias."});
        } else {
            res.json({success: true, medias: medias});
        }
    })
}

exports.updateMedia = async (req, res) =>  {
    let media = null;
    let project = null;
    try {
        media = await Media.findOne()
            .where("_id").in([req.body._id])
            .exec();
        if(utility.isValid(media)) {
            // newsfeedSource.link = req.body.link;
            // newsfeedSource.project = req.body.project;
            // newsfeedSource.keyword_list = req.body.keyword_list;
            await media.save();
        }
        
        project = await Project.findById(req.body.project).populate({path: "category", select: ["_id", "name"] }).populate({path: "chain", select: ["_id", "name"] }).populate({path: "main_image", select: [ "_id", "name", "url", "type" ] }).populate({path: "secondary_image", select: [ "_id", "name", "url", "type" ] }).populate({path: "newsfeedSource_list", select: ["_id", "link", "project", "keyword_list"]}).populate({path: "media_list", select: [ "_id", "name", "url", "type" ] }).populate({path: "guide_list", populate: [{path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}, select: ["_id", "name", "avatar", "position", "facebook_link", "twitter_link", "dribbble_link", "instagram_link", "medium_link"] }).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    } catch(err) {
        return res.json({success: false, errMessage: "Unknown errors occurred while creating Newsfeed source."});
    }

    res.json({success: true, media: media, isExistingProject: utility.isValid(project), updated_project: project });
}

exports.deleteMedia = async (req, res) =>  {
    let id = req.params.id;
    Media.findByIdAndRemove(id, {
        new: true,
        useFindAndModify: false
    }, async function(err, media) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while deleting media."});
        } else {
            if (media !== null)
                res.json({success: true, media: media});
            else
                res.json({success: false, errMessage: "Media doesn't exist."});
        }
    })
}

exports.findAndGenerateFileName = async (req, res) =>  {
    let beforeFileName = req.params.name;
    let newFileName = beforeFileName, fileName = "", ext = "";
    let fileList = [];
    let isExist = true;     // true: file already exist, false: not exist

    fileList = await Media.find({name: newFileName});
    isExist = fileList.length >= 1 ? true : false;      
    if(isExist) {
        
        //Get file name
        fileName = newFileName.split('.')[0];

        //Get file's extension(if file name doesn't have extension, then create new extension 'ayzd' )
        ext = newFileName.split('.')[1] !== null && newFileName.split('.')[1] !== undefined ? newFileName.split('.')[1] : "ayzd";

        //Generage random number between 1 ~ 100000
        let nRandom = Math.floor(Math.random() * 100000) + 1;

        newFileName = `${fileName}_${nRandom}.${ext}`;
    }

    res.json({success: true, name: newFileName, isExist: isExist})
}
