var mongoose = require('mongoose');
const Guide = mongoose.model('Guide');

exports.createGuide = async (req, res) =>  {
    let newGuide = new Guide(req.body);

    newGuide.save(async (err) => {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while uploading new guide."});
        } else {
            res.json({success: true, guide: newGuide});
        }
    }); 
}

exports.allGuides = async (req, res) =>  {
    Guide.find().populate({path: "media_video", select: ['name', 'url']}).populate({path: "media_image", select: ['name', 'url']}).populate({path: "project", select: ['name', 'main_image'], populate: {path: "main_image", select: ["name", "url"]} })
    .exec(function(err, guides) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole guides."});
        } else {
            res.json({success: true, guides: guides});
        }
    })
}

exports.updateGuide = async (req, res) =>  {
    Guide.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        url: req.body.url,
    }, {
        new: true,
        useFindAndModify: false
    }, async function(err, guide) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while updating guide."});
        } else {
            if (guide !== null)
                res.json({success: true, guide: guide});
            else
                res.json({success: false, errMessage: "Guide doesn't exist."});
        }
    })
}

exports.deleteGuide = async (req, res) =>  {
    let id = req.params.id;
    Guide.findByIdAndRemove(id, {
        new: true,
        useFindAndModify: false
    }, async function(err, guide) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while deleting guide."});
        } else {
            if (guide !== null)
                res.json({success: true, guide: guide});
            else
                res.json({success: false, errMessage: "Guide doesn't exist."});
        }
    })
}
