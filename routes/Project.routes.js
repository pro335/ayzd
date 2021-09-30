const passport = require("passport");
var project = require("../controllers/Project.controller");

module.exports = (app) => {
    app.put("/api/project/create", passport.authenticate('jwt'), project.createProject);
    app.put("/api/project/createFromUrl", passport.authenticate('jwt'), project.createFromUrl);
    app.post("/api/project/all", project.allProjects);
    app.post("/api/project/update", passport.authenticate('jwt'), project.updateProject);
    app.delete("/api/project/delete/:id", passport.authenticate('jwt'), project.deleteProject);

    app.post("/api/project/updateMainImage", passport.authenticate('jwt'), project.updateMainImage);
    app.post("/api/project/updateSecondaryImage", passport.authenticate('jwt'), project.updateSecondaryImage);    
    app.post("/api/project/createMedia", passport.authenticate('jwt'), project.createMedia);
    app.post("/api/project/updateMedia", passport.authenticate('jwt'), project.updateMedia);
    app.delete("/api/project/deleteMedia/:id/:mediaId", passport.authenticate('jwt'), project.deleteMedia);
    
    app.post("/api/project/createGuide", passport.authenticate('jwt'), project.createGuide);
    app.post("/api/project/updateGuide", passport.authenticate('jwt'), project.updateGuide);
    app.delete("/api/project/deleteGuide/:id/:guideId", passport.authenticate('jwt'), project.deleteGuide);
    
    app.post("/api/project/createMember", passport.authenticate('jwt'), project.createMember);
    app.post("/api/project/updateMember", passport.authenticate('jwt'), project.updateMember);
    app.delete("/api/project/deleteMember/:id/:memberId", passport.authenticate('jwt'), project.deleteMember);

    app.post("/api/project/getTrendingNFTs", project.getTrendingNFTs);

    app.post("/api/project/updateDiscordMembersForOneProject", project.updateDiscordMembersForOneProject);
    app.post("/api/project/updateTwitterMembersForOneProject", project.updateTwitterMembersForOneProject);
    
    // app.post("/api/project/removeUnusedUpcomingProjects", project.removeUnusedUpcomingProjects);
};
