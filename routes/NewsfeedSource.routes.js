const passport = require("passport");
var newsfeedSource = require("../controllers/NewsfeedSource.controller");

module.exports = (app) => {
    app.put("/api/newsfeedSource/create", passport.authenticate('jwt'), newsfeedSource.createNewsfeedSource);
    app.post("/api/newsfeedSource/all", newsfeedSource.allNewsfeedSources);
    app.post("/api/newsfeedSource/update", passport.authenticate('jwt'), newsfeedSource.updateNewsfeedSource);
    app.delete("/api/newsfeedSource/delete/:id", passport.authenticate('jwt'), newsfeedSource.deleteNewsfeedSource);

    // app.post("/api/newsfeedSource/updateLivefeeds", newsfeedSource.updateLivefeeds);
};
