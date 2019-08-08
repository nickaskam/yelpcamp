var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

// var Campground = mongoose.model("Camground", campgroundSchema);

module.exports = mongoose.model("Campground", campgroundSchema);