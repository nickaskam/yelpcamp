var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect('mongodb+srv://nick:Shoplifter5@yelpcampproject-pn3te.mongodb.net/yelp_camp?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log('Error:', err.message);
});

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Camground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "White Rock Lake",
// 		image: "http://mediad.publicbroadcasting.net/p/kera/files/styles/x_large/public/201806/shutterstock_753593347.jpg"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly Created Campground: ");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res){
	res.render("landing");
});

//view campgrounds
app.get("/campgrounds", function(req, res){
	//res.render("campgrounds",{campgrounds:campgrounds});
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds",{campgrounds:allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image:image};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("the yelpcamp server has started");
});

