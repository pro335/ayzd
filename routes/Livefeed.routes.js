const passport = require("passport");
var livefeed = require("../controllers/Livefeed.controller");

module.exports = (app) => {
    app.put("/api/livefeed/create", passport.authenticate('jwt'), livefeed.createLivefeed);
    app.post("/api/livefeed/all", livefeed.allLivefeeds);
    app.post("/api/livefeed/update", passport.authenticate('jwt'), livefeed.updateLivefeed);
    app.delete("/api/livefeed/delete/:id", passport.authenticate('jwt'), livefeed.deleteLivefeed);
};
