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
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override");

//========================================
// Importing and creating the models
//========================================


// MODELS CODE HERE
var BookModel = require("./models/bookModel"),
    UserModel = require("./models/userModel");

//========================================
// Calling and configuring up the routes
//========================================


// ROUTES HERE
var mainRoutes = require("./routes/main"),
    bookRoutes = require("./routes/books");

// ROUTES PARAM 

// ROUTES ASSOCIATION
app.use(mainRoutes);
app.use("/books", bookRoutes);

//========================================
// Connection the database with mongoose
//========================================


var url = process.env.DATABASEURL || "mongodb://localhost/jey_books"; 
mongoose.connect(url,{
  useMongoClient: true,
});


//========================================
// Configuring Express, Session and Flash
//========================================

app.use(require("express-session")({
    secret: "El Psy Congroo",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

//========================================
// Configuring Passport (+Local & mgoose)
//========================================

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

//========================================
// General node_modules configuration 
//========================================

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/semantic"));

//========================================
// Database seeder for dummy test phases
//========================================

var seedDB = require("./public/seedDB");

seedDB(); // Seed the Database with dummy data

//========================================
// Port and server start configuration 
//========================================
var port = process.env.PORT || 8080;  // Deployment || Local tests

app.listen(port, process.env.IP, function(){
    console.log("The JeyBooks application is now running!");
});
