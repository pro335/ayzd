// var mongoose = require('mongoose');
const Project = require('../models/Project.model');
const Media = require('../models/Media.model');
const Guide = require('../models/Guide.model');
const Member = require('../models/Member.model');
const NewsfeedSource = require('../models/NewsfeedSource.model');
var newsfeedSource = require("../controllers/NewsfeedSource.controller");
const getData = require("../controllers/GetData.controller");
var Config = require('../config/config');
var utility = require('../utility');

const rp = require("request-promise");
const axios = require("axios");


exports.createProject = async (req, res) =>  {

    let newProject = new Project(req.body);

    try {

        // Determine whether creating new media or not
        let newMedia = null, new_main_image = null;
        if(req.body.main_image !== null) {        //  create new media
            newMedia = new Media(req.body.main_image);
            await Media.insertMany(newMedia);
            new_main_image = newMedia._id;
        } else {
            new_main_image = Config.fake_mongodb_id;
        }

        // Update the main image of the project
        newProject.main_image = new_main_image;

        // Create newsfeed source & livefeed news
        let addedNewsfeedSourceList = await newsfeedSource.addNewsfeedSource(newProject.newsfeedSource_list, newProject._id);
        newProject.newsfeedSource_list = addedNewsfeedSourceList;

        // Create the unique id from the name
        newProject.unique_id = newProject.name.replace(/[^a-zA-Z ]/g, "").replace(/[ ]/g, "-");

        // fetch discord_members & twitter_members
        if( utility.isValid(newProject.discord_link) || utility.isValid(newProject.twitter_link) ) {
            let { discord_members, twitter_members } = await getData.getMembersFromUrl( {discord_link: newProject.discord_link, twitter_link: newProject.twitter_link} );
            if(utility.isValid(discord_members)) {
                newProject = {
                    ...newProject,
                    discord_members
                }
            }
            if(utility.isValid(twitter_members)) {
                newProject = {
                    ...newProject,
                    twitter_members
                }
            }
        }

        //Add new project
        await Project.insertMany(newProject);
        let project = await Project.findById(newProject._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
        res.json({success: true, project: project});
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while creating Project."});
    }
}

exports.createFromUrl = async (req, res) =>  {

    // Get the slug from the url.
    let project_url = req.body.url;
    let tempEachUrl = project_url.split("/");
    let slug = tempEachUrl[tempEachUrl.length - 1];
    if(!utility.isValid(slug)) {
        return res.json({success: false, errMessage: "The slug of the coinranking url is not valid. please check the url, again!"});
    }

    const url = `${Config.coinranking_url}/dapp/${slug}`;

    const dappOptions = {
      method: 'GET',
      url: url,
      headers: {
        'x-access-token': Config.token
      }
    };

    try {
        let dappsResponse = await rp(dappOptions);
        let dapp = JSON.parse(dappsResponse).data.dapp;

        // Determine whether creating new media or not
        let newMedia = null, new_main_image = null;
        if(utility.isValid(dapp.image)) {        //  create new media
            newMedia = new Media({
                name: utility.isValid(dapp.name) ? dapp.name : "",
                url: dapp.image,
                type: 0,
                relation: 0
            });

            await Media.insertMany(newMedia);
            new_main_image = newMedia._id;
        } else {
            new_main_image = Config.fake_mongodb_id;
        }

        //Generage random number between 1 ~ 100000
        let nRandom = Math.floor(Math.random() * 100000) + 1;

        let tempNewProject = {
            name: utility.isValid(dapp.name) ? dapp.name : nRandom.toString(),
            slug: utility.isValid(dapp.slug) ? dapp.slug : nRandom.toString(),
            unique_id: utility.isValid(dapp.slug) ? dapp.slug : nRandom.toString(),
            main_image: new_main_image,
            app_link: "",
            twitter_link: "",
            telegram_link: "",
            discord_link: "",
        }
        dapp.links.map((item, index) => {
            if(item.type === "website") {
                tempNewProject.app_link = item.url;
            }
            if(item.type === "twitter") {
                tempNewProject.twitter_link = item.url;
            }
            if(item.type === "telegram") {
                tempNewProject.telegram_link = item.url;
            }
            if(item.type === "discord") {
                tempNewProject.discord_link = item.url;
            }
        });

        // fetch discord_members & twitter_members
        const fetch_discord_twitter_members = async () => {
            if( utility.isValid(tempNewProject.discord_link) || utility.isValid(tempNewProject.twitter_link) ) {
                let { discord_members, twitter_members } = await getData.getMembersFromUrl( {discord_link: tempNewProject.discord_link, twitter_link: tempNewProject.twitter_link} );
                if(utility.isValid(discord_members)) {
                    tempNewProject = {
                        ...tempNewProject,
                        discord_members
                    }
                }
                if(utility.isValid(twitter_members)) {
                    tempNewProject = {
                        ...tempNewProject,
                        twitter_members
                    }
                }
        
            }
        }

        await fetch_discord_twitter_members();
        
        let newProject = new Project(tempNewProject);

        //Add new project
        await Project.insertMany(newProject);

        let project = await Project.findById(newProject._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
        res.json({success: true, project: project});
    } catch(err) {
        return res.json({success: false, errMessage: JSON.stringify(err)});
    }
}

exports.allProjects = async (req, res) =>  {
    Project.find().populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]})
    .exec(function(err, projects) {
        if (err) {
            console.log("err", err)
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole projects."});
        } else {
            res.json({success: true, projects: projects});
        }
    });
}

exports.updateProject = async (req, res) =>  {
    let newProject = new Project(req.body);

    try {        

        // Determine whether creating new media or not, as main_image
        let newMedia = null, new_main_image = null;
        if(!utility.isValid(req.body.main_image)) {        // not existed & not file
            new_main_image = Config.fake_mongodb_id;
        } else if(utility.isValid(req.body.main_image._id)) {        //  existing saved file
            new_main_image = req.body.main_image._id;
        } else {                            // if file, then upload
            newMedia = new Media(req.body.main_image);
            await Media.insertMany(newMedia);
            new_main_image = newMedia._id;

        }
        // Determine whether creating new media or not, as secondary_image
        newMedia = null, new_secondary_image = null;
        if(!utility.isValid(req.body.secondary_image)) {        // not existed & not file
            new_secondary_image = Config.fake_mongodb_id;
        } else if(utility.isValid(req.body.secondary_image._id)) {        //  existing saved file
            new_secondary_image = req.body.secondary_image._id;
        } else {                            // if file, then upload
            newMedia = new Media(req.body.secondary_image);
            await Media.insertMany(newMedia);
            new_secondary_image = newMedia._id;
        }

        // Create newsfeed source & livefeed news
        await newsfeedSource.addNewsfeedSource(req.body.newsfeedSource_list, newProject._id);
        await newsfeedSource.checkNewsfeedSource(req.body.newsfeedSource_list);
        let newsfeedSource_list = await NewsfeedSource.find({project: req.body._id}, '_id');

        // Update the unique id from the name
        let unique_id = "";
        if(utility.isValid(newProject.slug)) {
            unique_id = newProject.slug;
        } else {
            unique_id = newProject.name.replace(/[^a-zA-Z0-9 ]/g, "").replace(/[ ]/g, "-");
        }

        // fetch discord_members & twitter_members
        newProject = {
            ...newProject,
            discord_members: null,
            twitter_members: null
        }
        
        if( utility.isValid(newProject.discord_link) || utility.isValid(newProject.twitter_link) ) {
            let { discord_members, twitter_members } = await getData.getMembersFromUrl( {discord_link: newProject.discord_link, twitter_link: newProject.twitter_link} );
            if(utility.isValid(discord_members)) {
                newProject = {
                    ...newProject,
                    discord_members
                }
            }
            if(utility.isValid(twitter_members)) {
                newProject = {
                    ...newProject,
                    twitter_members
                }
            }
        }

        // Add new project
        await Project.updateOne( {"_id": req.body._id}, { '$set': {'name': req.body.name, 'category': req.body.category, 'chain': req.body.chain, 'small_description': req.body.small_description, 'full_description': req.body.full_description, 'btn_label': req.body.btn_label, 'btn_url': req.body.btn_url, 'main_image': new_main_image, 'secondary_image': new_secondary_image, 'app_link': req.body.app_link, 'twitter_link': req.body.twitter_link, 'telegram_link': req.body.telegram_link, 'discord_link': req.body.discord_link, 'similar_list': req.body.similar_list, 'newsfeedSource_list': newsfeedSource_list, 'unique_id': unique_id, 'isUpcoming': req.body.isUpcoming, 'price': req.body.price, 'upcoming_date': req.body.upcoming_date, 'mint_size': req.body.mint_size, 'discord_members': newProject.discord_members, 'twitter_members': newProject.twitter_members, 'score_team': req.body.score_team, 'score_uniqueness': req.body.score_uniqueness, 'score_community': req.body.score_community, 'score_v_quality': req.body.score_v_quality, 'score_v_potential': req.body.score_v_potential, 'score_utility': req.body.score_utility } } );

        let project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
        res.json({success: true, project: project});
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while updating Project."});
    }
}


exports.updateMainImage = async (req, res) =>  {
    let project = null;
    let newMedia = null;
    try {
        project = await Project.findOne()
            .where("_id").in([req.body._id])
            .exec();
        if(utility.isValid(project)) {
            // Determine whether creating new media or not
            let new_main_image = null;
            if(req.body.main_image !== null) {        //  create new media
                newMedia = new Media(req.body.main_image);
                await Media.insertMany(newMedia);
                new_main_image = newMedia._id;
            } else {
                new_main_image = Config.fake_mongodb_id;
            }

            // Update the main image of the project
            project.main_image = new_main_image;

            await project.save();
        }
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while updating the main image of the project."});
    }

    project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, media: newMedia, isExistingProject: utility.isValid(project), updated_project: project });
}

exports.updateSecondaryImage = async (req, res) =>  {
    let project = null;
    let newMedia = null;
    try {
        project = await Project.findOne()
            .where("_id").in([req.body._id])
            .exec();
        if(utility.isValid(project)) {
            // Determine whether creating new media or not
            let new_secondary_image = null;
            if(req.body.secondary_image !== null) {        //  create new media
                newMedia = new Media(req.body.secondary_image);
                await Media.insertMany(newMedia);
                new_secondary_image = newMedia._id;
            } else {
                new_secondary_image = Config.fake_mongodb_id;
            }

            // Update the main image of the project
            project.secondary_image = new_secondary_image;

            await project.save();
        }
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while updating the main image of the project."});
    }

    project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, media: newMedia, isExistingProject: utility.isValid(project), updated_project: project });
}

exports.createMedia = async (req, res) =>  {
    let project = null;
    let newMedia = null;
    try {
        project = await Project.findOne()
            .where("_id").in([req.body._id])
            .exec();
        if(utility.isValid(project)) {
            // Determine whether creating new media or not
            let newMedia_id = null;
            if(req.body.newMedia !== null) {        //  create new media
                newMedia = new Media(req.body.newMedia);
                await Media.insertMany(newMedia);
                newMedia_id = newMedia._id;
            } else {
                newMedia_id = Config.fake_mongodb_id;
            }

            // Add the _id of the media to the project's media list
            let temp_media_list = project.media_list;
            temp_media_list.push(newMedia_id);
            project.media_list = temp_media_list;

            await project.save();
        }
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while creating media of the project."});
    }

    project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, media: newMedia, isExistingProject: utility.isValid(project), updated_project: project });
}

exports.updateMedia = async (req, res) =>  {
    let project = null;
    let newMedia = null;
    try {
        if(req.body.newMedia !== null) {        //  create new media
            newMedia = new Media(req.body.newMedia);
            await Media.insertMany(newMedia);
            newMedia_id = newMedia._id;
    
            project = await Project.findOne()
                .where("_id").in([req.body._id])
                .exec();
            if(utility.isValid(project)) {
                // Determine whether creating new media or not
                let newMedia_id = null;

                // Update the "beforeMediaId" to the _id of the media
                let temp_media_list = [...project.media_list];
                let foundIndex = temp_media_list.findIndex(x => x == req.body.beforeMediaId);
                if(foundIndex !== -1)
                    temp_media_list[foundIndex] = newMedia_id;
                project.media_list = temp_media_list;

                await project.save();
            }
        } else {        // remove the media id in the list of the media
            await Project.updateOne( {_id: req.body._id}, { $pullAll: {media_list: [req.body.beforeMediaId] } } );
        }
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while creating media of the project."});
    }

    project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, media: newMedia, isExistingProject: utility.isValid(project), updated_project: project });
}

exports.deleteMedia = async (req, res) => {
    let id = req.params.id;
    let mediaId = req.params.mediaId;
    let project = null;
    try {
        await Media.findByIdAndRemove(mediaId, {
            new: true,
            useFindAndModify: false
        });

        await Project.updateOne( {_id: id}, { $pullAll: {media_list: [mediaId] } } );
    } catch (err) {
        console.log("delete media of the project error ~", err);
        res.json({success: false, errMessage: "An unknown error was occured while deleting the media of the project."});
    }
    project = await Project.findById(id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, isExistingProject: utility.isValid(project), updated_project: project});
}

exports.deleteProject = async (req, res) =>  {
    let id = req.params.id;
    Project.findByIdAndRemove(id, {
        new: true,
        useFindAndModify: false
    }, async function(err, project) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while deleting project."});
        } else {
            if (project !== null)
                res.json({success: true, project: project});
            else
                res.json({success: false, errMessage: "Project doesn't exist."});
        }
    })
}

exports.createGuide = async (req, res) =>  {
    let project = null, newGuide = null;
    try {
        if(req.body.newGuide !== null) {        //  create new guide
        
            // Determine whether creating new media_video or not
            let new_media_video = null, media_video_id = Config.fake_mongodb_id;
            if(utility.isValid(req.body.newGuide.is_video_guide) && req.body.newGuide.is_video_guide && req.body.newGuide.media_video !== null) {        //  create new video
                new_media_video = new Media(req.body.newGuide.media_video);
                await Media.insertMany(new_media_video);
                media_video_id = new_media_video._id;
            } else {
                media_video_id = Config.fake_mongodb_id;
            }
     
            // Determine whether creating new image or not
            let new_media_image = null, media_image_id = Config.fake_mongodb_id;
            if(req.body.newGuide.media_image !== null) {        //  create new media
                new_media_image = new Media(req.body.newGuide.media_image);
                await Media.insertMany(new_media_image);
                media_image_id = new_media_image._id;
            } else {
                media_image_id = Config.fake_mongodb_id;
            }
     
            newGuide = new Guide(req.body.newGuide);
            newGuide.media_video = media_video_id;
            newGuide.media_image = media_image_id;
            await Guide.insertMany(newGuide);

            await Project.updateOne( {_id: req.body._id}, { $push: {guide_list: [newGuide._id] } } );
        }
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while creating guide of the project."});
    }

    project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, guide: newGuide, isExistingProject: utility.isValid(project), updated_project: project });
}

exports.updateGuide = async (req, res) =>  {
    let project = null;
    let newGuide = req.body.newGuide;
    try {
        if(newGuide !== null) {
            let new_media_video = null, media_video_id = Config.fake_mongodb_id;
            if(utility.isValid(newGuide.media_video)) {
                if(utility.isValid(newGuide.media_video._id)) {
                    media_video_id = newGuide.media_video._id;
                } else {
                    new_media_video = new Media(newGuide.media_video);
                    await Media.insertMany(new_media_video);
                    media_video_id = new_media_video._id;
                }
            }

            let new_media_image = null, media_image_id = Config.fake_mongodb_id;
            if(utility.isValid(newGuide.media_image)) {
                if(utility.isValid(newGuide.media_image._id)) {
                    media_image_id = newGuide.media_image._id;
                } else {
                    new_media_image = new Media(newGuide.media_image);
                    await Media.insertMany(new_media_image);
                    media_image_id = new_media_image._id;
                }
            }

            await Guide.updateOne( {"_id": req.body.beforeGuideId}, { '$set': {'title': req.body.newGuide.title, 'full_description': req.body.newGuide.full_description, 'is_video_guide': req.body.newGuide.is_video_guide, 'media_video': media_video_id, 'media_image': media_image_id} } );

        } else {        // remove the guide id in the list of the guide
            await Project.updateOne( {_id: req.body._id}, { $pullAll: {guide_list: [req.body.beforeGuideId] } } );
        }

    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while creating guide of the project."});
    }

    project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    let guide_data = await Guide.findById(req.body.beforeGuideId).populate({path: "media_video", select: ['name', 'url']}).populate({path: "media_image", select: ['name', 'url']});
    res.json({success: true, guide: newGuide, isExistingProject: utility.isValid(project), updated_project: project, guide_data: guide_data });
}


exports.deleteGuide = async (req, res) => {
    let id = req.params.id;
    let guideId = req.params.guideId;
    let project = null;
    try {
        await Guide.findByIdAndRemove(guideId, {
            new: true,
            useFindAndModify: false
        });

        await Project.updateOne( {_id: id}, { $pullAll: {guide_list: [guideId] } } );
    } catch (err) {
        console.log("delete guide of the project error ~", err);
        res.json({success: false, errMessage: "An unknown error was occured while deleting the guide of the project."});
    }
    project = await Project.findById(id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, isExistingProject: utility.isValid(project), updated_project: project});
}

exports.createMember = async (req, res) =>  {
    let project = null;
    let newMember = null;
    try {
        if(req.body.newMember !== null) {        //  create new member
        
            // Determine whether creating new avatar or not
            let newMedia = null, avatar_id = null;
            if(req.body.newMember.avatar !== null) {        //  create new avatar
                newMedia = new Media(req.body.newMember.avatar);
                await Media.insertMany(newMedia);
                avatar_id = newMedia._id;
            } else {
                avatar_id = Config.fake_mongodb_id;
            }
     
            newMember = new Member(req.body.newMember);
            newMember.avatar = avatar_id;
            await Member.insertMany(newMember);

            await Project.updateOne( {_id: req.body._id}, { $push: {member_list: [newMember._id] } } );
        }
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while creating member of the project."});
    }

    project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, member: newMember, isExistingProject: utility.isValid(project), updated_project: project });
}

exports.updateMember = async (req, res) =>  {
    let project = null;
    let newMember = req.body.newMember;
    try {
        if(newMember !== null) {
            let newMedia = null, avatar_id = null;
            if(newMember.avatar !== null) {
                if(utility.isValid(newMember.avatar._id)) {
                    avatar_id = newMember.avatar._id;
                } else {
                    newMedia = new Media(newMember.avatar);
                    await Media.insertMany(newMedia);
                    avatar_id = newMedia._id;
                }
            }
            await Member.updateOne( {"_id": req.body.beforeMemberId}, { '$set': {'name': req.body.newMember.name, 'position': req.body.newMember.position, 'avatar': avatar_id, 'facebook_link': req.body.newMember.facebook_link, 'twitter_link': req.body.newMember.twitter_link, 'dribbble_link': req.body.newMember.dribbble_link, 'instagram_link': req.body.newMember.instagram_link, 'medium_link': req.body.newMember.medium_link } } );

        } else {        // remove the member id in the list of the member
            await Project.updateOne( {_id: req.body._id}, { $pullAll: {member_list: [req.body.beforeMemberId] } } );
        }

    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while updating member of the project."});
    }

    project = await Project.findById(req.body._id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, member: newMember, isExistingProject: utility.isValid(project), updated_project: project });
}


exports.deleteMember = async (req, res) => {
    let id = req.params.id;
    let memberId = req.params.memberId;
    let project = null;
    try {
        await Member.findByIdAndRemove(memberId, {
            new: true,
            useFindAndModify: false
        });

        await Project.updateOne( {_id: id}, { $pullAll: {member_list: [memberId] } } );
    } catch (err) {
        console.log("delete member of the project error ~", err);
        res.json({success: false, errMessage: "An unknown error was occured while deleting the member of the project."});
    }
    project = await Project.findById(id).populate("category").populate("chain").populate("main_image").populate("secondary_image").populate("newsfeedSource_list").populate("media_list").populate({path: "guide_list", populate: [{path: "media_video", select: ['name', 'url']}, {path: "media_image", select: ['name', 'url']}]}).populate({path: "member_list", populate: {path: "avatar"}}).populate({path: "similar_list", populate: [{path: "main_image"}, {path: "secondary_image"}, {path: "category"}]});
    res.json({success: true, isExistingProject: utility.isValid(project), updated_project: project});
}

exports.getTrendingNFTs = async (req, res) => {

    let {
        dappSlug, 
        orderBy, 
        orderDirection,
    } = req.body;
    let trendingNFTs = [];

    let url = `${Config.coinranking_url}/nfts?limit=100&dappSlug=${dappSlug}`;
    if(utility.isValid(orderBy)) {
        url = url + `&orderBy=${orderBy}` + ( utility.isValid(orderDirection) ? `&orderDirection=${orderDirection}` : "" );
    } else {
        url = url +`&orderBy=priceInDollar`;
    }

    const options = {
      method: 'GET',
      url: url,
      headers: {
        'x-access-token': Config.token
      }
    };

    try {
        let response = await rp(options);
        trendingNFTs = JSON.parse(response).data.nfts;
        res.json({success: true, trendingNFTs});
    } catch(err) {
        return res.json({success: false, errMessage: JSON.stringify(err)});
    }
}

exports.updateUpcomingProjects = async () => {
    await Project.updateMany( {"$and": [ {"isUpcoming": { $eq: true }}, {"upcoming_date": { $lte: new Date().getTime() } }, {"name": { $ne: "Smart feed" } } ]}, { '$set': { 'isUpcoming': false } } );
}

exports.updateDiscordMembersForOneProject = async (req, res) => {
    if(utility.isValid(req.body) && utility.isValid(req.body.discord_link)) {
        try {
            const url = req.body.discord_link;
            const [id] = url.split('/').slice(-1);
            const resData = await axios.get(`https://discord.com/api/invites/${id}?with_counts=true`, {
                headers: {
                    Authorization: `Bot ${Config.discord_bot_key}`,
                    "X-RateLimit-Limit": 9999,
                    "X-RateLimit-Remaining": 9999,
                    "X-RateLimit-Reset": Date.now(),
                    "X-RateLimit-Bucket": Date.now().toString(),
                }
            })
            
            const discord_members = resData.data.approximate_member_count;
            await Project.updateOne( {"_id": req.body._id}, { '$set': { 'discord_members': discord_members } } );

            return res.json({success: true, data: discord_members})
        } catch(err) {
            console.log("error~", err);
            return res.json({success: false});
        }
    } else if(utility.isValid(req.body) && utility.isValid(req.body._id)) {
        await Project.updateOne( {"_id": req.body._id}, { '$set': { 'discord_members': null } } );
        return res.json({success: true, data: null})
    }
}

exports.updateTwitterMembersForOneProject = async (req, res) => {
    if(utility.isValid(req.body) && utility.isValid(req.body.twitter_link)) {
        try {
            // getting the id
            const url = req.body.twitter_link;
            const [id] = url.split('/').slice(-1)
            const resData = await axios.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${id}`, {
                headers: {
                    Authorization: `Bearer ${Config.twitter_token}`
                }
            })

            const twitter_members = resData.data.followers_count;

            await Project.updateOne( {"_id": req.body._id}, { '$set': { 'twitter_members': twitter_members } } );

            return res.json({success: true, data: twitter_members})
        } catch(err) {
            console.log("error~", err);
            return res.json({success: false});
        }
    } else if(utility.isValid(req.body) && utility.isValid(req.body._id)) {
        await Project.updateOne( {"_id": req.body._id}, { '$set': { 'twitter_members': null } } );
        return res.json({success: true, data: null})
    }
}


