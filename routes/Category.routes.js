const passport = require("passport");
var category = require("../controllers/Category.controller");

module.exports = (app) => {
    app.put("/api/category/create", passport.authenticate('jwt'), category.createCategory);
    app.post("/api/category/all", category.allCategories);
    app.post("/api/category/update", passport.authenticate('jwt'), category.updateCategory);
    app.delete("/api/category/delete/:id", passport.authenticate('jwt'), category.deleteCategory);
};
