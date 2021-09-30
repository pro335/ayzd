const passport = require("passport");
var media = require("../controllers/Media.controller");

module.exports = (app) => {
    app.put("/api/media/create", passport.authenticate('jwt'), media.createMedia);
    app.post("/api/media/all", passport.authenticate('jwt'), media.allMedias);
    app.post("/api/media/update", passport.authenticate('jwt'), media.updateMedia);
    app.delete("/api/media/delete/:id", passport.authenticate('jwt'), media.deleteMedia);

    app.post("/api/media/findAndGenerateFileName/:name", passport.authenticate('jwt'), media.findAndGenerateFileName);
};
