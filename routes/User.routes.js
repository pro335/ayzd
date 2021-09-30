const passport = require("passport");
var user = require("../controllers/User.controller");

module.exports = (app) => {
    app.put("/api/auth/register", user.register);
    app.post("/api/auth/login", user.login);

    app.put("/api/user/create", passport.authenticate('jwt'), user.register);
    app.post("/api/user/all", user.allUsers);
    app.post("/api/user/update", passport.authenticate('jwt'), user.updateUser);
    app.delete("/api/user/delete/:id", passport.authenticate('jwt'), user.deleteUser);
};
