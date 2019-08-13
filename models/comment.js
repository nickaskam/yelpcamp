var mongoose = require("mongoose");

var commentSchema = new mongoose.Scheme({
	text: String,
	author: String
});

module.exports = mongoose.model("Comment", commentSchema);