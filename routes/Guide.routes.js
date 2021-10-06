const passport = require("passport");
var guide = require("../controllers/Guide.controller");

module.exports = (app) => {
    app.put("/api/guide/create", passport.authenticate('jwt'), guide.createGuide);
    app.post("/api/guide/all", guide.allGuides);
    app.post("/api/guide/update", passport.authenticate('jwt'), guide.updateGuide);
    app.delete("/api/guide/delete/:id", passport.authenticate('jwt'), guide.deleteGuide);
};
