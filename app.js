var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Grapevine Lake", image: "https://media.nbcdfw.com/images/652*367/Lake-Grapevine.jpg"},
	{name: "Broken Bow", image: "https://upload.wikimedia.org/wikipedia/en/b/bd/Broken_bow_lake.jpg"},
	{name: "White Rock Lake", image: "http://mediad.publicbroadcasting.net/p/kera/files/styles/x_large/public/201806/shutterstock_753593347.jpg"}
];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image:image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("the yelpcamp server has started");
});

