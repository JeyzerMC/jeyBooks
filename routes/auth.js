/********************************************************
 * Name: auth.js
 * Description: Setup for the authentification routes
 * Author: JeyzerMC
 * Date:   August 11th, 2017
 ********************************************************/

var router = require("express").Router({
        mergeParams: true
    }),
    User = require("../models/userModel"),
    passport = require("passport");


router.get("/register", function (req, res) {
    res.render("auth/register");
});

router.post("/register", function (req, res) {
    User.register(new User({
            username: req.body.username
        }), req.body.password,
        function (err, newUser) {
            if (err) {
                req.flash("error", err.name);
                return res.redirect("register");
            }

            passport.authenticate("local")(req, res, function () {
                res.redirect("/books");
            });
        });

});


router.get("/login", function (req, res) {
    res.render("auth/login");
});

router.post("/login", passport.authenticate("loginStrat", {
    failureRedirect: "/login",
    failureFlash: true
}), function (req, res) {
    //SUCCESS FLASH TO DO HERE
    res.redirect("/books");
});


router.get("/logout", function (req, res) {
    res.render("auth/logout");
});

module.exports = router;