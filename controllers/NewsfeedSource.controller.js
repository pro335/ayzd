// var mongoose = require('mongoose');
const NewsfeedSource = require('../models/NewsfeedSource.model');
const Project = require('../models/Project.model');
const Livefeed = require('../models/Livefeed.model');
var livefeed = require("../controllers/Livefeed.controller");
var utility = require('../utility');

exports.createNewsfeedSource = async (req, res) =>  {
    let newsfeedSource = new NewsfeedSource(req.body);
    let project = null;
    try {
        await NewsfeedSource.insertMany(newsfeedSource);
        project = await Project.findOne()
            .where("_id").in([newsfeedSource.project])
            .exec();
        if(utility.isValid(project)) {
            let temp_newsfeedSource_list = project.newsfeedSource_list;
            temp_newsfeedSource_list.push(newsfeedSource._id);
            project.newsfeedSource_list = temp_newsfeedSource_list;
            await project.save();
        }
        
        project = await Project.findById(req.body.project).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: {path: "media"}}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    } catch(err) {
        console.log(err)
        return res.json({success: false, errMessage: "Unknown errors occurred while creating Newsfeed source."});
    }

    let livefeeds = await livefeed.generateLivefeeds(newsfeedSource);
    if(utility.isValid(livefeeds)) {
        await Livefeed.insertMany(livefeeds);
    }
    
    livefeeds = await Livefeed.find({newsfeedSource: newsfeedSource._id}).sort([['created_time', -1]]).populate({path: "project", populate: {path: "main_image"}});


    res.json({success: true, newsfeedSource: newsfeedSource, livefeeds: livefeeds, isExistingProject: utility.isValid(project), updated_project: project });
}

exports.allNewsfeedSources = async (req, res) =>  {
    NewsfeedSource.find().populate("project").exec(function(err, newsfeedSources) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole Newsfeed sources."});
        } else {
            res.json({success: true, newsfeedSources: newsfeedSources});
        }
    })
}

exports.updateNewsfeedSource = async (req, res) =>  {
    let newsfeedSource = null;
    let project = null;
    try {
        newsfeedSource = await NewsfeedSource.findOne()
            .where("_id").in([req.body._id])
            .exec();
        if(utility.isValid(newsfeedSource)) {
            newsfeedSource.link = req.body.link;
            newsfeedSource.project = req.body.project;
            newsfeedSource.keyword_list = req.body.keyword_list;
            await newsfeedSource.save();
        }
        
        project = await Project.findById(req.body.project).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: {path: "media"}}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
        newsfeedSource = await NewsfeedSource.findById(req.body._id).populate("project");
    } catch(err) {
        return res.json({success: false, errMessage: "Unknown errors occurred while updating Newsfeed source."});
    }

    //Remove livefeeds by old newsfeedSource id
    await Livefeed.remove({newsfeedSource: newsfeedSource._id});

    let livefeeds = await livefeed.generateLivefeeds(newsfeedSource);
    if(utility.isValid(livefeeds)) {
        await Livefeed.insertMany(livefeeds);
    }
    
    livefeeds = await Livefeed.find().sort([['created_time', -1]]).populate({path: "project", populate: {path: "main_image"}});

    res.json({success: true, newsfeedSource: newsfeedSource, livefeeds: livefeeds, isExistingProject: utility.isValid(project), updated_project: project });

}

exports.deleteNewsfeedSource = async (req, res) =>  {
    let id = req.params.id;
    NewsfeedSource.findByIdAndRemove(id, {
        new: true,
        useFindAndModify: false
    }, async function(err, newsfeedSource) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while deleting newsfeedSource."});
        } else {
            if (newsfeedSource !== null) {
                let project = await Project.findById(newsfeedSource.project).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: {path: "media"}}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
                res.json({success: true, newsfeedSource: newsfeedSource, project: project});
            } else {
                res.json({success: false, errMessage: "NewsfeedSource doesn't exist."});
            }
        }
    }).populate("project");
}

exports.addNewsfeedSource = async (newsfeedSourceList, project_id) =>  {

    for(let i = 0 ; i < newsfeedSourceList.length ; i ++) {
        if(!utility.isValid(newsfeedSourceList[i]._id)) {
            let newsfeedSource = new NewsfeedSource({
                link: newsfeedSourceList[i].link,
                project: project_id,
                keyword_list: newsfeedSourceList[i].keyword_list,     
            });
            try {
                await NewsfeedSource.insertMany(newsfeedSource);
            } catch(err) {
                console.log(err);
            }

            let livefeeds = await livefeed.generateLivefeeds(newsfeedSource);
            if(utility.isValid(livefeeds)) {
                await Livefeed.insertMany(livefeeds);
            }            
        }
    }
    let addedList = await NewsfeedSource.find({project: project_id}, '_id');
    return addedList;
}

exports.checkNewsfeedSource = async (newsfeedSourceList) =>  {

    for(let i = 0 ; i < newsfeedSourceList.length ; i ++) {
        if(utility.isValid(newsfeedSourceList[i]._id)) {
            try {
                await NewsfeedSource.updateOne( {_id: newsfeedSourceList[i]._id}, { '$set': {'link': newsfeedSourceList[i].link, 'keyword_list': newsfeedSourceList[i].keyword_list } } );
            } catch(err) {
                console.log(err);
            }
        }
    }
    return;
}

exports.updateLivefeeds = async ()  => {

    let new_livefeeds = [];
    let newsfeedSourceList = await NewsfeedSource.find();

    // var m = new Date();
    // var dateString = m.getFullYear() +"/"+ (m.getMonth()+1) +"/"+ m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
    // console.log("Start Time: ", dateString)

    const myPromise = async(newsfeedSource) => {
        let generatedLivefeeds = await livefeed.generateLivefeeds(newsfeedSource);
        generatedLivefeeds.map( async(livefeed) => {
            let one_livefeed = livefeed;
            let beforeLivefeeds = await Livefeed.find({newsfeedSource: newsfeedSource._id, title: livefeed.title, link: livefeed.link });
            if(utility.isValid(beforeLivefeeds)) {
                one_livefeed = beforeLivefeeds[0];
            }
            new_livefeeds.push(one_livefeed);
        });
    }

    await newsfeedSourceList.reduce(function(promise, item) {
        return promise.then(function(result) {
            return Promise.all([myPromise(item)]);
        });
    }, Promise.resolve());

    await Livefeed.deleteMany();
    await Livefeed.insertMany(new_livefeeds);

    livefeeds = await Livefeed.find().sort([['created_time', -1]]).populate({path: "project", populate: {path: "main_image"}});

    // m = new Date();
    // dateString = m.getFullYear() +"/"+ (m.getMonth()+1) +"/"+ m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
    // console.log("End Time: ", dateString)

    return livefeeds;
}