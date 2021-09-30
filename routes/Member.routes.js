const passport = require("passport");
var projectMember = require("../controllers/Member.controller");

module.exports = (app) => {
    app.put("/api/projectMember/create", passport.authenticate('jwt'), projectMember.createMember);
    app.post("/api/projectMember/all", passport.authenticate('jwt'), projectMember.allMembers);
    app.post("/api/projectMember/update", passport.authenticate('jwt'), projectMember.updateMember);
    app.delete("/api/projectMember/delete/:id", passport.authenticate('jwt'), projectMember.deleteMember);
};
