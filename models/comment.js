var mongoose = require("mongoose");

var commentSchema = mongoose.Scheme({
	text: String,
	author: String
});

module.exports = mongoose.model("Comment", commentSchema);