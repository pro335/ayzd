const passport = require("passport");
var chain = require("../controllers/Chain.controller");

module.exports = (app) => {
    app.put("/api/chain/create", passport.authenticate('jwt'), chain.createChain);
    app.post("/api/chain/all", chain.allChains);
    app.post("/api/chain/update", passport.authenticate('jwt'), chain.updateChain);
    app.delete("/api/chain/delete/:id", passport.authenticate('jwt'), chain.deleteChain);
};
