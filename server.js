/********************************************************
 * Name: server.js
 * Description: Main file for configuring and launching
 *              the website application: JeyBooks.
 * Author: JeyzerMC
 * Date:   July 31th, 2017
 ********************************************************/

//========================================
// Importing the necessary node modules
//========================================
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    methodOverride = require("method-override");

//========================================
// Importing and creating the models
//========================================

var BookModel = require("./models/bookModel"),
    User = require("./models/userModel");

//========================================
// General node_modules configuration 
//========================================

//Using method-override for RESTful routing
app.use(methodOverride("_method"));

//Using body-parser for the req.body conversion
app.use(bodyParser.urlencoded({
    extended: true
}));

//Setting the view engine to ejs
app.set("view engine", "ejs");

//Serving the public and semantic folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/semantic"));

//========================================
// Connection the database with mongoose
//========================================

var url = process.env.DATABASEURL || "mongodb://localhost/jey_books";
mongoose.connect(url, {
    useMongoClient: true,
});

//========================================
// Configuring Express, Session and Flash
//========================================

app.use(require("express-session")({
    secret: "KEY",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

//========================================
// Configuring Passport (+Local & mgoose)
//========================================

//Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

//Passport default local strategy
passport.use(new LocalStrategy(User.authenticate()));

//Custom local strategy for flexibility
passport.use("loginStrat", new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err)
                return done(err);

            if(!user)
                return done(null, false, {message: "Incorrect username"});
            
            if(user.password != password)
                return done(null, false, {message: "Incorrect password"});
            
            return done(null, user);
        });
    }
));

//User serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========================================
// Calling and configuring up the routes
//========================================

//Initializing the routes
var mainRoutes = require("./routes/main"),
    bookRoutes = require("./routes/books"),
    authRoutes = require("./routes/auth");

//Local parameters for the request
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
});

//Setting up the routes
app.use(mainRoutes);
app.use("/books", bookRoutes);
app.use(authRoutes);

//========================================
// Database seeder for dummy test phases
//========================================

var seedDB = require("./public/seedDB");

seedDB(); // Add dummy test data

//========================================
// Port and server start configuration
//========================================

//Port setup for deployment || local tests
var port = process.env.PORT || 8080;

app.listen(port, process.env.IP, function () {
    console.log("The JeyBooks web application is now running!");
});
