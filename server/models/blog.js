var mongoose = require('mongoose');
var BlogSchema = new mongoose.Schema({
	title: String,
	author: String,
	content: String,
	rest_route: String,
	img_url: String,
	created_at: Date,
	updated_at: Date
});

mongoose.model('Blog', BlogSchema);