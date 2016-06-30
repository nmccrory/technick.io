var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
	title: String,
	img_url: String,
	app_url: String,
	github_link: String,
	description: String,
	created_at: Date,
	updated_at: Date
});

mongoose.model('Project', ProjectSchema);