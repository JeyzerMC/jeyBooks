/********************************************************
* Name: main.js
* Description: Setup for the main routes
* Author: JeyzerMC
* Date:   July 31th, 2017
********************************************************/

var router = require("express").Router({mergeParams: true});

router.get("/", function(req, res){
    res.render("../views/home");
});

module.exports = router;