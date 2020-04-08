const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
    app.get("/", (req, res) => {
        if(req.user) {
            res.redirect("/food-log");
        }
        res.render("signup");
    });

    app.get("/login", (req, res) => {
        if(req.user) {
            res.redirect("/food-log");
        }
        res.render("login");
    });

    app.get("/food-log", isAuthenticated, (req, res) => {
        res.render("food");
    });
};
