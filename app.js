var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
	Campground = require("./models/campground")

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

// Campground.create(
// 	{
// 		name: "White Rock Lake",
// 		image: "http://mediad.publicbroadcasting.net/p/kera/files/styles/x_large/public/201806/shutterstock_753593347.jpg",
// 		description: "This is a lake in Dallas"

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
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image:image, description:desc};
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

//SHOW -- shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("the yelpcamp server has started");
});




































