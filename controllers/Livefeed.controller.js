var mongoose = require('mongoose');
const Livefeed = mongoose.model('Livefeed');
var utility = require('../utility');
var Config = require('../config/config');

exports.createLivefeed = async (req, res) =>  {
    let newLivefeed = new Livefeed(req.body);
    try {
        await Livefeed.insertMany(newLivefeed);
        let livefeed = await Livefeed.findById(newLivefeed._id).sort([['created_time', -1]]).populate({path: "project", populate: {path: "main_image"}});
        res.json({success: true, livefeed: livefeed});
    } catch(err) {
        console.log(err);
        return res.json({success: false, errMessage: "Unknown errors occurred while creating Livefeed."});
    }
}

exports.allLivefeeds = async (req, res) =>  {
    Livefeed.find().sort([['created_time', -1]]).populate({path: "project", populate: {path: "main_image"}}).exec(function(err, livefeeds) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole Livefeeds."});
        } else {
            res.json({success: true, livefeeds: livefeeds});
        }
    })
}

exports.updateLivefeed = async (req, res) =>  {
    Livefeed.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        description: req.body.description,
        media: req.body.media,
        newsfeedSource: req.body.newsfeedSource,
        project: req.body.project,
        link: req.body.link,
        tag: req.body.tag,
        _id: req.body._id,
        created_time: req.body.created_time,
    }, {
        new: true,
        useFindAndModify: false
    }, async function(err, livefeed) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while updating Livefeed."});
        } else {
            if (livefeed !== null)
                res.json({success: true, livefeed: livefeed});
            else {
                let livefeeds = await Livefeed.find().sort([['created_time', -1]]).populate({path: "project", populate: {path: "main_image"}});
                res.json({success: false, errMessage: "Livefeed data was updated. Please try again!", livefeeds});
            }
        }
    });
}

exports.deleteLivefeed = async (req, res) =>  {
    let id = req.params.id;
    Livefeed.findByIdAndRemove(id, {
        new: true,
        useFindAndModify: false
    }, async function(err, livefeed) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while deleting Livefeed."});
        } else {
            if (livefeed !== null)
                res.json({success: true, livefeed: livefeed});
            else {
                let livefeeds = await Livefeed.find().sort([['created_time', -1]]).populate({path: "project", populate: {path: "main_image"}});
                res.json({success: false, errMessage: "Livefeed data was updated. Please try again!", livefeeds});
            }
        }
    });
}

exports.generateLivefeeds = async (newsfeedSource) => {

  let feed = await utility.parseRss(newsfeedSource.link);
  let items = utility.isValid(feed) ? feed.items : [];
  let livefeeds = [];

  try {
    let {keyword_list} = newsfeedSource;

    for( let i = 0 ; i < items.length ; i ++) {
        let title = utility.isValid(items[i].title) ? items[i].title : "";
        let description = utility.isValid(items[i].contentSnippet) ? items[i].contentSnippet : "";

        // search by keyword list for title & description.
        let resultSearch = keyword_list.filter(function(keyword) {
            return title.includes(keyword) || description.includes(keyword);
        });  

        //if keyword is empty string or search is success, add one live feed.
        if( !utility.isValid(keyword_list) || utility.isValid(resultSearch) ) {
            // console.log(`1: ${!utility.isValid(keyword_list)}, 2: ${utility.isValid(resultSearch)}`)
            livefeeds.push({
                title: utility.isValid(items[i].title) ? items[i].title : "", 
                description: utility.isValid(items[i].contentSnippet) ? items[i].contentSnippet : "", 
                media: ( utility.isValid(items[i].enclosure) && utility.isValid(items[i].enclosure.url) ) ? items[i].enclosure.url : "", 
                newsfeedSource: utility.isValid(newsfeedSource._id) ? newsfeedSource._id : Config.fake_mongodb_id, 
                project: utility.isValid(newsfeedSource.project) ? newsfeedSource.project : Config.fake_mongodb_id, 
                link: utility.isValid(items[i].link) ? items[i].link : "http://google.com", 
                created_time: utility.isValid(items[i].pubDate) ? items[i].pubDate : Date.now(), 
            });
        }
    }
  } catch(err) {
      console.log(err);
      livefeeds = [];
  }

  return livefeeds;

}